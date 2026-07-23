import { useState } from 'react'
import type { Expense } from "./types/expense";
import './App.css'
import ExpenseForm from './components/ExpenseForm';

function App() {
 const [expenses, setExpenses] = useState<Expense[]>([]);

  return (
   <>
   <h1 className='bg-pink-600'>
    Expense Tracker
   </h1>
   <ExpenseForm/>
   </>
  )
}

export default App
