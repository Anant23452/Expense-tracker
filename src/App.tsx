import { useState } from "react";
import { useEffect } from "react";
import type { Expense } from "./types/expense";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditExpense] = useState<Expense | null>(null);
  const [selectedCategory, setselectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  //  callback functin

  // add expensese
  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
  };
  useEffect(() => {
    console.log(expenses);
  }, [expenses]);

  // delete  expense
  const deleteExpense = (id: Number) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  //  updated expense
  // 1. The function name declares the action. The parameter holds the NEW data.
  const updateExpense = (updatedExpense: Expense) => {
    setExpenses((prev) =>
      // 2. 'expense' represents the CURRENT item inside the loop
      prev.map((expense) => {
        // 3. Match the current item's ID with the incoming item's ID
        if (expense.id === updatedExpense.id) {
          return updatedExpense; // Swap the old one out for the NEW one
        }

        return expense; // Keep the old one unchanged
      }),
    );
  };

  // /filter expensese
  const filteredExpenses =
    selectedCategory === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory);

  //use of set
  const categories = [
    "All",
    ...new Set(expenses.map((expense) => expense.category)),
  ];
  //calculationg total expenses
  const totalExpenses = filteredExpenses.reduce((sum, expenses) => {
    return sum + expenses.amount;
  }, 0);

  ///expense summary
  const totalAmount = totalExpenses;
  const averageExpense =
    filteredExpenses.length === 0 ? 0 : totalAmount / filteredExpenses.length;

  const SortedExpenses=[...filteredExpenses].sort((a,b)=>{
    if(sortBy==="newest"){
      return new Date(b.date).getDate()-new Date(a.date).getDate();
    }
    if(sortBy==="oldest"){
      return new Date(a.date).getDate()- new Date(b.date).getDate();
    }
    if(sortBy==="higherAmt"){
      return b.amount-a.amount;

    }
    if(sortBy==="lowerAmt"){
      return a.amount-b.amount;
    }
  })
  return (
    <>
      <h1 className="bg-pink-600 ">Expense Tracker</h1>
      <div className="category m-4   flex justify-between items-center">
        <span className="p-3  bg-yellow-500 text-gray-800 ">
          Total Expenses: ₹{totalExpenses}
        </span>
        <p className="bg-pink-400 p-2 text-black">
          Average Expense: ₹{averageExpense.toFixed(2)}
        </p>

        {/* /this select is uncontrolled component because it does not have a value prop that is tied to state. To make it controlled, you can add a value prop that is tied to the selectedCategory state variable and update the state when the user selects a new category. */}
        <select
          className="p-2 "
          value={selectedCategory}
          onChange={(e) => setselectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
        {/* making second  dropdown with controlled select
         */}

        <select
          name=""
          id=""
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="higherAmt">Higher Amount</option>
          <option value="lowerAmt">Lower Amount</option>
        </select>
      </div>
      <ExpenseForm
        addExpense={addExpense}
        editingExpense={editingExpense}
        setEditExpense={setEditExpense}
        updateExpense={updateExpense}
      />

      <ExpenseList
        expenses={SortedExpenses}
        deleteExpense={deleteExpense}
        setEditExpense={setEditExpense}
      />
    </>
  );
}

export default App;
