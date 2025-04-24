import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, TextField,
  DialogActions, Button
} from '@mui/material';

export default function AddTransactionDialog({ open, onSave, onClose }) {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New Withdrawal</DialogTitle>
      <DialogContent>
        <TextField
          label="Date"
          type="date"
          fullWidth
          margin="dense"
          value={date}
          onChange={e=>setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Amount"
          type="number"
          fullWidth
          margin="dense"
          value={amount}
          onChange={e=>setAmount(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={()=>{
            onSave({ id: Date.now(), date, amount: +amount });
          }}
          disabled={!date||!amount}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
