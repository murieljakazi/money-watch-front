import axios from 'axios';
import React, { useState, useContext} from 'react';
import clsx from 'clsx';

import options from '../Input/transactionOptions';
import AccountContext from '../../AccountOverview/contexts/AccountContext';
import { withStyles, makeStyles, TableRow, TableCell, IconButton, TextField, InputAdornment, MenuItem,  } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';

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


const StyledTableRow = withStyles(() => ({

}))(TableRow);

const StyledTableCell = withStyles(() => ({

}))(TableCell);

const TransactionDetails = (props) => {
    const classes = useStyles();
    const { getAccountOverview } = useContext(AccountContext);
    const [edit, setEdit] = useState(false);
    const [updatedTransaction, setUpdatedTransaction] = useState({
        amount: props.transaction.amount,
        memo: props.transaction.memo,
        type: props.transaction.type
    });

    const { transaction, refreshTransactions } = props;
    const transactionId = transaction.id;

    const showEditFields = () => {
        setEdit(true);
        console.log(transactionId);
        console.log(updatedTransaction);
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

    const deleteTransaction = (transactionId) => {
        console.log(transactionId);
        const url = `${process.env.REACT_APP_API_SERVER}/users/1/accounts/1/transactions/${transactionId}`;
        axios
          .delete(url)
          .then(res => console.log("toto", res.data))
          .then(refreshTransactions)
          .then(() => getAccountOverview());
    };

    console.log(updatedTransaction);

    return (
        <div>
        {!edit && (
            <StyledTableRow key={transaction.memo}>
              <StyledTableCell>{transaction.amount}</StyledTableCell>
              <StyledTableCell>{transaction.memo}</StyledTableCell>
              <StyledTableCell>{transaction.date}</StyledTableCell>
              <StyledTableCell align="right">
              <IconButton onClick={showEditFields}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => deleteTransaction(transactionId)}>
                <DeleteIcon />
              </IconButton>
              </StyledTableCell>
            </StyledTableRow>
            // <div className="display-container">
            // <div>
            //   <p>{transaction.amount}</p>
            // </div>
            // <div>
            //   <p>{transaction.memo}</p>
            // </div>
            // <div>
            //   <p>{transaction.date}</p>
            // </div>
            // <div className="action-buttons">
            //   <button onClick={showEditFields}>Edit</button>
            //   <button onClick={() => deleteTransaction(transactionId)}>Delete</button>
            // </div>
            // </div>
            )
        }
        {edit && (
            <form>
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
                    <IconButton onClick={() => editTransaction(transactionId)}>
                        <DoneIcon />
                    </IconButton>
                </div>
            </form>

            //   <div className="edit-input-container">
            //     <div className="edit-input">
            //       <label>Amount</label>
            //       <input placeholder={transaction.amount} name="amount" type="text" onChange={handleUpdateData}></input>
            //     </div>
            //     <div className="edit-input">
            //       <label>Transaction Type</label>
            //       <select name="type" onChange={handleUpdateData}>
            //         <option defaultValue={transaction.type} disabled hidden></option>
            //         {options.map((option, i) => {
            //           return <option key={i}>{option}</option>
            //         })}
            //       </select>
            //     </div>
            //     <div className="edit-input">
            //       <label>Memo</label>
            //       <input placeholder={transaction.memo} name="memo" type="text" onChange={handleUpdateData}></input>
            //     </div>
            //     <div>
            //       <button onClick={discardEdit}>X</button>
            //       <button onClick={() => editTransaction(transactionId)}>O</button>
            //     </div>
            //   </div>
            )}
        </div>
    )
}

export default TransactionDetails;
