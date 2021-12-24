/* global chrome */

import React, {useEffect, useState} from 'react';
import Popup from "./Popup";
import {getHostName} from "./common/utils";

function App() {

    const [currentUrl, setCurrentUrl] = useState(null);
    const [endorsements, setEndorsements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            const url = tabs[0].url;
            const formattedUrl = url && getHostName(url);
            setCurrentUrl(formattedUrl);
        });
    }, []);

    useEffect(() => {
       const fetchData = async () => {
            if (currentUrl) {
                setLoading(true);
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
        <Popup
            error={error}
            loading={loading}
            endorsements={endorsements}
            url={currentUrl}
            setCurrentUrl={setCurrentUrl}
        />
    );
}

export default App;
