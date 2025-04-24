import React, { useState, useMemo } from 'react';
import {
  Container, Box, Typography, Paper,
  Grid, LinearProgress
} from '@mui/material';

import mockData from './data/mockData';
import { LoanSummary }      from './components/LoanSummary';
import { Transactions }     from './components/Transactions';
import { Repayments }       from './components/Repayments';
import { MonthlyBreakdown } from './components/MonthlyBreakdown';

function App() {
  const [loan] = useState(mockData.loan);
  const [transactions, setTransactions] = useState(mockData.transactions);
  const [repayments, setRepayments]     = useState(mockData.repayments);

  const totalUsed = useMemo(
    () => transactions.reduce((sum,t)=>sum + t.amount, 0),
    [transactions]
  );
  const utilization = Math.min(100, (totalUsed / loan.amount) * 100);

  return (
    <Container sx={{ py:4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Loan Management Dashboard
      </Typography>
      <Paper sx={{ p:2, mb:4 }}>
        <LoanSummary loan={loan} totalUsed={totalUsed} />
        <Box sx={{ mt:2 }}>
          <LinearProgress variant="determinate" value={utilization} />
          <Typography variant="body2" textAlign="right">
            {utilization.toFixed(1)}% utilized
          </Typography>
        </Box>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Transactions
            transactions={transactions}
            onAdd={t=>setTransactions(tx=>[...tx, t])}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Repayments
            repayments={repayments}
            onAdd={r=>setRepayments(rp=>[...rp, r])}
          />
        </Grid>
        <Grid item xs={12}>
          <MonthlyBreakdown
            loan={loan}
            transactions={transactions}
            repayments={repayments}
          />
        </Grid>
      </Grid>
    </Container>
  );
}


export default App;
