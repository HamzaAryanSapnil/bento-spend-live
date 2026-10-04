import { useExpenses } from '../contexts/ExpensesContext';
import { filterSortExpenses } from '../utils/filterSortExpenses';
import EmptyState from './EmptyState';
import ExpenseItem from './ExpenseItem';
import NotFoundState from './NotFoundState';

export default function ExpenseList() {
  const { expenses, filters } = useExpenses();
  const visibleExpenses = filterSortExpenses(expenses, filters);
  const isListEmpty = expenses.length === 0;
  const isNotFound = !isListEmpty && visibleExpenses.length === 0;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-[#111827]">
            Transactions & Records
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#80A1C1]/20 text-[#111827]">
            {visibleExpenses.length} Records
          </span>
        </div>
        <div className="text-xs text-[#6B7280]">
          Click pencil to edit, trash to delete
        </div>
      </div>

      {isListEmpty && <EmptyState />}
      {isNotFound && <NotFoundState />}

      {!isListEmpty && !isNotFound && (
        <div className="space-y-3">
          {visibleExpenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))}
        </div>
      )}
    </section>
  );
}
