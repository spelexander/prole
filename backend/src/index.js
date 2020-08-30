const express = require('express');

const app = express();
const port = 8080;

// middleware
app.use(express.json());
app.use(express.urlencoded());


const validate = (req) => {
    return req.body && req.body.hostname;
};

const endorsement1 = {
    endorsee: {
        colour: 'red',
        name: 'Coalition',
        branch: null,
        url: 'https://www.google.com'
    },
    level: 'primary',
    type: 'publication',
    references: [
        {
            title: 'Who you should vote for this election.',
            author: 'Joe Blogs',
            date: '2019/03/14',
            url: 'https://www.google.com'
        }
    ]
};

const endorsement2 = {
    endorsee: {
        colour: 'blue',
        name: 'Labour',
        branch: null,
        url: 'https://www.google.com'
    },
    level: 'secondary',
    type: 'publication',
    references: [
        {
            title: 'Why Labour is the way to go this election.',
            author: 'Jane Docs',
            date: '2018/03/15',
            url: 'https://www.google.com'
        },
        {
            title: 'What to do at the voting polls',
            author: 'Judy Pages',
            date: '2018/12/15',
            url: 'https://www.google.com'
        },
        {
            title: 'Decisive plans of actions',
            author: 'Harold Holt',
            date: '2020/03/15',
            url: 'https://www.google.com'
        }
    ]
};

app.use(express.static('fe-build'));
app.get('*', function(req, res) {
    res.sendFile('index.html', {root: 'fe-build'});
});

// endpoints
app.post('/prole', async (req, res) => {
    if (!validate(req)) {
        res.status(400);
        res.send({ error: 'hostname must be provided' });
        return;
    }

    const { hostname } = req.body;

    res.send([ endorsement1, endorsement2 ]);
});

app.listen(port, () => console.log(`🚀 prole started on port: ${port}`));