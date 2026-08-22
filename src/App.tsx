import { useState, useEffect } from "react";
import type { Expense } from "./types/expense";
import "./App.css";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import SummaryCard from "./components/SummaryCard";

function App() {
  // =========================
  // STATE
  // =========================

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem("expenses");

    if (!savedExpenses) {
      return [];
    }

    try {
      return JSON.parse(savedExpenses);
    } catch {
      return [];
    }
  });

  const [editingExpense, setEditExpense] =
    useState<Expense | null>(null);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [sortBy, setSortBy] = useState("newest");

  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [expenseToDelete, setExpenseToDelete] =
    useState<Expense | null>(null);

  const [selectedMonth, setSelectedMonth] = useState("");

  // =========================
  // ADD EXPENSE
  // =========================

  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  // =========================
  // DELETE EXPENSE
  // =========================

  const deleteExpense = (id: number) => {
    setExpenses((prev) =>
      prev.filter((expense) => expense.id !== id)
    );
  };

  // =========================
  // UPDATE EXPENSE
  // =========================

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses((prev) =>
      prev.map((expense) => {
        if (expense.id === updatedExpense.id) {
          return updatedExpense;
        }

        return expense;
      })
    );
  };

  // =========================
  // CATEGORY FILTER
  // =========================

  const filteredExpenses =
    selectedCategory === "All"
      ? expenses
      : expenses.filter(
          (expense) =>
            expense.category === selectedCategory
        );

  // =========================
  // MONTH FILTER
  // =========================

  const monthFilteredExpenses = filteredExpenses.filter(
    (expense) => {
      if (selectedMonth === "") {
        return true;
      }

      return expense.date.startsWith(selectedMonth);
    }
  );

  // =========================
  // SEARCH FILTER
  // =========================

  const searchedExpenses = monthFilteredExpenses.filter(
    (expense) => {
      const search = searchTerm.toLowerCase();

      return (
        expense.title.toLowerCase().includes(search) ||
        expense.category.toLowerCase().includes(search)
      );
    }
  );

  // =========================
  // SORT
  // =========================

  const sortedExpenses = [...searchedExpenses].sort(
    (a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
        );
      }

      if (sortBy === "oldest") {
        return (
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
        );
      }

      if (sortBy === "higherAmt") {
        return b.amount - a.amount;
      }

      if (sortBy === "lowerAmt") {
        return a.amount - b.amount;
      }

      return 0;
    }
  );

  // =========================
  // CATEGORIES
  // =========================

  const categories = [
    "All",
    ...new Set(
      expenses.map((expense) => expense.category)
    ),
  ];

  // =========================
  // SUMMARY
  // =========================

  const totalExpenses = monthFilteredExpenses.reduce(
    (sum, expense) => {
      return sum + expense.amount;
    },
    0
  );

  const totalTransactions =
    monthFilteredExpenses.length;

  const averageExpense =
    monthFilteredExpenses.length === 0
      ? 0
      : totalExpenses / monthFilteredExpenses.length;

  // =========================
  // LOCAL STORAGE
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "expenses",
      JSON.stringify(expenses)
    );
  }, [expenses]);

  // =========================
  // DELETE MODAL
  // =========================

  const askDelete = (expense: Expense) => {
    setExpenseToDelete(expense);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (expenseToDelete) {
      deleteExpense(expenseToDelete.id);

      setExpenseToDelete(null);
      setShowModal(false);
    }
  };
   // =========================
  // clear filter 
  // =========================
  const clearFilters = () => {
  setSearchTerm("");
  setSelectedCategory("All");
  setSelectedMonth("");
};
if(expenses.length===0){
  clearFilters()
}

  // =========================
  // Stattics by category
  // =========================
 const categoryTotals = expenses.reduce(
  (acc: Record<string, number>, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }

    acc[expense.category] += expense.amount;

    return acc;
  },
  {}
);





  // =========================
  // UI
  // =========================
  // =========================
  // UI
  // =========================
  // =========================
  // UI
  // =========================
  // =========================
  // UI
  // =========================

  return (
    <>
      {/* DELETE MODAL */}

      {showModal && expenseToDelete && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => {
            setShowModal(false);
            setExpenseToDelete(null);
          }}
        >
          <div
            className="bg-gray-300 w-full max-w-md p-6 rounded-xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Delete Expense?
            </h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-bold text-gray-800">
                "{expenseToDelete.title}"
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setExpenseToDelete(null);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TITLE */}

      <h1 className="bg-pink-600">
        Expense Tracker
      </h1>

      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        className="border rounded p-1 mx-auto"
      />

      {/* MONTH */}

      <input
        type="month"
        value={selectedMonth}
        onChange={(e) =>
          setSelectedMonth(e.target.value)
        }
      />

      {/* SUMMARY CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
        <SummaryCard
          title="Total Transactions"
          value={totalTransactions}
        />

        <SummaryCard
          title="Total Amount"
          value={`₹${totalExpenses}`}
        />

        <SummaryCard
          title="Average Expense"
          value={`₹${averageExpense.toFixed(2)}`}
        />
      </div>

      {/* FILTER + SORT */}

      <div className="category m-4 flex justify-between items-center">
        {/* CATEGORY */}

        <select
          className="p-2"
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value)
          }
        >
          {categories.map((category) => (
            <option
              value={category}
              key={category}
            >
              {category}
            </option>
          ))}
        </select>

        {/* SORT */}

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >
          <option value="newest">
            Newest
          </option>

          <option value="oldest">
            Oldest
          </option>

          <option value="higherAmt">
            Higher Amount
          </option>

          <option value="lowerAmt">
            Lower Amount
          </option>
        </select>
      </div>

      {/* FORM */}

      <ExpenseForm
        addExpense={addExpense}
        editingExpense={editingExpense}
        setEditExpense={setEditExpense}
        updateExpense={updateExpense}
      />

      {/* EXPENSE LIST */}

      <ExpenseList
        expenses={sortedExpenses}
        deleteExpense={deleteExpense}
        setEditExpense={setEditExpense}
        askDelete={askDelete}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
      />
    </>
  );
}

export default App;