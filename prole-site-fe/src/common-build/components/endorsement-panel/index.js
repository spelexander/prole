import React from 'react';
import Endorsement from '../endorsement';
import Typography from "@material-ui/core/Typography";

const EndorsementPanel = ({ loading, error, endorsements }) => {

    if (error) {
        return <Typography style={{fontSize: '20px', width: '100%', marginTop: '20px'}} align="center" variant="h6" display="block">
            Something has gone wrong, but we're on it.
        </Typography>
    }

    if (loading) {
        return [1, 2].map(() => <Endorsement loading/>);
    }

    return endorsements.map(endorsement => <Endorsement endorsement={endorsement}/>);
};

export default EndorsementPanel;