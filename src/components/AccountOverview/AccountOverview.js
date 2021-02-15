import React from 'react';

import './AccountOverview.css'

const AccountOverview = () => {
    return (
        <div className="overview-container">
            <div>
                <p>Current Balance</p>
                <p>0</p>
            </div>
            <div>
                <p>Monthly Spending</p>
                <p>0</p>
            </div>
            <div>
                <p>Monthly Deposits</p>
                <p>0</p>
            </div>
            <div>
                <p>Monthly Transactions</p>
                <p>0</p>
            </div>
        </div>
    )
}

export default AccountOverview;
