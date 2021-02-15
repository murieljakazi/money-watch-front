import React from 'react';

import options from './transactionOptions';

import './TransactionInput.css'

const TransactionInput = () => {
    return (
        <div className="input-container">
            <form>
                <div className="input-fields">
                    <div className="input-label">
                        <label>Amount </label>
                        <input type="text"></input>
                    </div>
                    <div className="input-label">
                        <label>Transaction Type </label>
                        <select placeholder="select a transaction type">
                            <option>Select a transaction type</option>
                            {options.map((option, index) => {
                                return <option key={index}>{option}</option>
                            })}
                        </select>
                    </div>
                    <div className="input-label">
                        <label>Memo </label>
                        <input type="text"></input>
                    </div>
                    <button>Add</button>
                </div>
            </form>
        </div>

    )
}

export default TransactionInput;
