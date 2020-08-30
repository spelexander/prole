import React from 'react';
import InlineEdit from "../common/components/inline-edit";
import ProleTitle from "../common/components/prole-title";

const Header = ({url, setCurrentUrl}) => {

    return <div style={{marginTop: '5px', marginLeft: '10px', display: 'flex', width: '100%'}}>
        <InlineEdit initialValue={url} onChanged={setCurrentUrl}/>
        <a style={{textDecoration: 'none', marginLeft: '50px'}} href={process.env.REACT_APP_HOME_URL} target="_blank">
            <ProleTitle/>
        </a>
    </div>;
};

export default Header;