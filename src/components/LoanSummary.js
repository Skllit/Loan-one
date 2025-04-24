import React from 'react';
import { Box, Typography } from '@mui/material';
import { format, parseISO } from 'date-fns';

export function LoanSummary({ loan, totalUsed }) {
  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
        <Typography variant="h6">Sanction Date:</Typography>
        <Typography>{format(parseISO(loan.sanctionDate), 'PPP')}</Typography>
      </Box>
      <Box>
        <Typography variant="h6">Loan Amount:</Typography>
        <Typography>₹{loan.amount.toLocaleString()}</Typography>
      </Box>
      <Box>
        <Typography variant="h6">Interest Rate:</Typography>
        <Typography>{loan.interestRate}% p.a.</Typography>
      </Box>
      <Box>
        <Typography variant="h6">Total Used:</Typography>
        <Typography>₹{totalUsed.toLocaleString()}</Typography>
      </Box>
    </Box>
  );
}
