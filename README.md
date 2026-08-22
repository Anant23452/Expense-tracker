# Expense Tracker

<p align="center">
  <strong>A calm, focused way to see where your money goes.</strong><br />
  Track everyday expenses, uncover spending patterns, and keep your records safely in your browser.
</p>

<p align="center">
  <a href="#live-demo">Live Demo</a> ·
  <a href="#features">Features</a> ·
  <a href="#getting-started">Getting Started</a> ·
  <a href="#project-journey">Project Journey</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-UI-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-Type--safe-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-Styled-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Storage-localStorage-4CAF50" alt="localStorage" />
</p>

> **Note:** Replace the repository, live-demo, author, and screenshot placeholders below before publishing this project.

## Overview

Expense Tracker is a front-end personal finance dashboard built to make day-to-day spending easier to capture and easier to understand. Add an expense in seconds, find it later with search and filters, and turn a list of transactions into useful category-level insights.

All data stays in the browser through `localStorage`, so the app works without a backend, account, database, or external API.

## The Idea

### The problem

Expense notes often end up scattered across memory, messages, or unfinished spreadsheets. Even when transactions are recorded, it can still be difficult to answer simple questions: *What did I spend the most on? How much did I spend this month? Which category is growing?*

### The solution

This project pairs quick expense entry with a clean analysis layer. It keeps the interaction simple while deriving summaries, category totals, percentages, visual spending bars, filters, search results, and sorting from one reliable source of truth.

## Features

### Expense management

- Create expenses with a title, amount, category, and date.
- Edit saved expenses when details change.
- Delete transactions only after confirming the action in a modal.
- Keep records after refreshing or reopening the browser with `localStorage`.

### Find what matters

- Search expenses by title or category.
- Filter transactions by category.
- Narrow the view to a selected month.
- Sort by newest, oldest, highest amount, or lowest amount.
- Receive clear empty states when there are no matching expenses.

### See the story behind the list

- View summary cards for total transactions, total spending, and average expense.
- Compare category totals at a glance.
- See each category's share of spending as a percentage.
- Use visual category bars to spot the largest spending areas quickly.

## Screenshots

Add real images after deployment so visitors can understand the project before opening it.

| Dashboard | Filtered transactions | Category insights |
| --- | --- | --- |
| `![Dashboard](./public/screenshots/dashboard.png)` | `![Filters](./public/screenshots/filters.png)` | `![Analytics](./public/screenshots/analytics.png)` |

### How to add screenshots

1. Create `public/screenshots/` in the project.
2. Capture the dashboard, a filtered/search result, and the category summary.
3. Save them as `dashboard.png`, `filters.png`, and `analytics.png`.
4. Replace the code-style placeholders in the table above with the actual image Markdown.

Suggested screenshot Markdown:

```md
![Expense Tracker dashboard](./public/screenshots/dashboard.png)
```

## Live Demo

**Demo:** [Add your deployed URL here](https://your-live-demo-url.example.com)

**Repository:** [Add your GitHub repository URL here](https://github.com/your-username/expense-tracker)

## Tech Stack

| Technology | Purpose |
| --- | --- |
| React | Component-based user interface |
| TypeScript | Safer data models, props, and state updates |
| Tailwind CSS | Fast, consistent, responsive styling |
| Browser `localStorage` | Persistent client-side expense records |

## How It Works

The app treats the saved expense list as the single source of truth. The visible list and dashboard metrics are derived from it instead of being saved separately.

```text
User input
    ↓
Validated, controlled form state
    ↓
Expense list state
    ↓
localStorage persistence
    ↓
Derived data pipeline
    ├── search by title/category
    ├── category and month filters
    ├── sorting
    ├── summary metrics
    └── category totals, percentages, and bars
    ↓
Rendered list and dashboard
```

This approach reduces duplicated state and helps ensure the analytics always reflect the current transactions.

## Project Structure

The exact filenames can vary, but the project is organized around a clear separation of UI, shared types, and expense-related logic:

```text
src/
├── components/          # Form, list, filters, summaries, modal, analytics UI
├── types/               # TypeScript expense and category definitions
├── utils/               # Storage and derived-data helpers, when applicable
├── App.tsx              # Main state and composition
├── main.tsx             # Application entry point
└── index.css            # Tailwind directives and global styles
public/
└── screenshots/         # Portfolio screenshots (add before publishing)
```

## Key Concepts Practiced

- **Controlled inputs:** form fields are driven by React state for predictable creation and editing.
- **CRUD flows:** expenses can be created, read in the list, updated, and deleted.
- **Derived state:** filtered results and analytics are calculated from the source expense list rather than stored independently.
- **Data transformation:** transactions move through a deliberate pipeline—filter, search, sort, then render.
- **Type safety:** TypeScript captures the expected expense shape and component contracts.
- **Persistence:** `localStorage` preserves the browser's data between sessions.
- **Safe destructive actions:** a confirmation modal adds an intentional pause before deletion.

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm (included with Node.js)

### Installation

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
npm install
npm run dev
```

Open the local URL shown in your terminal (commonly `http://localhost:5173`).

### Available Scripts

For a standard React + TypeScript project setup:

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run preview   # Preview the production build locally
```

If your `package.json` uses different script names, use the commands defined there.

## Using the App

1. Add a title, amount, category, and date, then save the expense.
2. Review the summary cards for your transaction count, total, and average.
3. Use search, category, and month controls to focus the list.
4. Change the sort order to inspect recent or high-value expenses.
5. Edit an item to correct it, or delete it after reviewing the confirmation modal.
6. Check the category section to understand where your spending is concentrated.

## Thoughtful States and Edge Cases

- A fresh browser starts with an empty expense list rather than failing on missing saved data.
- Empty search/filter results are handled with a clear empty state.
- Summary values are derived safely even when there are no expenses.
- Deletion requires a confirmation step to reduce accidental loss.
- Persisted records remain available after page refreshes in the same browser.

## Interface Notes

- Tailwind CSS supports a consistent, utility-first layout and visual hierarchy.
- Summary cards and category bars make numeric data easier to scan than a transaction list alone.
- Search, filters, and sorting make larger lists manageable without leaving the dashboard.

> Accessibility and responsive behavior should be verified in the deployed interface before making specific compliance claims. If you extend the project, consider keyboard focus states, semantic labels, contrast checks, and small-screen testing as part of every UI change.

## Project Journey

One of the key lessons in this project was understanding why state updates must not happen during rendering. A pattern like this creates a render loop:

```tsx
if (expenses.length === 0) {
  clearFilters(); // Avoid: updates state while rendering
}
```

The fix is to keep rendering free of side effects and handle state changes through events or carefully scoped effects when needed. This reinforced the central design of the app: state flows down, derived values are calculated predictably, and the UI renders from those values.

## Future Improvements

These are intentionally not part of the current project scope:

- Add charts for trends over time.
- Add budgets and monthly spending targets.
- Support recurring expenses.
- Export transactions to CSV.
- Add a theme preference, including dark mode.
- Evolve the app into a full-stack version after adding backend skills.

## Deployment

This project can be deployed as a static front-end application on platforms such as Vercel, Netlify, or GitHub Pages.

1. Run `npm run build` locally to confirm the production build succeeds.
2. Import the GitHub repository into your hosting provider.
3. Use the platform's standard Node build settings.
4. Add the deployed URL to the [Live Demo](#live-demo) section.

Because this project uses browser `localStorage`, each browser/device maintains its own saved expense data. Data is not shared or synced between devices.

## Contributing

Contributions, ideas, and bug reports are welcome.

1. Fork the project.
2. Create a branch: `git checkout -b feature/your-feature`.
3. Make a focused change and update documentation where helpful.
4. Open a pull request describing the problem and solution.

Please keep contributions aligned with the project's current front-end learning scope.

## License

Add a license before publishing. A common choice for portfolio projects is the [MIT License](https://choosealicense.com/licenses/mit/).

```text
Copyright (c) [Year] [Your Name]
```

## Author

**[Your Name]**

- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your LinkedIn profile](https://www.linkedin.com/in/your-profile)
- Portfolio: [your-portfolio-url.example.com](https://your-portfolio-url.example.com)

## Acknowledgements

- React, TypeScript, and Tailwind CSS communities for excellent tools and documentation.
- Everyone who gives thoughtful feedback during the learning process.
- Future you, for turning small daily entries into clearer financial habits.

---

<p align="center">Built with curiosity, clean state management, and a little more awareness of every rupee.</p>
