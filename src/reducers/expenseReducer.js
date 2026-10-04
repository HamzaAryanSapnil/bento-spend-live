export default function expenseReducer(expenses, action) {
  switch (action.type) {
    case 'added': {
      return [...expenses, action.expense];
    }
    case 'changed': {
      return expenses.map((expense) =>
        expense.id === action.expense.id ? action.expense : expense,
      );
    }
    case 'deleted': {
      return expenses.filter((expense) => expense.id !== action.id);
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}
