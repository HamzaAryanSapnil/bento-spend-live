import { useExpenses } from '../contexts/ExpensesContext';

export default function Header() {
  const { filters, updateSearch, openAddModal } = useExpenses();

  const handleSearchChange = (event) => {
    updateSearch(event.target.value);
  };

  const handleClearSearch = () => {
    updateSearch('');
  };

  return (
    <header className="sticky top-0 z-30 bg-[#FFF5E6]/90 backdrop-blur-md border-b border-[#111827]/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#111827] flex items-center justify-center shadow-sm p-1.5">
            <img
              src="/assets/logo.svg"
              alt="BentoSpend Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight text-[#111827]">
                Bento<span className="text-[#80A1C1]">Spend</span>
              </h1>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-[#FAD4C0] text-[#111827] rounded-full">
                v1.0
              </span>
            </div>
            <p className="text-xs text-[#6B7280]">Expense & Budget Manager</p>
          </div>
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <input
              type="text"
              value={filters.search}
              onChange={handleSearchChange}
              placeholder="Search expenses by title..."
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#111827]/15 rounded-xl text-sm text-[#111827] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#80A1C1] focus:border-transparent transition-all shadow-sm"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6B7280]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {filters.search && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B7280] hover:text-[#111827]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openAddModal}
            className="flex items-center gap-2 bg-[#FAD4C0] hover:bg-[#f5c0a7] active:scale-[0.98] text-[#111827] px-4 sm:px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm border border-[#111827]/10 cursor-pointer"
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
            <span>Add Expense</span>
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-[#111827]/10">
            <div className="w-9 h-9 rounded-xl bg-[#80A1C1] flex items-center justify-center font-bold text-white text-sm shadow-sm">
              LWS
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
