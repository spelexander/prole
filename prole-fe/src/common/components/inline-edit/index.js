import React, {useEffect, useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {getHostName} from "../../utils";

const style = {
    textTransform: 'none',
    alignContext: 'center',
    width: '380px',
};

const InlineEdit = ({initialValue, onChanged}) => {

    const hostName = getHostName(initialValue);
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(hostName);

    useEffect(() => {
        if (hostName !== value) {
            if (hostName) {
                setValue(hostName);
            }
        }
    }, [hostName]);

    const getTextField = (defaultValue) => <TextField
        style={style}
        variant="outlined"
        onKeyDown={(e) => {
            const newValue = getHostName(e.target.value);
            if (e.key === 'Enter' && newValue) {
                setValue(newValue);
                onChanged(newValue);
                setEditing(false);
            }
        }}
        margin="dense"
        defaultValue={defaultValue}
    />;

    if (editing) {
        return getTextField(value);
    }

    return <Button
        style={style}
        onClick={() => {
        setEditing(true)
    }}>
        <Typography style={{ alignContext: 'center', fontSize: '16px' }} align="left" variant="h3" display="block">
            {value}
        </Typography>
    </Button>
};

export default InlineEdit;