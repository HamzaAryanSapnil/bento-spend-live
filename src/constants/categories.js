export const OVERVIEW_CATEGORIES = [
  { key: 'Food', label: '🍱 Food' },
  { key: 'Rent', label: '🏠 Rent' },
  { key: 'Entertainment', label: '🎬 Entertainment' },
  { key: 'Medical', label: '💊 Medical' },
  { key: 'Utilities', label: '⚡ Utilities' },
  { key: 'Shopping', label: '🛍️ Shopping' },
];

export const FILTER_CATEGORIES = [
  { key: 'All', label: 'All Categories' },
  { key: 'Food', label: '🍱 Food' },
  { key: 'Rent', label: '🏠 Rent' },
  { key: 'Entertainment', label: '🎬 Entertainment' },
  { key: 'Medical', label: '💊 Medical' },
  { key: 'Utilities', label: '⚡ Utilities' },
  { key: 'Shopping', label: '🛍️ Shopping' },
  { key: 'Other', label: '✨ Other' },
];

export const FORM_CATEGORIES = [
  { key: 'Food', label: '🍱 Food' },
  { key: 'Rent', label: '🏠 Rent' },
  { key: 'Entertainment', label: '🎬 Entertainment' },
  { key: 'Medical', label: '💊 Medical' },
  { key: 'Utilities', label: '⚡ Utilities' },
  { key: 'Shopping', label: '🛍️ Shopping' },
  { key: 'Education', label: '📚 Education' },
  { key: 'Other', label: '✨ Other' },
];

export const CATEGORY_STYLES = {
  Shopping: {
    emoji: '🛍️',
    iconBox: 'bg-emerald-50 border-emerald-200',
    tag: 'bg-emerald-50 text-[#16A34A] border-emerald-200',
  },
  Entertainment: {
    emoji: '🎬',
    iconBox: 'bg-purple-100 border-purple-200',
    tag: 'bg-purple-100 text-purple-900 border-purple-200',
  },
  Medical: {
    emoji: '💊',
    iconBox: 'bg-red-50 border-red-200',
    tag: 'bg-red-50 text-[#DC2626] border-red-200',
  },
  Utilities: {
    emoji: '⚡',
    iconBox: 'bg-amber-50 border-amber-200',
    tag: 'bg-amber-50 text-[#D97706] border-amber-200',
  },
  Food: {
    emoji: '🍱',
    iconBox: 'bg-[#FAD4C0]/40 border-[#FAD4C0]',
    tag: 'bg-[#FAD4C0]/40 text-[#111827] border-[#FAD4C0]',
  },
  Rent: {
    emoji: '🏠',
    iconBox: 'bg-[#80A1C1]/20 border-[#80A1C1]/40',
    tag: 'bg-[#80A1C1]/20 text-[#111827] border-[#80A1C1]/40',
  },
  Education: {
    emoji: '📚',
    iconBox: 'bg-[#80A1C1]/15 border-[#80A1C1]/30',
    tag: 'bg-[#80A1C1]/15 text-[#111827] border-[#80A1C1]/30',
  },
  Other: {
    emoji: '✨',
    iconBox: 'bg-[#FFF5E6] border-[#111827]/10',
    tag: 'bg-[#FFF5E6] text-[#111827] border-[#111827]/10',
  },
};

export function getCategoryStyle(category) {
  return CATEGORY_STYLES[category] || CATEGORY_STYLES.Other;
}
