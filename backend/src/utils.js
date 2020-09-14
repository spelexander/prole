

const _recursiveTypeCheck = (schema, object, setFailCallback, results) => {
    const candidateKeys = Object.keys(object);
    const schemaKeys = Object.keys(schema);

    if (candidateKeys.length > schemaKeys.length) {
        results.push(`extra fields found in object. ${candidateKeys} found, only ${schemaKeys} wanted`);
        setFailCallback();
    }

    schemaKeys.forEach(key => {
        const orders = schema[key];

        const emptyAllowed = orders.emptyAllowed;
        const nested = orders.nested;
        const value = orders.value;

        if (!emptyAllowed) {
            if (!candidateKeys.includes(key)) {
                results.push(`key missing in object: ${key}`);
                setFailCallback();
            }
        }

        if (value) {
            if (!object[key] === value) {
                results.push(`key not equal to expected value in object: ${key}`);
                setFailCallback();
            }
        }

        if (nested) {
            _recursiveTypeCheck(nested, object[key], setFailCallback, results);
        }
    });
};

const typeCheckObject = (schema, object) => {
    const errors = [];
    let pass = true;

    _recursiveTypeCheck(schema, object, () => pass = false, errors);

    return {
        pass,
        errors
    };
};

function deepMerge(target, source) {
    Object.entries(source).forEach(([key, value]) => {
        if (value && typeof value === 'object') {
            deepMerge(target[key] = target[key] || {}, value);
            return;
        }
        target[key] = value;
    });
    return target;
}

module.exports = {
    typeCheckObject,
    deepMerge
};