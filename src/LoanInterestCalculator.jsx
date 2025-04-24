import React, { useState } from 'react';
import './LoanInterestCalculator.css';

// Rupee formatter
const rupeeFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2
});

export default function LoanInterestCalculator() {
  // State
  const [loanAmount, setLoanAmount]     = useState(100000);
  const [amountUsed, setAmountUsed]     = useState(20000);
  const [interestRate, setInterestRate] = useState(10);

  // Validation
  const usedExceeds = amountUsed > loanAmount;

  // Computations
  const interestPayable   = usedExceeds ? 0 : (amountUsed * interestRate) / 100;
  const principalRemaining = Math.max(loanAmount - amountUsed, 0);
  const totalPayable      = amountUsed + interestPayable;

  // Handlers
  const resetAll = () => {
    setLoanAmount(100000);
    setAmountUsed(0);
    setInterestRate(10);
  };

  return (
    <div className="loan-card">
      <h2>🧮 Loan Interest Calculator</h2>

      <div className="field">
        <label>Loan Amount</label>
        <input
          type="number"
          min="0"
          value={loanAmount}
          onChange={e => setLoanAmount(Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label>Amount Used: {rupeeFormatter.format(amountUsed)}</label>
        <input
          type="range"
          min="0"
          max={loanAmount}
          step="1000"
          value={amountUsed}
          onChange={e => setAmountUsed(Number(e.target.value))}
        />
        <div className="progress-bar">
          <div
            className="progress-filled"
            style={{ width: `${(amountUsed / loanAmount) * 100}%` }}
          />
        </div>
      </div>
      {usedExceeds && <p className="error">Used amount cannot exceed loan amount!</p>}

      <div className="field">
        <label>Interest Rate: {interestRate}% p.a.</label>
        <input
          type="range"
          min="0"
          max="25"
          step="0.1"
          value={interestRate}
          onChange={e => setInterestRate(Number(e.target.value))}
        />
      </div>

      <hr />

      <div className="summary">
        <div>
          <strong>Principal Remaining:</strong>
          <span>{rupeeFormatter.format(principalRemaining)}</span>
        </div>
        <div>
          <strong>Interest Payable:</strong>
          <span>{rupeeFormatter.format(interestPayable)}</span>
        </div>
        <div>
          <strong>Total to Pay:</strong>
          <span>{rupeeFormatter.format(totalPayable)}</span>
        </div>
      </div>

      <div className="actions">
        <button className="btn primary" onClick={resetAll}>🔄 Reset</button>
      </div>
    </div>
  );
}
