import { differenceInCalendarDays, parseISO } from 'date-fns';

// Simple interest on a principal for given days
export function calculateInterest(principal, rate, fromDate, toDate) {
  const days = differenceInCalendarDays(parseISO(toDate), parseISO(fromDate));
  return (principal * rate * days) / (100 * 365);
}

// Group data by YYYY-MM
export function groupByMonth(items, dateKey = 'date', valueKey = 'amount') {
  return items.reduce((acc, x) => {
    const m = x[dateKey].slice(0, 7); // "YYYY-MM"
    if (!acc[m]) acc[m] = 0;
    acc[m] += x[valueKey];
    return acc;
  }, {});
}
