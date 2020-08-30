import React from "react";
import Endorsement from "./index";

export default {
    component: Endorsement,
    title: 'Endorsement',
};

const endorsement = {
    endorsee: {
        colour: 'red',
        name: 'Coalition',
        branch: null,
        url: 'https://www.google.com'
    },
    level: 'primary',
    type: 'publication',
    references: [
        {
            title: 'Who you should vote for this election.',
            author: 'Joe Blogs',
            date: '2019/03/14',
            url: 'https://www.google.com'
        }
    ]
};

export const EndorsementExample = () => <Endorsement endorsement={endorsement}/>;

export const EndorsementSecondaryExample = () => <Endorsement endorsement={{...endorsement, level: 'secondary'}}/>;

export const EndorsementLoadingExample = () => <Endorsement loading/>;