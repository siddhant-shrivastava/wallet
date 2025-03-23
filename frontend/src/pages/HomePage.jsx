import React, { useState, useEffect } from 'react';
import WalletSetup from '../components/WalletSetup.jsx';
import WalletDetails from '../components/WalletDetails.jsx';
import TransactionForm from '../components/TransactionForm.jsx';
import { Container, Button, Alert, CircularProgress } from '@mui/material';
import { getWalletDetails } from '../services/api';

function HomePage() {
    const [walletId, setWalletId] = useState(localStorage.getItem('walletId'));
    const [walletDetails, setWalletDetails] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            if (walletId) {
                setLoading(true);
                setError('');
                try {
                    const data = await getWalletDetails(walletId);
                    setWalletDetails(data);
                } catch (err) {
                    setError(err);
                    setWalletDetails(null);
                    localStorage.removeItem('walletId');
                    setWalletId(null);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchDetails();
    }, [walletId]);

    const handleWalletCreated = (newWalletId) => {
        localStorage.setItem('walletId', newWalletId);
        setWalletId(newWalletId);
    };

    const handleTransactionComplete = () => {
        setLoading(true);
        setError('');
        getWalletDetails(walletId)
            .then(data => setWalletDetails(data))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    };

    return (
        <Container maxWidth="sm" sx={{ paddingTop: '20px' }}>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {loading && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}
            {!walletId ? (
                <>
                    <h1>Create a wallet</h1>
                    <WalletSetup onWalletCreated={handleWalletCreated} />
                </>
            ) : (
                <>
                    {walletDetails && <WalletDetails details={walletDetails} />}
                    <TransactionForm walletId={walletId} onTransactionComplete={handleTransactionComplete} />
                </>
            )}
        </Container>
    );
}

export default HomePage;