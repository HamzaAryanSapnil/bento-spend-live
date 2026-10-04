import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { initialExpenses } from '../data/dummyExpenses';
import expenseReducer from '../reducers/expenseReducer';

export const ExpensesContext = createContext(null);
export const ExpensesDispatchContext = createContext(null);

const DEFAULT_FILTERS = {
  search: '',
  category: 'All',
  sortBy: 'date-desc',
};

export default function ExpensesProvider({ children }) {
  const [expenses, dispatch] = useReducer(expenseReducer, initialExpenses);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [expenseModal, setExpenseModal] = useState({
    isOpen: false,
    editingId: null,
  });
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [toast, setToast] = useState(null);

  const openAddModal = useCallback(() => {
    setExpenseModal({ isOpen: true, editingId: null });
  }, []);

  const openEditModal = useCallback((expenseId) => {
    setExpenseModal({ isOpen: true, editingId: expenseId });
  }, []);

  const closeExpenseModal = useCallback(() => {
    setExpenseModal({ isOpen: false, editingId: null });
  }, []);

  const openDeleteModal = useCallback((expenseId) => {
    setDeleteTargetId(expenseId);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setDeleteTargetId(null);
  }, []);

  const updateSearch = useCallback((search) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const updateCategory = useCallback((category) => {
    setFilters((prev) => ({ ...prev, category }));
  }, []);

  const updateSortBy = useCallback((sortBy) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  const contextValue = useMemo(
    () => ({
      expenses,
      filters,
      expenseModal,
      deleteTargetId,
      toast,
      openAddModal,
      openEditModal,
      closeExpenseModal,
      openDeleteModal,
      closeDeleteModal,
      updateSearch,
      updateCategory,
      updateSortBy,
      resetFilters,
      showToast,
      hideToast,
    }),
    [
      expenses,
      filters,
      expenseModal,
      deleteTargetId,
      toast,
      openAddModal,
      openEditModal,
      closeExpenseModal,
      openDeleteModal,
      closeDeleteModal,
      updateSearch,
      updateCategory,
      updateSortBy,
      resetFilters,
      showToast,
      hideToast,
    ],
  );

  return (
    <ExpensesContext.Provider value={contextValue}>
      <ExpensesDispatchContext.Provider value={dispatch}>
        {children}
      </ExpensesDispatchContext.Provider>
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);

  if (!context) {
    throw new Error('useExpenses must be used within ExpensesProvider');
  }

  return context;
}

export function useExpensesDispatch() {
  const dispatch = useContext(ExpensesDispatchContext);

  if (!dispatch) {
    throw new Error('useExpensesDispatch must be used within ExpensesProvider');
  }

  return dispatch;
}
