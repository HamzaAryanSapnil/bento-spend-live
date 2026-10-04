import { useEffect } from 'react';
import { useExpenses } from '../contexts/ExpensesContext';

export default function Toast() {
  const { toast, hideToast } = useExpenses();

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = setTimeout(() => {
      hideToast();
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast, hideToast]);

  if (!toast) {
    return null;
  }

  const icon = toast.type === 'error' ? '!' : '✓';
  const iconColor =
    toast.type === 'error' ? 'text-[#DC2626]' : 'text-[#16A34A]';

  return (
    <div className="fixed bottom-6 right-6 z-50 transform transition-all duration-300 max-w-md">
      <div className="bg-[#111827] text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-white/10">
        <span className={`${iconColor} text-lg`}>{icon}</span>
        <p className="text-xs font-medium text-[#FFF5E6]">{toast.message}</p>
      </div>
    </div>
  );
}
