import React from 'react';

import '../../../App.css'
import Typography from "@material-ui/core/Typography";

const ProleTitle = () => {


    return <Typography style={{
        color: 'black',
        fontSize: '24px',
        marginTop: '30px',
        marginRight: '25px',
        fontWeight: 100,
        marginLeft: 'auto'
    }}
                       className="text-pop-up-top"
                       variant="h1"
                       display="block"
    >
        Prole.
    </Typography>
};

export default ProleTitle;