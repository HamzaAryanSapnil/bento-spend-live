import CategoryOverview from './components/CategoryOverview';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import ExpenseList from './components/ExpenseList';
import ExpenseModal from './components/ExpenseModal';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import Toast from './components/Toast';
import Toolbar from './components/Toolbar';
import ExpensesProvider from './contexts/ExpensesContext';

export default function App() {
  return (
    <ExpensesProvider>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <SummaryCards />
          <CategoryOverview />
          <Toolbar />
          <ExpenseList />
        </main>

        <footer className="mt-auto border-t border-[#111827]/10 bg-[#FFF5E6]/40 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
            <p>© 2026 BentoSpend • Smart Expense Tracker</p>
            <div className="flex items-center gap-4">
              <span>Design System: Bento Modular</span>
              <span className="w-1 h-1 rounded-full bg-[#6B7280]" />
              <span>Tailwind CSS v4</span>
            </div>
          </div>
        </footer>

        <ExpenseModal />
        <DeleteConfirmModal />
        <Toast />
      </div>
    </ExpensesProvider>
  );
}
