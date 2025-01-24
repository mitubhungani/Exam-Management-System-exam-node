import axios from 'axios'
import React, { useState } from 'react'
import Cookies from 'js-cookie'

const AddExam = () => {

  let [name, setExamName] = useState('')
  let [totalmarks, setTotalexammarks] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault()
    const token = Cookies.get('name')
        console.log(token);
    
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the Authorization header
          },
        };
    let exam = {
      name,
      totalmarks
    }
    let data = await axios.post('http://localhost:8090/exam/addexam',exam,config)
    console.log(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="examName">Exam Name:</label>
        <input type="text" value={name} onChange={(e)=>setExamName(e.target.value)} name="name" placeholder='Enter Exam' required />
        <label htmlFor="examDate">Total Exam Marks:</label>
        <input type="number"value={totalmarks} onChange={(e)=>setTotalexammarks(e.target.value)} name="totalmarks" placeholder='Enter Total Exam Marks' required />
        <button type="submit">Add Exam</button>
      </form>
    </div>
  )
}

export default AddExam