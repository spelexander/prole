import React from 'react';
import Typography from "@material-ui/core/Typography";

const Home = () => {
    return <>
        <Typography style={{fontSize: '20', fontWeight: 100}} variant="h6">
            What is Prole?
            <br/>
            <br/>
        </Typography>
        <Typography style={{fontSize: '15', fontWeight: 100, textAlign: 'center', marginTop: '30px'}} variant="body">
            Prole is a political endorsement checker.
            <br/>
            <br/>
            Prole will tell you whether a company (mainly news sources) has endorsed a political party
            during a recent Australian election,
            through publication or donation.
            <br/>
            <br/>
            Prole is a <a href={process.env.REACT_APP_CHROME_EXTENSION_INSTALL_LOC}>Chrome browser extension.</a>
        </Typography>
    </>
};

export default Home;