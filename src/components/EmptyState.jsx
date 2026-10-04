import { useExpenses } from '../contexts/ExpensesContext';

export default function EmptyState() {
  const { openAddModal } = useExpenses();

  return (
    <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-[#111827]/20">
      <img
        src="/assets/empty-state.svg"
        alt="Empty state"
        className="w-32 h-32 mx-auto mb-4"
      />
      <h3 className="text-lg font-bold text-[#111827]">List is empty!</h3>
      <p className="text-sm text-[#6B7280] max-w-sm mx-auto mt-1 mb-6">
        You haven&apos;t added any expense entries yet. Start tracking your
        budget by recording your first expense.
      </p>
      <button
        type="button"
        onClick={openAddModal}
        className="inline-flex items-center gap-2 bg-[#FAD4C0] hover:bg-[#f5c0a7] text-[#111827] px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span>Add First Expense</span>
      </button>
    </div>
  );
}
