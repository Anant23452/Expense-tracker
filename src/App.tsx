import { useState } from "react";
import { useEffect } from "react";
import type { Expense } from "./types/expense";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
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
  const [editingExpense, setEditExpense] = useState<Expense | null>(null);
  const [selectedCategory, setselectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [SearchTerm,setSearchTerm]=useState("");
  const[showModel,setShowModel]=useState(false);
  const[expenseToDelete,setExpenseToDelete]=useState<Expense|null>(null);
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




  //save  Expenses in localStorage;
  // when app started we load the stored data 
  
  //save when expenses changes
  useEffect(()=>{
    localStorage.setItem("expenses",JSON.stringify(expenses))
  },[expenses]);


  //search expenses
  const SearchedExpenses= filteredExpenses.filter((expense)=>{
   return(
     expense.title.toLowerCase().includes(SearchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(SearchTerm.toLowerCase())
   )
  })
  //sort expenses
  const SortedExpenses=[...SearchedExpenses].sort((a,b)=>{
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

  //making model for delete 
  const askDelete= (expense:Expense)=>{
    setExpenseToDelete(expense);
    setShowModel(true);
  }
  const confirmDelete=()=>{
if (expenseToDelete) {
    deleteExpense(expenseToDelete.id);
    setExpenseToDelete(null);
    setShowModel(false);
  }
  }
  
 
  return (
    <>
   {showModel && expenseToDelete && (
  <div
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    onClick={() => {
      setShowModel(false);
      setExpenseToDelete(null);
    }}
  >
    {/* Modal Box */}
    <div
      className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-800 mb-3">
        Delete Expense?
      </h2>

      {/* Message */}
      <p className="text-gray-600 mb-6">
        Are you sure you want to delete{" "}
        <span className="font-bold text-gray-800">
          "{expenseToDelete.title}"
        </span>
        ?
      </p>

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        {/* Cancel */}
        <button
          onClick={() => {
            setShowModel(false);
            setExpenseToDelete(null);
          }}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>

        {/* Confirm Delete */}
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

      <h1 className="bg-pink-600 ">Expense Tracker</h1>
      <input
       type="text" 
       placeholder="Search"
       value={SearchTerm}
       onChange={(e)=>setSearchTerm(e.target.value)}
        className="border-1 rounded p-1 mx-auto placeholder:text-gray-400 placeholder:text-sm placeholder:italic"
        />
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
        askDelete={askDelete}
      />
    </>
  );
}

export default App;
