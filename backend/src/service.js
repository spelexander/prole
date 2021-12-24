const {DatastoreService} = require('./database');

const datastore = new DatastoreService();

/** db collection names **/
const ENDORSEMENTS = 'endorsements';
const ENDORSEMENT_HOST_NAME = 'endorsement_hostname';

const archiveEndorsement = (id) => updateEndorsement(id, { archived: true });

const updateEndorsement = async (id, endorsement) => {
    const endorsementToUpdate = await datastore.get(ENDORSEMENTS, id);
    if (!endorsementToUpdate) {
        throw new Error(`endorsement not found for id: ${id}`);
    }

    try {
        const commitResponse = await datastore.update(ENDORSEMENTS, id, {...endorsementToUpdate, ...endorsement});

        // update linkages for host names
        if (endorsement.hostnames && endorsement.hostnames !== endorsementToUpdate.hostnames) {
            endorsement.hostnames.forEach(hostname => _addHostNameForEndorsement(commitResponse.id, hostname));
        }

        if (!commitResponse.success) {
            console.error(commitResponse.message);
            throw new Error(commitResponse.message);
        }

        return commitResponse;
    } catch (e) {
        return {
            success: false,
            message: 'failed to update entity',
            id: null,
        }
    }
};

const addEndorsement = async (endorsement) => {
    const commitResponse = await datastore.save(ENDORSEMENTS, {...endorsement, archived: false});

    if (commitResponse.success) {
        endorsement.hostnames.forEach(hostname => _addHostNameForEndorsement(commitResponse.id, hostname));
        return commitResponse;
    } else {
        console.error(commitResponse.message);
        throw new Error(commitResponse.message);
    }
};

const _addHostNameForEndorsement = (id, hostname) =>
    datastore.save(ENDORSEMENT_HOST_NAME, {
        hostname,
        endorsement: id,
    });

const getEndorsements = async (hostname) => {
    const endorsementByHostName = await datastore.list(ENDORSEMENT_HOST_NAME, [{
        field: 'hostname',
        operator: '=',
        value: hostname
    }]);

    if (!endorsementByHostName || endorsementByHostName.length === 0) {
        return [];
    }

    const results = await datastore.getBatch(ENDORSEMENTS, endorsementByHostName.map(endObj => endObj.endorsement));
    return results && results.filter(result => !result.archived);
};

const listEndorsements = () => datastore.list(ENDORSEMENTS);

module.exports = {
    addEndorsement,
    getEndorsements,
    listEndorsements,
    updateEndorsement,
    archiveEndorsement
};