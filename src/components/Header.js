import React from 'react';
import { makeStyles, AppBar, Toolbar, Grid, IconButton } from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const useStyles = makeStyles( theme => ({
    root:{
    backgroundColor:'#FFF'
    }
}));

export default function Header() {
    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Grid container>
                    <Grid item></Grid>
                    <Grid item sm></Grid>
                    <Grid item>
                        <IconButton>
                            <PowerSettingsNewIcon />
                        </IconButton>
                    </Grid>
                </Grid>

            </Toolbar>
        </AppBar>
    )
}
