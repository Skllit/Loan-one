import React, { useState } from 'react';
import {
  Paper, Typography, Table, TableHead,
  TableRow, TableCell, TableBody, Button
} from '@mui/material';
import AddRepaymentDialog from './AddRepaymentDialog';

export function Repayments({ repayments, onAdd }) {
  const [open, setOpen] = useState(false);
  return (
    <Paper sx={{ p:2 }}>
      <Typography variant="h6">Repayments</Typography>
      <Button variant="contained" size="small" sx={{ my:1 }} onClick={()=>setOpen(true)}>
        + New Repayment
      </Button>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {repayments.map(r=>(
            <TableRow key={r.id}>
              <TableCell>{r.date}</TableCell>
              <TableCell align="right">₹{r.amount.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddRepaymentDialog
        open={open}
        onClose={()=>setOpen(false)}
        onSave={r=>{ onAdd(r); setOpen(false); }}
      />
    </Paper>
  );
}
