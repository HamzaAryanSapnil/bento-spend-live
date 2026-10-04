export function formatMoney(amount) {
  const absolute = Math.abs(amount);
  const formatted = absolute.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return amount < 0 ? `-$${formatted}` : `$${formatted}`;
}
