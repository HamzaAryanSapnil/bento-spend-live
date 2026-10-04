export function filterSortExpenses(expenses, filters) {
  const searchQuery = filters.search.trim().toLowerCase();

  let result = expenses.filter((expense) => {
    const matchesSearch =
      !searchQuery || expense.title.toLowerCase().includes(searchQuery);
    const matchesCategory =
      filters.category === 'All' || expense.category === filters.category;

    return matchesSearch && matchesCategory;
  });

  result = [...result].sort((a, b) => {
    switch (filters.sortBy) {
      case 'date-asc':
        return new Date(a.date) - new Date(b.date);
      case 'amount-desc':
        return b.amount - a.amount;
      case 'amount-asc':
        return a.amount - b.amount;
      case 'date-desc':
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  return result;
}
