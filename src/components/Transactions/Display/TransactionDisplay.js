import React, {useEffect, useContext, useState} from 'react';
import axios from 'axios';

import AccountContext from '../../AccountOverview/contexts/AccountContext'
import './TransactionDisplay.css'
import TransactionDetails from './TransactionDetails';
import { Table, TableContainer, Paper, TableHead, TableRow, TableCell, makeStyles, withStyles, TableBody, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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

  const [edit, setEdit] = useState(false);
  
    
  const classes = useStyles();
    
  const { displayTransactions, setDisplayTransactions, refreshTransactions } = useContext(AccountContext);
    
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
            {displayTransactions.map((transaction) => {
              return (
                <StyledTableRow key={transaction.memo}>
                  <StyledTableCell>{transaction.amount}</StyledTableCell>
                  <StyledTableCell>{transaction.memo}</StyledTableCell>
                  <StyledTableCell>{transaction.date}</StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton >
                      <EditIcon />
                    </IconButton>
                    <IconButton >
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
                )})}
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
