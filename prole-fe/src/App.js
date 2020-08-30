/* global chrome */

import React, {useEffect, useState} from 'react';
import Popup from "./Popup";

function App() {

    const [currentUrl, setCurrentUrl] = useState(null);
    const [endorsements, setEndorsements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            const url = tabs[0].url;
            setCurrentUrl(url);
        });
    }, []);

    useEffect(() => {
       const fetchData = async () => {
            if (currentUrl) {
                try {
                    const newEndorsements = await fetch(`${process.env.REACT_APP_SERVER_URL}/prole`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({hostname: currentUrl})
                    }).then(res => res.json());
                    setEndorsements(newEndorsements);
                    setLoading(false);
                } catch (e) {
                    setError(e);
                }
            }
        };
        fetchData()
    }, [currentUrl]);

    return (
        <Popup error={error} loading={loading} endorsements={endorsements} url={currentUrl} setCurrentUrl={setCurrentUrl}/>
    );
}

export default App;
