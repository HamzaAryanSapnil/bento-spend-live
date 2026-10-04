import { useEffect } from 'react';
import {
  useExpenses,
  useExpensesDispatch,
} from '../contexts/ExpensesContext';

export default function DeleteConfirmModal() {
  const {
    expenses,
    deleteTargetId,
    closeDeleteModal,
    showToast,
  } = useExpenses();
  const dispatch = useExpensesDispatch();

  const targetExpense = expenses.find(
    (expense) => expense.id === deleteTargetId,
  );

  useEffect(() => {
    if (deleteTargetId === null) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeDeleteModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deleteTargetId, closeDeleteModal]);

  if (deleteTargetId === null || !targetExpense) {
    return null;
  }

  const handleConfirmDelete = () => {
    dispatch({ type: 'deleted', id: deleteTargetId });
    closeDeleteModal();
    showToast('Expense deleted successfully.');
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closeDeleteModal();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111827]/50 backdrop-blur-xs"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className="bg-white rounded-3xl max-w-sm w-full p-6 border border-[#111827]/15 shadow-2xl text-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="deleteModalTitle"
      >
        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
        <h3
          id="deleteModalTitle"
          className="text-lg font-bold text-[#111827]"
        >
          Delete Expense?
        </h3>
        <p className="text-xs text-[#6B7280] mt-1.5 mb-6">
          Are you sure you want to remove{' '}
          <span className="font-semibold text-[#111827]">
            {targetExpense.title}
          </span>
          ? This action cannot be undone.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={closeDeleteModal}
            className="w-full py-2.5 rounded-xl text-xs font-semibold text-[#111827] bg-[#FFF5E6] hover:bg-[#FAD4C0]/40 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmDelete}
            className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-[#DC2626] hover:bg-[#b91c1c] transition-all shadow-sm cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
