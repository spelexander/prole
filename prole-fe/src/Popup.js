/* global chrome */

import React from 'react';
import Header from "./header";
import EndorsementPanel from "./common/components/endorsement-panel";
import Controls from "./controls";
import Divider from "@material-ui/core/Divider";

const style = {
  margin: '10px'
};

function Popup({ error, endorsements, loading, url, setCurrentUrl }) {

    return (
        <>
        <div style={{ height: '372px' }}>
            <Header url={url} setCurrentUrl={setCurrentUrl}/>
            <Divider style={style} />
            <EndorsementPanel error={error} endorsements={endorsements} loading={loading}/>
        </div>
            <Controls/>
        </>

    );
}

export default Popup;
