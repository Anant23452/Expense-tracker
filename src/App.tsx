import { useState } from 'react'
import type { Expense } from "./types/expense";
import './App.css'
import ExpenseForm from './components/ExpenseForm';

function App() {
 const [expenses, setExpenses] = useState<Expense[]>([]);
//  callback functin 
 const addExpense =(expense:Expense)=>{
  setExpenses((prev)=>[...prev,expense])
 }

  return (
   <>
   <h1 className='bg-pink-600'>
    Expense Tracker
   </h1>
   <ExpenseForm addExpense = {addExpense} />
   </>
  )
}

export default App
