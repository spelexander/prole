import React from 'react';
import Typography from "@material-ui/core/Typography";
import ColourSquare from "../colour-square";
import Paper from "@material-ui/core/Paper";
import Skeleton from "react-loading-skeleton";

const Endorsement = ({setSelectedEndorsement, loading, endorsement}) => {

    const {endorsee, level, references} = endorsement || {};
    const {name, url, colour} = endorsee || {};

    const getReferencesSection = () => {
        if (!references || references.length <= 0) {
            throw new Error('References must be provided.');
        }

        const refSize = references.length;
        const lastRef = references[refSize - 1];
        let referenceName = 'Multiple authors';

        if (refSize === 1) {
            const [ref] = references;
            referenceName = `Author: ${ref.author}`;
        }

        return <div style={{marginLeft: 'auto', order: 2, marginRight: '20px', marginTop: '10px'}}>
            <Typography style={{fontSize: '12px', marginTop: '5px', marginBottom: '5px'}} align="left" variant="button"
                        display="block">
                {`Last endorsed: ${lastRef.date}`}
                <br/>
                {referenceName}
            </Typography>
        </div>
    };

    return <Paper style={{display: 'flex', margin: '5px'}} onClick={() => setSelectedEndorsement && setSelectedEndorsement(endorsement)}>
        <ColourSquare colour={loading ? null : colour} level={loading ? 'primary' : level}/>
        <div style={{marginLeft: '20px', marginTop: '5px'}}>
            <Typography style={{fontSize: '20px'}} align="left" variant="button" display="block">
                {loading ? <Skeleton width={'150px'} height={'15px'}/> :
                    <a href={url} target="_blank" rel="noopener noreferrer">{name}</a>}
            </Typography>
            <Typography style={{fontSize: '11px'}} align="left" variant="button" display="block">
                {loading ? <Skeleton width={'200px'} height={'15px'}/> : `${level} endorsement`}
            </Typography>
        </div>
        {!loading && getReferencesSection()}
    </Paper>

};

export default Endorsement;