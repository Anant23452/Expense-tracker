import React, { useState, type ChangeEvent } from 'react'

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
  return (
    <>
   <div className="main flex flex-col justify-center gap-1  items-center 
   ">
     <div>ExpenseForm</div>

     {/* Title input value  */}
    <input 
    type="text" 
    placeholder='type expenses'
    value={title}
    onChange={handleTitleEvent}
    className='border-2 rounded p-2'

    />

    {/* //Amount input value  */}
    <input
    type ="number"
    placeholder='Enter Amount'
    value={amount}
    onChange={(e)=>setAmount(e.target.value)}
    />
    {/* Category input value  */}
    <input type="text"
    placeholder='Enter Category' 
    value={category}
    onChange={(e)=>setCategory(e.target.value)}
    />
    {/* Date input value  */}
    <input type="text"
    placeholder='Enter Date'
    value={date}
    onChange={(e)=>setDate(e.target.value)}
    
    />

    <p>{title} </p>
   </div>
    </>
  )
}
