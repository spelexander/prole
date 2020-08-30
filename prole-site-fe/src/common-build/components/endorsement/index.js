import React from 'react';
import Typography from "@material-ui/core/Typography";
import ColourSquare from "../colour-square";
import Paper from "@material-ui/core/Paper";
import Tooltip from '@material-ui/core/Tooltip';
import Button from "@material-ui/core/Button";
import Skeleton from "react-loading-skeleton";

const truncate = (input) => input.length > 40 ? `${input.substring(0, 40)}...` : input;

const refToText = (ref) => <><a href={ref.url} target="_blank" rel="noopener noreferrer">Article: {truncate(ref.title)}</a><br/></>;

const Endorsement = ({loading, endorsement}) => {

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

        return <div style={{marginLeft: 'auto', order: 2, marginRight: '20px'}}>
            <Tooltip
                style={{ backgroundColor: '#f5f5f9'}}
                title={
                    <React.Fragment>
                        {references.map(refToText)}
                    </React.Fragment>
                }
                interactive
            >
                <Button style={{fontSize: '12px', marginTop: '5px', marginBottom: '5px'}}>
                    <Typography style={{fontSize: '12px'}} align="left" variant="button"
                                display="block">
                        {`Last endorsed: ${lastRef.date}`}
                        <br/>
                        {referenceName}
                    </Typography>
                </Button>
            </Tooltip>
        </div>
    };

    return <Paper style={{display: 'flex', margin: '5px'}}>
        <ColourSquare colour={loading ? null : colour} level={loading ? 'primary' : level}/>
        <div style={{marginLeft: '20px', marginTop: '5px'}}>
            <Typography style={{fontSize: '20px'}} align="left" variant="button" display="block">
                {loading ? <Skeleton width={'150px'} height={'15px'} /> : <a href={url} target="_blank" rel="noopener noreferrer">{name}</a>}
            </Typography>
            <Typography style={{fontSize: '11px'}} align="left" variant="button" display="block">
                {loading ? <Skeleton width={'200px'} height={'15px'} /> : `${level} endorsement`}
            </Typography>
        </div>
        {!loading && getReferencesSection()}
    </Paper>

};

export default Endorsement;