import React, { useState } from 'react';
import { TextField, Button, Box, Alert, FormControlLabel, Switch, Grid} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { addTransaction } from '../services/api';

function TransactionForm({ walletId, onTransactionComplete }) {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [isCredit, setIsCredit] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        const transactionAmount = isCredit ? parseFloat(amount) : -parseFloat(amount);
        try {

            await addTransaction(walletId, transactionAmount, description);
            setAmount('');
            setDescription('');
            onTransactionComplete();
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <h2>Add New Transaction</h2>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <FormControlLabel
                control={<Switch checked={isCredit} onChange={(e) => setIsCredit(e.target.checked)} />}
                label={isCredit ? 'Credit' : 'Debit'}
            />
            <TextField
                fullWidth
                label="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                margin="normal"
                type="number"
                required
                inputProps={{ autoComplete: "off" }}
            />
            <TextField
                fullWidth
                label="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
                multiline
                rows={2}
                inputProps={{ autoComplete: "off" }}
            />
            {/* <Box sx={{
                display: 'flex',
                flexDirection: isLargeScreen ? 'row' : 'column',
                gap: 2,
                mt: 2,
                width: '100%',
            }}>
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={loading}>
                    {loading ? 'Adding Transaction...' : 'Add Transaction'}
                </Button>
                <Button component={RouterLink} to="/transactions" variant="outlined" sx={{ mt: 2 }}>
                    View Transactions
                </Button>
            </Box> */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} lg={6}> 
                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                        {loading ? 'Adding Transaction...' : 'Add Transaction'}
                    </Button>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Button component={RouterLink} to="/transactions" variant="outlined" fullWidth>
                        View Transactions
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default TransactionForm;