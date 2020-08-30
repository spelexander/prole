/* global chrome */

import React from 'react';
import Header from "./header";
import EndorsementPanel from "./endorement-panel";
import Controls from "./controls";
import Divider from "@material-ui/core/Divider";

const style = {
  margin: '10px'
};

function Popup({ endorsements, loading, url }) {

    return (
        <>
        <div style={{ height: '372px', overflow: 'scroll' }}>
            <Header url={url}/>
            <Divider style={style} />
            <EndorsementPanel endorsements={endorsements} loading={loading}/>
        </div>
            <Controls/>
        </>

    );
}

export default Popup;
