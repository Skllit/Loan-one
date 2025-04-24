import React, { useMemo } from 'react';
import {
  Paper, Typography, Table, TableHead,
  TableRow, TableCell, TableBody
} from '@mui/material';
import {
  groupByMonth,
  calculateInterest
} from '../utils/calculations';
import { parseISO, endOfMonth } from 'date-fns';

export function MonthlyBreakdown({ loan, transactions, repayments }) {
  // Group withdrawals & repayments
  const byWid = useMemo(()=>groupByMonth(transactions),[transactions]);
  const byRid = useMemo(()=>groupByMonth(repayments),[repayments]);

  // Collect all months
  const months = Array.from(new Set([
    ...Object.keys(byWid),
    ...Object.keys(byRid)
  ])).sort();

  return (
    <Paper sx={{ p:2 }}>
      <Typography variant="h6">Monthly Breakdown</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Month</TableCell>
            <TableCell align="right">Withdrawn</TableCell>
            <TableCell align="right">Repaid</TableCell>
            <TableCell align="right">Interest</TableCell>
            <TableCell align="right">Outstanding</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {months.map(m=>{
            const w = byWid[m]||0;
            const r = byRid[m]||0;
            // interest on each withdrawal till month-end
            const interest = transactions
              .filter(t=>t.date.startsWith(m))
              .reduce((sum,t)=>
                sum + calculateInterest(t.amount, loan.interestRate, t.date, endOfMonth(parseISO(t.date)).toISOString())
              ,0);
            const outstanding = (w - r) + interest;
            return (
              <TableRow key={m}>
                <TableCell>{m}</TableCell>
                <TableCell align="right">₹{w.toLocaleString()}</TableCell>
                <TableCell align="right">₹{r.toLocaleString()}</TableCell>
                <TableCell align="right">₹{interest.toFixed(2)}</TableCell>
                <TableCell align="right">₹{outstanding.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}
