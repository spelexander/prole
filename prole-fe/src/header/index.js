import React from 'react';
import InlineEdit from "../common/components/inline-edit";
import ProleTitle from "../common/components/prole-title";

const Header = ({ url }) => {

    return <div style={{ marginTop: '5px', marginLeft: '10px', display: 'flex', width: '100%' }}>
        <InlineEdit initialValue={url} onChanged={() => {}}/>
        <ProleTitle/>
    </div>;
};

export default Header;