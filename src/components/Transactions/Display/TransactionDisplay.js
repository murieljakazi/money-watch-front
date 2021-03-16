import React, {useEffect, useContext, useState} from 'react';
import axios from 'axios';
import clsx from 'clsx';

import AccountContext from '../../AccountOverview/contexts/AccountContext';
import options from '../Input/transactionOptions';
import './TransactionDisplay.css'
import TransactionDetails from './TransactionDetails';
import { Table, TableContainer, Paper, TableHead, TableRow, TableCell, makeStyles, withStyles, TableBody, IconButton, InputAdornment, TextField, MenuItem } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  tableRow: {
    width: 700
  }
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({

}))(TableRow);



const TransactionDisplay = () => {
  
  const { displayTransactions, setDisplayTransactions, refreshTransactions, getAccountOverview } = useContext(AccountContext);
  const [edit, setEdit] = useState(false);
  const [updatedTransaction, setUpdatedTransaction] = useState({
    amount: displayTransactions.amount,
    memo: displayTransactions.memo,
    type: displayTransactions.type
  });

  const showEditFields = (transactionId) => {
    setEdit(true);
    console.log("hello");
  };

  const handleUpdateData = (e) => {
    setUpdatedTransaction({...updatedTransaction, [e.target.name]: e.target.value});
  };

  const discardEdit = () => {
    setEdit(false);
  };

  const editTransaction = (transactionId) => {
    const url = `${process.env.REACT_APP_API_SERVER}/users/1/accounts/1/transactions/${transactionId}`;
    axios
      .put(url, updatedTransaction)
      .then(refreshTransactions)
      .then(() => getAccountOverview());
    setEdit(false);
  };
    
  const classes = useStyles();
    
    
  useEffect(() => {
      refreshTransactions();
  }, []);

  console.log(displayTransactions);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableRow}>
              <StyledTableCell>Amount </StyledTableCell>
              <StyledTableCell>Memo </StyledTableCell>
              <StyledTableCell>Date </StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayTransactions.map((transaction, index) => {
              return (
                  edit 
                  ?
                <div>
                    <TextField
                        className={classes.margin}
                        name="amount"
                        size="small"
                        className={clsx(classes.amount, classes.margin)}
                        label="Amount"
                        defaultValue={transaction.amount}
                        placeholder={transaction.amount}
                        variant="outlined"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                            endAdornment: <InputAdornment position="end">.00</InputAdornment>
                          }}
                        onChange={handleUpdateData}
                    />
                    <TextField
                        name="type"
                        select
                        size="small"
                        className={clsx(classes.margin, classes.root)}
                        label="Transaction Type"
                        defaultValue={transaction.type}
                        placeholder={transaction.type}
                        variant="outlined"
                        onChange={handleUpdateData}
                        >
                          {options.map((option, index) => (
                            <MenuItem name={option} value={option} key={index}>{option}</MenuItem>
                          ))}
                    </TextField>
                    <TextField
                        className={classes.margin}
                        name="memo"
                        label="Memo"
                        defaultValue={transaction.memo}
                        placeholder={transaction.memo}
                        size="small"
                        className={clsx(classes.memo, classes.margin)}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                          }}
                        onChange={handleUpdateData}
                    />
                    <IconButton onClick={discardEdit}>
                        <CloseIcon />
                    </IconButton>
                    <IconButton onClick={() => editTransaction(transaction.id)}>
                        <DoneIcon />
                    </IconButton>
                </div>
                  :
                    <StyledTableRow key={index}>
                      <StyledTableCell>{transaction.amount}</StyledTableCell>
                      <StyledTableCell>{transaction.memo}</StyledTableCell>
                      <StyledTableCell>{transaction.date}</StyledTableCell>
                      <StyledTableCell align="right">
                        <IconButton onClick={showEditFields}>
                          <EditIcon />
                        </IconButton>
                        <IconButton >
                          <DeleteIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>

                  
                )
              })
            }
                {/* <TransactionDetails
                transaction={transaction}
                key={transaction.memo}
                refreshTransactions={() => refreshTransactions() } /> */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default TransactionDisplay;
