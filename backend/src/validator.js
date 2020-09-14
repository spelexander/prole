const {typeCheckObject} = require("./utils");

const endorsementSchema = {
    endorsee: {
        emptyAllowed: false,
        nested: {
            colour: {
                emptyAllowed: false,
            },
            name: {
                emptyAllowed: false,
            },
            url: {
                emptyAllowed: false,
            }
        }
    },
    hostnames: {
        emptyAllowed: false,
    },
    level: {
        emptyAllowed: false,
    },
    type: {
        emptyAllowed: false,
    },
    references: {
        emptyAllowed: false,
    }
};

const validateEndorsementRequest = (request) => typeCheckObject(endorsementSchema, request);

const validateHostName = (req) => {
    return req.body && req.body.hostname;
};

module.exports = {
    validateEndorsementRequest,
    validateHostName
};
