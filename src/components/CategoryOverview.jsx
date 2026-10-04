import { OVERVIEW_CATEGORIES } from '../constants/categories';
import { useExpenses } from '../contexts/ExpensesContext';
import { formatMoney } from '../utils/formatMoney';
import { getExpenseStats } from '../utils/getExpenseStats';

export default function CategoryOverview() {
  const { expenses } = useExpenses();
  const { categoryTotals } = getExpenseStats(expenses);

  return (
    <section className="bg-white rounded-3xl p-6 border border-[#111827]/10 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-base font-bold text-[#111827]">
            Category Spending Overview
          </h2>
          <p className="text-xs text-[#6B7280]">
            Real-time dynamic category distribution
          </p>
        </div>
        <div className="text-xs font-semibold text-[#80A1C1] bg-[#80A1C1]/10 px-3 py-1.5 rounded-full self-start sm:self-auto">
          Updated with State
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {OVERVIEW_CATEGORIES.map((category) => (
          <div
            key={category.key}
            className="p-3 bg-[#FFF5E6] rounded-2xl border border-[#111827]/5 flex flex-col justify-between"
          >
            <span className="text-xs text-[#6B7280] font-medium">
              {category.label}
            </span>
            <span className="text-sm font-bold font-mono text-[#111827] mt-1">
              {formatMoney(categoryTotals[category.key] || 0)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
