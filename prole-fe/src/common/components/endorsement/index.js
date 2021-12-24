import React from 'react';
import Typography from "@material-ui/core/Typography";
import ColourSquare from "../colour-square";
import Paper from "@material-ui/core/Paper";
import Skeleton from "react-loading-skeleton";

const dedupAuthors = (authorList) => {
    const uniqueNames = [];
    authorList.forEach(author => {
       if (!uniqueNames.includes(author)) {
           uniqueNames.push(author);
       }
    });
    return uniqueNames;
};

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
        const authors = dedupAuthors(references.map(ref => ref.author));
        if (authors.length === 1) {
            const [name] = authors;
            referenceName = name;
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
        <div style={{marginLeft: '15px', marginTop: '5px'}}>
            <Typography style={{fontSize: '18px'}} align="left" variant="button" display="block">
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