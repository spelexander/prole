import React from "react";
import Popup from "./Popup";

export default {
    component: Popup,
    title: 'Popup',
};

const endorsement1 = {
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

const endorsement2 = {
    endorsee: {
        colour: 'blue',
        name: 'Labour',
        branch: null,
        url: 'https://www.google.com'
    },
    level: 'secondary',
    type: 'publication',
    references: [
        {
            title: 'Why Labour is the way to go this election.',
            author: 'Jane Docs',
            date: '2018/03/15',
            url: 'https://www.google.com'
        },
        {
            title: 'What to do at the voting polls',
            author: 'Judy Pages',
            date: '2018/12/15',
            url: 'https://www.google.com'
        },
        {
            title: 'Decisive plans of actions',
            author: 'Harold Holt',
            date: '2020/03/15',
            url: 'https://www.google.com'
        }
    ]
};


export const PopupExample = () => <Popup endorsements={[endorsement1]}/>;

export const PopupMultipleExample = () => <Popup endorsements={[endorsement1, endorsement2]}/>;

export const PopupLoadingExample = () => <Popup loading/>;