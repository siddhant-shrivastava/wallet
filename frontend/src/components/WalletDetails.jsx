import React from 'react';
import { Typography, Paper } from '@mui/material';

function WalletDetails({ details }) {
    if (!details) {
        return <Typography>No wallet details available.</Typography>;
    }

    const formatBalance = (balance) => {
        const numBalance = parseFloat(balance);
        return numBalance === parseInt(numBalance, 10) ? numBalance : numBalance.toFixed(4).replace(/(\.0+|0+)$/, '');
    };

    return (
        <>
            <h2>Wallet Details</h2>
            <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
                <Typography><strong>Name:</strong> {details.name}</Typography>
                <Typography><strong>Balance:</strong> {formatBalance(details.balance)}</Typography>
            </Paper>
        </>
    );
}

export default WalletDetails;