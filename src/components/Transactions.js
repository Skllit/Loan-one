import React, { useState } from 'react';
import {
  Paper, Typography, Table, TableHead,
  TableRow, TableCell, TableBody, Button
} from '@mui/material';
import AddTransactionDialog from './AddTransactionDialog';

export function Transactions({ transactions, onAdd }) {
  const [open, setOpen] = useState(false);
  return (
    <Paper sx={{ p:2 }}>
      <Typography variant="h6">Withdrawals</Typography>
      <Button variant="contained" size="small" sx={{ my:1 }} onClick={()=>setOpen(true)}>
        + New Withdrawal
      </Button>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(t=>(
            <TableRow key={t.id}>
              <TableCell>{t.date}</TableCell>
              <TableCell align="right">₹{t.amount.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddTransactionDialog
        open={open}
        onClose={()=>setOpen(false)}
        onSave={t=>{ onAdd(t); setOpen(false); }}
      />
    </Paper>
  );
}
