import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import AddMcq from './AddMcq'
import AddExam from './AddExam'

const Router = () => {
  return (
    <div>
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/addmcq" element={<AddMcq />} />
            <Route path='/addexam' element={<AddExam />} />
        </Routes>
    </div>
  )
}

export default Router