import React from 'react';
import Typography from "@material-ui/core/Typography";

const Data = () => {
    return <>
        <Typography style={{fontSize: '20', fontWeight: 100}} variant="h6">
            Prole is open source.
            <br/>
            <br/>
        </Typography>
        <Typography style={{fontSize: '15', fontWeight: 100, textAlign: 'center', marginTop: '30px'}} variant="body">
            All the data that feeds Prole is reviewed. Nothing is added to Prole that cannot be referenced.
            <br/>
            Prole expresses no opinions, just presents facts. The entire project is open source including the data
            which will be released fortnightly here for download.
            <br/>
            <br/>
            You can find the source code for Prole <a href="https://github.com/spelexander/prole" target="_blank" rel="noopener noreferrer">on Github</a>
            <br/>
            <br/>
            You will be able to <a href={process.env.REACT_APP_DATA_DOWNLOAD_LOCATION} target="_blank" rel="noopener noreferrer">download the data for Prole here</a> soon.
            <br/>
            <br/>
            Prole does not collect any data about you.
        </Typography>
    </>
};

export default Data;