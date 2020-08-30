import React from 'react';
import Typography from "@material-ui/core/Typography";

const About = () => {
    return <>
        <Typography style={{fontSize: '20', fontWeight: 100}} variant="h6">
            Information should be free of bias.
            <br/>
            <br/>
        </Typography>
        <Typography style={{fontSize: '15', fontWeight: 100, textAlign: 'center', marginTop: '30px'}} variant="body">
            Unfortunately, it isn't though.
            <br/>
            <br/>
            Prole seeks to help readers understand unseen political bias in their content by displaying
            publicly available information about the information provider.
            <br/>
            <br/>
            For instance Prole can reveal if a news source frequently endorsed a particular political party during the last election.
            <br/>
            <br/>
            Or, if a company is a registered donor for a political party.
        </Typography>
    </>
};

export default About;