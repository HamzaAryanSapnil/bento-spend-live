# BentoSpend

Smart expense and budget manager built with Vite, React, and Tailwind CSS. Track transactions, stay within a monthly budget, and manage your spending with search, filter, and sort — all from a clean bento-style UI.

## Project Description

BentoSpend is a React expense tracker for Reactive Accelerator Batch 5. It converts the provided HTML template into a fully interactive application. Expense records live in React state (no database). Shared expense data is managed with the Context API and `useReducer`; local UI state uses `useState` thoughtfully. Totals, remaining budget, and filtered lists are derived during render so redundant state is avoided.

## Features

- Add, edit, and delete expense transactions via custom modals (no third-party modal library)
- Form validation with inline error messages
- Dummy seed data so the UI is populated on first load
- Live summary cards: total expense, entry count, and remaining budget
- Hardcoded monthly budget of `$4,000` with progress tracking (negative remaining when overspent)
- Category spending overview
- Search expenses by title
- Filter by category tag (Food, Rent, Entertainment, Medical, Utilities, Shopping, Other)
- Sort by date or amount (ascending / descending)
- Empty state: **List is empty!**
- No-match state: **Not Found**
- Toast notifications for successful actions
- Responsive layout for mobile and desktop

## Tech Stack

- React 19 (JavaScript only — no TypeScript)
- Vite
- Context API + `useReducer` (expense CRUD)
- `useState` for filters, modals, forms, and toast UI
- Tailwind CSS v4 (CDN browser build)
- Semantic HTML + SVG assets from the provided HTML template

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Install

```bash
cd bento-spend
npm install
```

### Run locally

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview
```

## Project Structure

```txt
bento-spend/
├── public/assets/          # logo, empty-state, not-found SVGs
├── src/
│   ├── components/         # UI components
│   ├── constants/          # budget limit & category styles
│   ├── contexts/           # ExpensesProvider (split state/dispatch contexts)
│   ├── data/               # dummy expenses
│   ├── reducers/           # expenseReducer (added / changed / deleted)
│   ├── utils/              # formatters, filter/sort, stats helpers
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
└── README.md
```

## State Management Notes

- **`useReducer` + dual Context** (`ExpensesContext` / `ExpensesDispatchContext`) handle the expenses list, following the React docs “Scaling Up with Reducer and Context” pattern.
- **Grouped `useState`** in the provider manages filters and modal UI without prop drilling.
- **Derived values** (totals, remaining budget, filtered list) are calculated during render — never stored as duplicate state.

## License

This project is created for educational purposes as part of Learn with Sumit Reactive Accelerator Batch 5.
