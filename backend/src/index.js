const { validateEndorsementRequest, validateHostName } = require("./validator");
const { addEndorsement, getEndorsements, updateEndorsement, archiveEndorsement } = require('./service');
const express = require('express');

const app = express();
const port = 8080;

const EXPECTED_WRITE_TOKEN = process.env.WRITE_TOKEN || 'test';

// middleware
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static('fe-build'));
app.get('*', function(req, res) {
    res.sendFile('index.html', {root: 'fe-build'});
});

const validateWriteToken = (req, res) => {
    const token = req.headers && req.headers.token;
    if (token !== EXPECTED_WRITE_TOKEN) {
        res.status(403);
        res.send({error: 'You are not authorized to use this resource.'});
        return false;
    }
    return true;
};

// endpoints
app.post('/prole', async (req, res) => {
    if (!validateHostName(req)) {
        res.status(400);
        res.send({ error: 'hostname must be provided' });
        return;
    }

    const { hostname } = req.body;

    const endorsements = await getEndorsements(hostname);
    res.send(endorsements);
});

const PROLE_EDIT_PATH = '/prole/edit';

app.post(PROLE_EDIT_PATH, async (req, res) => {
    if (!validateWriteToken(req, res)) {
        return;
    }

    const request = req.body;
    const {pass, errors} = validateEndorsementRequest(request);

    if (!pass) {
        res.status(400);
        res.send(errors);
        return;
    }

    res.send(await addEndorsement(request));
});

app.put(PROLE_EDIT_PATH, async (req, res) => {
    if (!validateWriteToken(req, res)) {
        return;
    }

    const request = req.body;

    if (!request.id || !request.endorsement) {
        res.status(400);
        res.send('must provide object of shape: { id: Number, endorsement: {...} }');
        return;
    }

    res.send(await updateEndorsement(request.id, request.endorsement));
});

app.delete(PROLE_EDIT_PATH, async (req, res) => {
    if (!validateWriteToken(req, res)) {
        return;
    }

    const request = req.body;

    if (!request.id) {
        res.status(400);
        res.send('must provide object of shape: { id: Number }');
        return;
    }

    res.send(await archiveEndorsement(request.id));
});

app.listen(port, () => console.log(`🚀 prole started on port: ${port}`));