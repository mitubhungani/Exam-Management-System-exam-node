// import React, { useEffect, useState } from "react";
// import api from "../service/Handledata";
// import axios from "axios";
// import Cookies from 'js-cookie'

// const AddMcq = () => {
//   let [exams, setExams] = useState([]);
//   let [formdata, setFormdata] = useState({
//     title: "",
//     options: ["", "", "", ""],
//     ans: ["A", "B", "C", "D"],
//     marks: "",
//   });

//   useEffect(() => {
//     (async function retruveExam() {
//       let data = await axios.get("http://localhost:8090/exam");
//       console.log(data.data.exam);
//       setExams(data);
      
//     })
//   }, []);

//   const handleInput = async (e) => {
//     let { value, name } = e.target;
//     if (name.startsWith("options")) {
//       const optionIndex = Number(name.split("[")[1].split("]")[0]);
//       setFormdata((prev) => {
//         const updatedOptions = [...prev.options];
//         updatedOptions[optionIndex] = value;
//         return setFormdata({ ...prev, options: updatedOptions });
//       });
//     }
//     else{

//         return setFormdata((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = Cookies.get('name')
//     console.log(token);

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`, // Add token to the Authorization header
//       },
//     };

//     let data={
//         title:formdata.title,
//         options:formdata.options,
//         ans:formdata.ans,
//         marks:formdata.marks,
//         exam:formdata.exam
//     }
//     console.log(data);
    
//     let res = await axios.post("http://localhost:8090/exam/addmcq", data,config);
//     console.log(res.data);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="title"
//           onChange={handleInput}
//           value={formdata?.title}
//           placeholder="Enter Title"
//         />

//         <div>
//           <label>Options</label>
//           <input
//             type="text"
//             name="options[0]"
//             onChange={handleInput}
//             placeholder="Enter Option A"
//             value={formdata?.options.option1}
//           />
//           <input
//             type="text"
//             name="options[1]"
//             onChange={handleInput}
//             placeholder="Enter Option B"
//             value={formdata?.options.option2}
//           />
//           <input
//             type="text"
//             name="options[2]"
//             onChange={handleInput}
//             placeholder="Enter Option C"
//             value={formdata?.options.option3}
//           />
//           <input
//             type="text"
//             name="options[3]"
//             onChange={handleInput}
//             placeholder="Enter Option D"
//             value={formdata?.options.option4}
//           />
//         </div>
//         <div>
//           <label>Selete Ans:</label>
//           <select name="ans" onChange={handleInput}>
//             <option value={formdata?.ans[0]}>A</option>
//             <option value={formdata?.ans[1]}>B</option>
//             <option value={formdata?.ans[2]}>C</option>
//             <option value={formdata?.ans[3]}>D</option>
//           </select>
//         </div>
//         <div>
//           <label>Exam</label>
//           <select name="exam" onChange={handleInput}>
//             {exams.map((elm, index) => (
//               <option key={elm._id || index} value={elm._id}>
//                 {elm.exam}
//               </option>
//             ))}
//           </select>
//         </div>

//         <input
//           type="number"
//           name="marks"
//           onChange={handleInput}
//           value={formdata?.marks}
//           min="1"
//           placeholder="Enter marks"
//         />
//         <button type="submit">Add</button>
//       </form>
//     </div>
//   );
// };

// export default AddMcq;





import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AddMcq = () => {
  const [exams, setExams] = useState([]); // Initialize as an empty array
  const [formdata, setFormdata] = useState({
    title: "",
    options: ["", "", "", ""],
    ans: ["A", "B", "C", "D"],
    marks: "",
    exam: "",
  });

  useEffect(() => {
    (async function retrieveExam() {
      try {
        const token = Cookies.get("name");
        if (!token) {
          console.error("Authorization token is missing!");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get("http://localhost:8090/exam", config);
        console.log(response.data);
        setExams(response.data);
      } catch (error) {
        console.error("Error fetching exams:", error.response?.data || error.message);
      }
    })();
  }, []);

  const handleInput = (e) => {
    const { value, name } = e.target;
    if (name.startsWith("options")) {
      const optionIndex = Number(name.split("[")[1].split("]")[0]);
      setFormdata((prev) => {
        const updatedOptions = [...prev.options];
        updatedOptions[optionIndex] = value;
        return { ...prev, options: updatedOptions };
      });
    } else {
      setFormdata((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("name");
    console.log(token);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = {
      title: formdata.title,
      options: formdata.options,
      ans: formdata.ans,
      marks: formdata.marks,
      exam: formdata.exam,
    };

    try {
      console.log(data);
      const res = await axios.post("http://localhost:8090/exam/addmcq", data, config);
      console.log("MCQ added successfully:", res.data);
    } catch (error) {
      console.error("Error adding MCQ:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleInput}
          value={formdata?.title}
          placeholder="Enter Title"
        />

        <div>
          <label>Options</label>
          <input
            type="text"
            name="options[0]"
            onChange={handleInput}
            placeholder="Enter Option A"
            value={formdata.options[0]}
          />
          <input
            type="text"
            name="options[1]"
            onChange={handleInput}
            placeholder="Enter Option B"
            value={formdata.options[1]}
          />
          <input
            type="text"
            name="options[2]"
            onChange={handleInput}
            placeholder="Enter Option C"
            value={formdata.options[2]}
          />
          <input
            type="text"
            name="options[3]"
            onChange={handleInput}
            placeholder="Enter Option D"
            value={formdata.options[3]}
          />
        </div>

        <div>
          <label>Select Ans:</label>
          <select name="ans" onChange={handleInput}>
            <option value={formdata.ans[0]}>A</option>
            <option value={formdata.ans[1]}>B</option>
            <option value={formdata.ans[2]}>C</option>
            <option value={formdata.ans[3]}>D</option>
          </select>
        </div>

        <div>
          <label>Exam</label>
          <select name="exam" onChange={handleInput}>
            <option value="">Select an Exam</option>
            {Array.isArray(exams) && exams.length > 0 ? (
              exams.map((elm, index) => (
                <option key={elm._id || index} value={elm._id}>
                  {elm.name}
                </option>
              ))
            ) : (
              <option disabled>No Exams Available</option>
            )}
          </select>
        </div>

        <input
          type="number"
          name="marks"
          onChange={handleInput}
          value={formdata?.marks}
          min="1"
          placeholder="Enter marks"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddMcq;
