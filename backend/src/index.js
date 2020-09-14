const { validateEndorsementRequest, validateHostName } = require("./validator");
const { addEndorsement, getEndorsements, updateEndorsement, archiveEndorsement } = require('./service');
const express = require('express');

const app = express();
const port = 8080;

// middleware
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static('fe-build'));
app.get('*', function(req, res) {
    res.sendFile('index.html', {root: 'fe-build'});
});

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
    const request = req.body;

    if (!request.id || !request.endorsement) {
        res.status(400);
        res.send('must provide object of shape: { id: Number, endorsement: {...} }');
        return;
    }

    res.send(await updateEndorsement(request.id, request.endorsement));
});

app.delete(PROLE_EDIT_PATH, async (req, res) => {
    const request = req.body;

    if (!request.id) {
        res.status(400);
        res.send('must provide object of shape: { id: Number }');
        return;
    }

    res.send(await archiveEndorsement(request.id));
});

app.listen(port, () => console.log(`🚀 prole started on port: ${port}`));