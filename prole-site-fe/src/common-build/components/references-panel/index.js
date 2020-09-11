import React from 'react';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';

const truncate = (input) => input.length > 40 ? `${input.substring(0, 40)}...` : input;

const ReferencesPanel = ({setSelectedEndorsement, references}) => {

    const refToText = (ref) => <Typography style={{ marginLeft: '20px' }}>
        <a href={ref.url} target="_blank" rel="noopener noreferrer">
            {truncate(ref.title)}
        </a>
        {' - '}{ref.author}{'   '}{ref.date}
        <br/>
    </Typography>;

    return <>
        <Button style={{ marginLeft: '10px' }} onClick={() => setSelectedEndorsement(null)}>
            <CloseIcon/>
        </Button>
        <div style={{ marginTop: '10px' }}>
        {references.map(refToText)}
        </div>
    </>
};

export default ReferencesPanel;