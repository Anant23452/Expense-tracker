import React, { useState } from 'react'

export default function ExpenseForm() {
  const [title,setTitle]=useState("");
  return (
    <>
    <div>ExpenseForm</div>
    <input 
    type="text" 
    placeholder='type expenses'
    value={title}
    onChange={(e)=>setTitle(e.target.value)}

    />
    </>
  )
}
