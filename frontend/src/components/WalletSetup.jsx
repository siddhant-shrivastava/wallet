import React, { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { setupWallet } from '../services/api';

function WalletSetup({ onWalletCreated }) {
    const [name, setName] = useState('');
    const [balance, setBalance] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const data = await setupWallet(name, balance);
            onWalletCreated(data.id);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField
                fullWidth
                label="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                required
                inputProps={{ autoComplete: "off" }} 
            />
            <TextField
                fullWidth
                label="Initial Balance (optional)"
                value={balance}
                onChange={(e) => setBalance(Math.max(0, parseFloat(e.target.value) || 0))}
                margin="normal"
                type="number"
                inputProps={{ autoComplete: "off" }} 
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={loading}>
                {loading ? 'Creating Wallet...' : 'Create Wallet'}
            </Button>
        </Box>
    );
}

export default WalletSetup;