import { useState } from 'react'
import { useEffect } from "react";
import type { Expense } from "./types/expense";
import './App.css'
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

function App() {
 const [expenses, setExpenses] = useState<Expense[]>([]);
 const[editingExpense,setEditExpense]=useState<Expense|null>(null);
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

  return (
   <>
   <h1 className='bg-pink-600 '>
    Expense Tracker
   </h1>
   <ExpenseForm
    addExpense = {addExpense}
    updateExpense = {updateExpense}
      />

   <ExpenseList
    expenses={expenses}
    deleteExpense={deleteExpense}
     />
   
   </>
  )
}

export default App
