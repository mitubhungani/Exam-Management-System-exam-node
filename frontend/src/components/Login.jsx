import axios from 'axios'
import React, { useState } from 'react'
import Cookies from 'js-cookie'

const Login = () => {
    let [email,setEmail] = useState('')
    let [password,setPassword] = useState('')
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        let user = {
            email,
            password
        }
        console.log(user);

        let res = await axios.post('http://localhost:8090/login',user)
    console.log(res.data)
    let data = Cookies.set('name',res.data.token)
    console.log("data",data);
    
        
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>Email:</label><br/>
            <input type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
            <label>Password:</label><br/>
            <input type="password"name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/><br/>
            <input type="submit" value="Submit"/>
        </form>
    </div>
  )
}

export default Login