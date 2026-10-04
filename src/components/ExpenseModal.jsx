import { useEffect, useState } from 'react';
import { FORM_CATEGORIES } from '../constants/categories';
import {
  useExpenses,
  useExpensesDispatch,
} from '../contexts/ExpensesContext';
import { getNextId } from '../utils/getNextId';

const EMPTY_FORM = {
  title: '',
  amount: '',
  category: '',
  date: '',
  note: '',
};

const EMPTY_ERRORS = {
  title: '',
  amount: '',
  category: '',
  date: '',
};

function getInputClassName(hasError, withPrefix = false) {
  const padding = withPrefix ? 'pl-8 pr-4' : 'px-4';
  const border = hasError
    ? 'border-[#DC2626]/40'
    : 'border-[#111827]/15';

  return `w-full ${padding} py-2.5 bg-[#FFF5E6]/40 border ${border} rounded-xl text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#80A1C1] focus:bg-white transition-all`;
}

export default function ExpenseModal() {
  const {
    expenses,
    expenseModal,
    closeExpenseModal,
    showToast,
  } = useExpenses();
  const dispatch = useExpensesDispatch();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState(EMPTY_ERRORS);

  const isEditing = expenseModal.editingId !== null;
  const editingExpense = isEditing
    ? expenses.find((expense) => expense.id === expenseModal.editingId)
    : null;

  useEffect(() => {
    if (!expenseModal.isOpen) {
      return;
    }

    if (editingExpense) {
      setFormData({
        title: editingExpense.title,
        amount: String(editingExpense.amount),
        category: editingExpense.category,
        date: editingExpense.date,
        note: editingExpense.note || '',
      });
    } else {
      setFormData(EMPTY_FORM);
    }

    setFieldErrors(EMPTY_ERRORS);
  }, [expenseModal.isOpen, editingExpense]);

  useEffect(() => {
    if (!expenseModal.isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeExpenseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expenseModal.isOpen, closeExpenseModal]);

  if (!expenseModal.isOpen) {
    return null;
  }

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name in EMPTY_ERRORS) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = { ...EMPTY_ERRORS };

    if (!formData.title.trim()) {
      errors.title = 'Expense title is required';
    }

    if (!formData.amount) {
      errors.amount = 'Amount is required';
    } else {
      const amountValue = Number(formData.amount);
      if (Number.isNaN(amountValue) || amountValue <= 0) {
        errors.amount = 'Enter a valid amount greater than 0';
      }
    }

    if (!formData.category) {
      errors.category = 'Please select a category';
    }

    if (!formData.date) {
      errors.date = 'Please choose a date';
    }

    return errors;
  };

  const hasFieldErrors = (errors) =>
    Object.values(errors).some((message) => message !== '');

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = validateForm();
    if (hasFieldErrors(errors)) {
      setFieldErrors(errors);
      return;
    }

    const expensePayload = {
      id: isEditing ? editingExpense.id : getNextId(expenses),
      title: formData.title.trim(),
      amount: Number(formData.amount),
      category: formData.category,
      date: formData.date,
      note: formData.note.trim(),
    };

    if (isEditing) {
      dispatch({ type: 'changed', expense: expensePayload });
      showToast('Expense updated successfully.');
    } else {
      dispatch({ type: 'added', expense: expensePayload });
      showToast('Expense added successfully.');
    }

    setFormData(EMPTY_FORM);
    setFieldErrors(EMPTY_ERRORS);
    closeExpenseModal();
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closeExpenseModal();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111827]/50 backdrop-blur-xs transition-opacity duration-200"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#111827]/15 shadow-2xl relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#111827]/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF5E6] text-[#111827] flex items-center justify-center border border-[#111827]/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3
                id="modalTitle"
                className="text-lg font-bold text-[#111827]"
              >
                {isEditing ? 'Edit Expense' : 'Add New Expense'}
              </h3>
              <p className="text-xs text-[#6B7280]">
                {isEditing
                  ? 'Update the details of this transaction'
                  : 'Enter details to record this transaction'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeExpenseModal}
            className="w-8 h-8 rounded-xl bg-[#FFF5E6] hover:bg-[#FAD4C0] text-[#111827] flex items-center justify-center transition-colors cursor-pointer"
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
        </div>

        <form
          key={expenseModal.editingId ?? 'new'}
          onSubmit={handleSubmit}
          className="space-y-4"
          noValidate
        >
          <div>
            <label
              htmlFor="expenseTitle"
              className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1.5"
            >
              Expense Title <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="text"
              id="expenseTitle"
              name="title"
              value={formData.title}
              onChange={handleFieldChange}
              placeholder="e.g. Grocery shopping, House rent, Electricity bill"
              aria-invalid={Boolean(fieldErrors.title)}
              className={getInputClassName(Boolean(fieldErrors.title))}
            />
            {fieldErrors.title && (
              <p className="mt-1.5 text-xs font-medium text-[#DC2626]">
                {fieldErrors.title}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="expenseAmount"
                className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1.5"
              >
                Amount ($) <span className="text-[#DC2626]">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#6B7280] font-mono text-sm font-semibold">
                  $
                </span>
                <input
                  type="number"
                  id="expenseAmount"
                  name="amount"
                  step="0.01"
                  min="0.01"
                  value={formData.amount}
                  onChange={handleFieldChange}
                  placeholder="0.00"
                  aria-invalid={Boolean(fieldErrors.amount)}
                  className={`${getInputClassName(Boolean(fieldErrors.amount), true)} font-mono`}
                />
              </div>
              {fieldErrors.amount && (
                <p className="mt-1.5 text-xs font-medium text-[#DC2626]">
                  {fieldErrors.amount}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="expenseCategory"
                className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1.5"
              >
                Category <span className="text-[#DC2626]">*</span>
              </label>
              <div className="relative">
                <select
                  id="expenseCategory"
                  name="category"
                  value={formData.category}
                  onChange={handleFieldChange}
                  aria-invalid={Boolean(fieldErrors.category)}
                  className={`${getInputClassName(Boolean(fieldErrors.category))} appearance-none cursor-pointer`}
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {FORM_CATEGORIES.map((category) => (
                    <option key={category.key} value={category.key}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#111827]">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {fieldErrors.category && (
                <p className="mt-1.5 text-xs font-medium text-[#DC2626]">
                  {fieldErrors.category}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="expenseDate"
              className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1.5"
            >
              Date <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="date"
              id="expenseDate"
              name="date"
              value={formData.date}
              onChange={handleFieldChange}
              aria-invalid={Boolean(fieldErrors.date)}
              className={getInputClassName(Boolean(fieldErrors.date))}
            />
            {fieldErrors.date && (
              <p className="mt-1.5 text-xs font-medium text-[#DC2626]">
                {fieldErrors.date}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="expenseNote"
              className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1.5"
            >
              Note / Description{' '}
              <span className="text-xs font-normal text-[#6B7280] lowercase">
                (optional)
              </span>
            </label>
            <textarea
              id="expenseNote"
              name="note"
              rows="2"
              value={formData.note}
              onChange={handleFieldChange}
              placeholder="Add brief details about this expense..."
              className="w-full px-4 py-2 bg-[#FFF5E6]/40 border border-[#111827]/15 rounded-xl text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#80A1C1] focus:bg-white transition-all resize-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#111827]/10">
            <button
              type="button"
              onClick={closeExpenseModal}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#111827] bg-[#FFF5E6] hover:bg-[#FAD4C0]/40 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-[#111827] bg-[#FAD4C0] hover:bg-[#f5c0a7] active:scale-[0.98] transition-all shadow-sm border border-[#111827]/10 cursor-pointer"
            >
              {isEditing ? 'Update Expense' : 'Save Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
