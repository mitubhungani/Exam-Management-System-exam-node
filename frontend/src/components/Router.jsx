import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import AddMcq from './AddMcq'
import AddExam from './AddExam'
import Exams from './Exams'
import OpenExam from './OpenExam'

const Router = () => {
  return (
    <div>
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/addmcq" element={<AddMcq />} />
            <Route path='/addexam' element={<AddExam />} />
            <Route path='/exams' element={<Exams />} />
            <Route path='/exams/:examid' element={<OpenExam />} />
            
        </Routes>
    </div>
  )
}

export default Router