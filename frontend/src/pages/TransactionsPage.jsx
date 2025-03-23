import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Paper,
    TablePagination,
    Button,
    Box,
    Alert,
    CircularProgress,
    Backdrop
} from '@mui/material';
import { fetchTransactions } from '../services/api';
import { CSVLink } from 'react-csv';

function TransactionsPage() {
    const navigate = useNavigate();
    const walletId = localStorage.getItem('walletId');
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [orderBy, setOrderBy] = useState('');
    const [order, setOrder] = useState('desc');

    useEffect(() => {
        const loadTransactions = async () => {
            if (!walletId) {
                navigate('/');
                return;
            }
            setLoading(true);
            setError('');
            try {
                const data = await fetchTransactions(walletId, page * rowsPerPage, rowsPerPage);
                setTransactions(data.transactions);
                setTotalTransactions(data.totalCount);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadTransactions();
    }, [page, rowsPerPage]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSort = (property) => (event) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        const sortedTransactions = [...transactions].sort((a, b) => {
            const aValue = property === 'date' ? new Date(a[property]).getTime() : a[property];
            const bValue = property === 'date' ? new Date(b[property]).getTime() : b[property];
            return (isAsc ? 1 : -1) * (aValue - bValue);
        });
        setTransactions(sortedTransactions);
    }; 

    const csvData = transactions.map(transaction => ({
        id: transaction._id,
        walletId: transaction.walletId,
        amount: transaction.amount,
        balance: transaction.balance,
        description: transaction.description,
        date: new Date(transaction.date).toLocaleString(),
        type: transaction.type,
    }));

    return (
        <Box sx={{ p: 3 }}>
            <h1>Wallet Transactions</h1>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="transaction table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Wallet ID</TableCell>
                            <TableCell sortDirection={orderBy === 'amount' ? order : false}>
                                <TableSortLabel
                                    active={orderBy === 'amount'}
                                    direction={orderBy === 'amount' ? order : 'asc'}
                                    onClick={handleSort('amount')}
                                >
                                    Amount
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Balance</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell sortDirection={orderBy === 'date' ? order : false}>
                                <TableSortLabel
                                    active={orderBy === 'date'}
                                    direction={orderBy === 'date' ? order : 'asc'}
                                    onClick={handleSort('date')}
                                >
                                    Date
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction._id}>
                                <TableCell>{transaction._id}</TableCell>
                                <TableCell>{transaction.walletId}</TableCell>
                                <TableCell>{transaction.amount.toFixed(4)}</TableCell>
                                <TableCell>{transaction.balance.toFixed(4)}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>{new Date(transaction.date).toLocaleString()}</TableCell>
                                <TableCell>{transaction.type}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={totalTransactions}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                    '& .css-s09cke-MuiTablePagination-selectLabel': {
                        margin: 0,
                    },
                    '& .css-11cfq65-MuiTablePagination-displayedRows': {
                        margin: 0,
                    }
                }}

            />
            <Box sx={{ mt: 2 }}>
                <CSVLink data={csvData} filename={"transactions.csv"}>
                    <Button variant="outlined">Export to CSV</Button>
                </CSVLink>
                <Button onClick={() => navigate('/')} sx={{ ml: 2 }}>Go to Home</Button>
            </Box>
        </Box>
    );
}

export default TransactionsPage;