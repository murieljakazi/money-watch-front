import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import TransactionDisplay from '../Transactions/Display/TransactionDisplay';

import TransactionInput from '../Transactions/Input/TransactionInput'

import './AccountOverview.css'
import AccountContext from './contexts/AccountContext';

const useStyles = makeStyles({
    root: {
        width: 250,
        marginTop: 15
    },
    content: {
        display: 'flex',
        flexDirection: 'column'
    },
    labels: {
        margin: 5
    }
});

const AccountOverview = () => {
    const [displayTransactions, setDisplayTransactions] = useState([]);
    const [accountInfo, setAccountInfo] = useState([]);

    const getAccountOverview = () => {
        const url = '/users/1/accounts/1';
        axios
          .get(url)
          .then(res => setAccountInfo(res.data));
    };

    const refreshTransactions = () => {
        const url = '/users/1/accounts/1/transactions';
        axios
          .get(url)
          .then(console.log('Getting transactions...'))
          .then(res => setDisplayTransactions(res.data));
    };

    useEffect(() => {
        getAccountOverview()
    }, []);

    const classes = useStyles();

    return (
        <div className="account-summary">

        <div className="overview-container">
            <Card className={classes.root}>
                <CardContent className={classes.content}>
                    <Typography className={classes.labels} component="h2">Current Balance</Typography>
                    <Typography className={classes.labels}>{accountInfo.balance}</Typography>
                </CardContent>
            </Card>
            <Card className={classes.root}>
                <CardContent className={classes.content}>
                    <Typography className={classes.labels}>Monthly Spending</Typography>
                    <Typography className={classes.labels}>{accountInfo.spending}</Typography>
                </CardContent>
            </Card>
            <Card className={classes.root}>
                <CardContent className={classes.content}>
                    <Typography className={classes.labels}>Deposits</Typography>
                    <Typography className={classes.labels}>{accountInfo.deposits}</Typography>
                </CardContent>
            </Card>
            <Card className={classes.root}>
                <CardContent className={classes.content}>
                    <Typography className={classes.labels}>Monthly Transactions</Typography>
                    <Typography className={classes.labels}>{accountInfo.transactionCount}</Typography>
                </CardContent>
            </Card>
        </div>
        <AccountContext.Provider
        value={{
            getAccountOverview,
            accountInfo,
            setAccountInfo,
            displayTransactions,
            setDisplayTransactions,
            refreshTransactions
        }}
        >
        <TransactionInput />
        </AccountContext.Provider>
        </div>
        
    )
}

export default AccountOverview;
