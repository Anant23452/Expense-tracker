import { useState } from 'react'
import { useEffect } from "react";
import type { Expense } from "./types/expense";
import './App.css'
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

function App() {
 const [expenses, setExpenses] = useState<Expense[]>([]);
 const[editingExpense,setEditExpense]=useState<Expense|null>(null);
 const [selectedCategory,setselectedCategory]=useState("All");
//  callback functin 


// add expensese 
 const addExpense =(expense:Expense)=>{
  setExpenses((prev)=>[...prev,expense])
 
 }
 useEffect(() => {
  console.log(expenses);
}, [expenses]);


// delete  expense 
const deleteExpense =(id:Number)=>{
  setExpenses((prev)=>
  prev.filter((expense)=>expense.id !==id))
}



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
    })
  );
};

//calculationg total expenses
  const totalExpenses = expenses.reduce((sum,expenses)=>{
    return sum + expenses.amount;
  },0) 

  // /filter expensese 
  const filteredExpenses =
  selectedCategory === "All"
    ? expenses
    : expenses.filter((expense) => expense.category === selectedCategory);

  return (
   <>
   <h1 className='bg-pink-600 '>
    Expense Tracker
   </h1>
   <span className='p-4 my-2 bg-yellow-500 text-gray-800 mx-auto'>Total Expenses: ₹{totalExpenses}</span>
   <ExpenseForm
    addExpense = {addExpense}
    editingExpense={editingExpense}
      setEditExpense={setEditExpense}
      updateExpense={updateExpense}
      />

   <ExpenseList
    expenses={expenses}
    deleteExpense={deleteExpense}
    setEditExpense={setEditExpense}
     />
   
   </>
  )
}

export default App
