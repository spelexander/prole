/* global chrome */

import React, {useEffect, useState} from 'react';
import './App.css';
import Popup from "./Popup";

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

function App() {

    const [currentUrl, setCurrentUrl] = useState(null);

    useEffect(() => {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            const url = tabs[0].url;
            setCurrentUrl(url);
        });
    }, []);

    return (
        <Popup endorsements={[ endorsement1, endorsement2, endorsement1, endorsement1, endorsement1, endorsement1 ]} url={currentUrl}/>
    );
}

export default App;
