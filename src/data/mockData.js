// Mock JSON-driven data
export default {
  loan: {
    amount: 100000,
    interestRate: 9.5,          // % per annum
    sanctionDate: '2025-01-15'  // ISO string
  },
  transactions: [
    { id: 1, date: '2025-02-10', amount: 20000 },
    { id: 2, date: '2025-03-05', amount: 15000 },
    { id: 3, date: '2025-04-20', amount: 10000 }
  ],
  repayments: [
    { id: 1, date: '2025-03-15', amount: 5000 },
    { id: 2, date: '2025-05-01', amount: 10000 }
  ]
};
