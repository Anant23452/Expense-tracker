import React, { useState } from 'react'

export default function ExpenseForm() {
  const [title,setTitle]=useState("");
  return (
    <>
   <div className="main flex flex-col justify-center gap-1  items-center 
   ">
     <div>ExpenseForm</div>
    <input 

    type="text" 
    placeholder='type expenses'
    value={title}
    onChange={(e)=>setTitle(e.target.value)}
    className='border-2 rounded p-2'

    />
    <p>{title} </p>
   </div>
    </>
  )
}
