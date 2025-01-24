import axios from "axios";
import React, { useState } from "react";
import api from "../service/Handledata";

const Signup = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("student");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = {
      name,
      email,
      password,
      role,
    };
    console.log(user);

    let res = await axios.post('http://localhost:8090/signup',user)
    console.log(res.data)

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />
        <div>
          <label>Role</label>
          <select name="role"  value={role} onChange={(e) => setRole(e.target.value)}>
            <option  name="student" value="student">Student</option>
            <option name="teacher" value="teacher">Teacher</option>
            <option name="admin" value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;



// import React, { useState } from "react";

// const Signup = () => {
//   let [name, setName] = useState("");
//   let [email, setEmail] = useState("");
//   let [password, setPassword] = useState("");
//   let [role, setRole] = useState("student"); // Initialize with a default role

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let user = {
//       name,
//       email,
//       password,
//       role,
//     };
//     console.log(user);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>Name:</label>
//         <input
//           name="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           type="text"
//         />
//         <label>Email:</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           name="email"
//         />
//         <label>Password:</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           name="password"
//         />
//         <div>
//           <label>Role:</label>
//           <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
//             <option value="student">Student</option>
//             <option value="teacher">Teacher</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Signup;
