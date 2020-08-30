import React from 'react';
import Endorsement from '../common/components/endorsement';

const EndorsementPanel = ({ loading, error, endorsements }) => {

    if (loading) {
        return [1, 2].map(() => <Endorsement loading/>);
    }

    return endorsements.map(endorsement => <Endorsement endorsement={endorsement}/>);
};

export default EndorsementPanel;