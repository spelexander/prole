import React from 'react';
import Typography from "@material-ui/core/Typography";

const style = {
    marginTop: '20px',
    marginLeft: '20px',
    fontSize: '12px'
};

const Controls = () => {

    return <div style={{
        display: 'flex',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginBottom: '10px',
    }}>
        {/*<Typography style={style} align="left" variant="h3" display="block">*/}
            {/*<a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Settings</a>*/}
        {/*</Typography>*/}
        <Typography style={{...style, marginLeft: 'auto', order: 2, marginRight: '20px'}} align="left" variant="h3" display="block">
            Something not right? <a href={process.env.REACT_APP_HELP_URL} target="_blank" rel="noopener noreferrer">Let us know</a>
        </Typography>
    </div>
};

export default Controls;