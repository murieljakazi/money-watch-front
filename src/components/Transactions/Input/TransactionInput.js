import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import clsx from 'clsx';

import AccountContext from '../../AccountOverview/contexts/AccountContext'
import TransactionDisplay from '../Display/TransactionDisplay';
import options from './transactionOptions';

import { Accordion, AccordionDetails, AccordionSummary, Typography, TextField, makeStyles, InputAdornment, MenuItem, Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './TransactionInput.css'

const useStyles = makeStyles({
    root: {
        width: 200
    },
    accordion: {
        margin: '1em 0',
        width: '100%'
    },
    margin: {
        margin: '8px'
    },
    amount: {
        width: 180
    }, 
    memo: {
        width: 450
    },
    addButton: {
        marginLeft: 100
    }
});

const TransactionInput = (props) => {
    const classes = useStyles();
    const { getAccountOverview, refreshTransactions } = useContext(AccountContext);
    const [newTransaction, setNewTransaction] = useState({
        amount: null,
        memo: "",
        type: "",
        date: ""
    });

    useEffect(() => {
        setNewTransaction({...newTransaction, date: getCurrentDate()});
    }, [])

    const addTransaction = async (e) => {
        // e.preventDefault();
        const url = '/users/1/accounts/1/transactions';
        await axios
                .post(url, newTransaction)
                .then(() => refreshTransactions())
                .then(() => getAccountOverview());
    };

    const getCurrentDate = () => {
        const tempDate = new Date();
        const year = tempDate.getFullYear();
        const tempMonth = tempDate.getMonth();
        const month = tempMonth + 1;
        const day = tempDate.getDate();
        const transactionDate = year + "-" + month + "-" + day;
        return transactionDate;
    }

    const setTransactionInfo = (e) => {
        setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value })
    };

    const setTransactionAmount = (e) => {
        const number = parseInt(e.target.value);
        setNewTransaction({ ...newTransaction, amount: number});
    }

    console.log(newTransaction);
    return (
        <div className="input-container">
            <Accordion className={classes.accordion}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                >
                    <Typography>Add Transaction</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form className="transaction-form">
                        <div>
                        <TextField
                        className={classes.margin}
                        name="amount"
                        size="small"
                        className={clsx(classes.amount, classes.margin)}
                        label="Amount"
                        defaultValue=""
                        variant="outlined"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                            endAdornment: <InputAdornment position="end">.00</InputAdornment>
                          }}
                        onChange={setTransactionAmount}
                        />
                        <TextField
                        name="type"
                        select
                        size="small"
                        className={clsx(classes.margin, classes.root)}
                        label="Transaction Type"
                        defaultValue=""
                        variant="outlined"
                        onChange={setTransactionInfo}
                        >
                          {options.map((option, index) => (
                            <MenuItem name={option} value={option} key={index}>{option}</MenuItem>
                          ))}
                        </TextField>
                        <TextField
                        className={classes.margin}
                        name="memo"
                        label="Memo"
                        placeholder="Enter transaction details"
                        size="small"
                        className={clsx(classes.memo, classes.margin)}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                          }}
                        onChange={setTransactionInfo}
                        />
                        <Button
                        className={clsx(classes.margin, classes.addButton)}
                        onClick={addTransaction}
                        >
                            Add
                        </Button>
                        </div>
                    </form>

                </AccordionDetails>
            </Accordion>
            <TransactionDisplay />
        </div>

    )
}

export default TransactionInput;
