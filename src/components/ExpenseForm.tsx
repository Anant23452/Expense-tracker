import React, { useState, type ChangeEvent } from 'react'
import type { Expense } from '../types/expense';
export default function ExpenseForm() {
  const [title,setTitle]=useState("");
  const [amount,setAmount]=useState("");
  const [category,setCategory]=useState("")
  const [date,setDate] =useState("");
  const handleTitleEvent=((
    e: React.ChangeEvent<HTMLInputElement>
    )=>{
    setTitle(e.target.value)
  })

  const handleSubmit=()=>{
    const newExpense:Expense={
      id:Date.now(),
      title,
      amount:Number(amount),
      category,
      date
    }
    console.log(newExpense)
  }
  return (
    <>
   <div className="main flex flex-col justify-center gap-2 items-center 
   ">
     <div className='bg-gray-300 p-2 font-bold text-gray-700 '>ExpenseForm</div>

  <div className="expenses flex gap-4">
       {/* Title input value  */}
    <input 
    type="text" 
    placeholder='type expenses'
    value={title}
    onChange={handleTitleEvent}
    className='border-1 rounded p-1'

    />

    {/* //Amount input value  */}
    <input
    type ="number"
    placeholder='Enter Amount'
    value={amount}
    onChange={(e)=>setAmount(e.target.value)}
     className='border-1 rounded p-1'
    />
    {/* Category input value  */}
    <input type="text"
    placeholder='Enter Category' 
    value={category}
    onChange={(e)=>setCategory(e.target.value)}
     className='border-1 rounded p-1'
    />
    {/* Date input value  */}
    <input type="text"
    placeholder='Enter Date'
    value={date}
    onChange={(e)=>setDate(e.target.value)}
     className='border-1 rounded p-1'
    
    />
  </div>
  <button onClick={handleSubmit}>Add Expense</button>

    <p>{title} </p>
   </div>
    </>
  )
}
