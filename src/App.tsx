import { useState } from 'react'
import type { Expense } from "./types/expense";
import './App.css'

function App() {
 const [expenses, setExpenses] = useState<Expense[]>([]);

  return (
   <>
   <h1 className='bg-blue-600'>
    Expense Tracker
   </h1>
   </>
  )
}

export default App
