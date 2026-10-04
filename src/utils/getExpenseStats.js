import { BUDGET_LIMIT } from '../constants/budget';
import { OVERVIEW_CATEGORIES } from '../constants/categories';

export function getExpenseStats(expenses) {
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBudget = BUDGET_LIMIT - totalAmount;
  const spentPercent =
    BUDGET_LIMIT === 0
      ? 0
      : Math.min((totalAmount / BUDGET_LIMIT) * 100, 100);
  const rawSpentPercent =
    BUDGET_LIMIT === 0 ? 0 : (totalAmount / BUDGET_LIMIT) * 100;

  const categoryTotals = OVERVIEW_CATEGORIES.reduce((totals, category) => {
    totals[category.key] = expenses
      .filter((expense) => expense.category === category.key)
      .reduce((sum, expense) => sum + expense.amount, 0);
    return totals;
  }, {});

  return {
    totalAmount,
    entryCount: expenses.length,
    remainingBudget,
    spentPercent,
    rawSpentPercent,
    categoryTotals,
    budgetLimit: BUDGET_LIMIT,
  };
}
