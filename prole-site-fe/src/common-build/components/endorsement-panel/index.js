import React, {useState, useEffect} from 'react';
import Endorsement from '../endorsement';
import Typography from "@material-ui/core/Typography";
import ReferencesPanel from "../references-panel";

const EndorsementPanel = ({loading, error, endorsements}) => {

    const [selectedEndorsement, setSelectedEndorsement] = useState(null);

    useEffect(() => {
        if (selectedEndorsement || loading) {
            setSelectedEndorsement(null);
        }
    }, [endorsements, loading]);

    if (error) {
        return <Typography style={{fontSize: '20px', width: '100%', marginTop: '20px'}} align="center" variant="h6"
                           display="block">
            Something has gone wrong, but we're on it.
        </Typography>
    }

    if (loading) {
        return [1, 2].map(() => <Endorsement loading/>);
    }

    if (selectedEndorsement) {
        return <ReferencesPanel setSelectedEndorsement={setSelectedEndorsement}
                                references={selectedEndorsement.references}/>
    }

    return endorsements.map(endorsement => <Endorsement endorsement={endorsement}
                                                        setSelectedEndorsement={setSelectedEndorsement}/>);
};

export default EndorsementPanel;