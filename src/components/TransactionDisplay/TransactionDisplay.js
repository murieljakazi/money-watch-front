import React, {useEffect, useState} from 'react';
import axios from 'axios';

import './TransactionDisplay.css'

const TransactionDisplay = () => {
    const [displayTransactions, setDisplayTransactions] = useState([]);

    useEffect(() => {
        const url = '/users/1/accounts/1/transactions'
        axios
          .get(url)
          .then(res => setDisplayTransactions(res.data))
    }, []);

    return (
        <div>
            {displayTransactions.map((transaction, index) => {
                return <div key={index} className="display-container">
                          <div>
                            <p>Amount</p>
                            <p>{transaction.amount}</p>
                          </div>
                          <div>
                            <p>Memo</p>
                            <p>{transaction.memo}</p>
                          </div>
                          <div>
                            <p>Date</p>
                            <p>{transaction.date}</p>
                          </div>
                          <div>
                            <button>edit</button>
                            <button>save</button>
                          </div>
                       </div>
            })}
        </div>
    )
}

export default TransactionDisplay;
