import React from 'react';
import {RoundedSquare} from "./styled";

const ColourSquare = ({ colour, level }) => {

    const primary = level === 'primary';
    const size = primary ? '48px' : '24px';
    const margin = primary ? '10px' : '22px';

    const backgroundColor = colour || '#ebebeb';

    return <RoundedSquare style={{ backgroundColor, width: size, height: size, margin, }}/>
};

export default ColourSquare;