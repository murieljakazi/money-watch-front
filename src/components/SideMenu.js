import React from 'react';
import { withStyles } from '@material-ui/core';

const style = {
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '320px',
        height: '130vh',
        backgroundColor: '#253053'
    },
    appTitle: {
        color: '#FFF',
        margin: '10px 0 0 70px'
    },
    sup: {
        fontSize: '14px'
    }
}

function SideMenu(props) {

    const { classes } = props;

    return (
        <div className={classes.sideMenu}>
            <h1 className={classes.appTitle}>MoneyWatch <sup className={classes.sup}>beta</sup></h1>
        </div>
    )
}

export default withStyles(style)(SideMenu);
