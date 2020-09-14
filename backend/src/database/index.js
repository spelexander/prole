const datastore = require("@google-cloud/datastore");

class DatastoreService {

    constructor(config) {
        if (config && config.datastore) {
            this.datastore = config.datastore;
        } else {
            this.datastore = new datastore.Datastore();
        }
        this.dataStoreNamespace = (config && config.dataStoreNamespace) || 'production';
        this.tableNameSuffix = (config && config.tableNameSuffix);
    }

    keyProvider(table, name) {
        if (name) {
            return this.datastore.key([table, Number(name)]);
        }
        return this.datastore.key(table);
    }

    applyFilters(preQuery, filters) {
        let query = preQuery;
        filters && filters.forEach(clause => {
            query = query.filter(clause.field, clause.operator, clause.value);
        });
        return query;
    }

    _extractId(obj) {
        const key = this.datastore.KEY;
        return obj && obj[key] ? obj[key].id && Number(obj[key].id) : null;
    }

    async runQuery(table, filters) {
        const baseQuery = this.datastore.createQuery(table);
        const query = this.applyFilters(baseQuery, filters);
        const data = await this.datastore.runQuery(query);
        return data ? data[0]
            .map(obj => (Object.assign(Object.assign({}, obj), {id: this._extractId(obj)}))) : [];
    }

    sanitiseResponse(data) {
        const cleanResult = data && data
            .map((obj) => (Object.assign(Object.assign({}, obj), {id: this._extractId(obj)})));
        return cleanResult && cleanResult.length === 1 ? cleanResult[0] : undefined;
    }

    sanitiseBatchResponse(data) {
        const flattened = data && [].concat.apply([], data);
        return flattened && flattened
            .map((obj) => (Object.assign(Object.assign({}, obj), {id: this._extractId(obj)})));
    }

    static successResponse(id, query, msg) {
        return {
            id: id,
            query: query,
            success: true,
            message: msg
        };
    }

    async save(tableName, data) {
        const key = await this.keyProvider(tableName);
        const entity = {
            key: key,
            data,
        };
        const commitResponse = await this.datastore.save(entity);
        return DatastoreService.successResponse(String(key.path[1]), entity.data, commitResponse);
    }

    async update(tableName, id, data) {
        const key = await this.keyProvider(tableName, id);
        const oldEntity = await this.datastore.get(key)
            .then(response => this.sanitiseResponse(response));
        const newEntity = Object.assign(Object.assign({}, oldEntity), data);
        const entity = {
            key: key,
            data: newEntity,
        };
        const commitResponse = await this.datastore.update(entity);
        return DatastoreService.successResponse(String(key.path[1]), newEntity, commitResponse);
    }

    async get(tableName, id) {
        const key = this.keyProvider(tableName, id);
        const response = await this.datastore.get(key);
        return this.sanitiseResponse(response);
    }

    async getBatch(tableName, ids) {
        const keys = ids.map(id => this.keyProvider(tableName, id));
        return this.datastore.get(keys)
            .then(response => {
                return this.sanitiseBatchResponse(response);
            });
    }

    async list(tableName, filters) {
        return this.runQuery(tableName, filters);
    }

    key(pathString) {
        return this.datastore.key(pathString);
    }
}

module.exports = {
    DatastoreService
};
