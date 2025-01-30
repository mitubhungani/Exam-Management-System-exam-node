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
        // console.log(response.data);
        setExams(response.data);
      } catch (error) {
        console.error(
          "Error fetching exams:",
          error.response?.data || error.message
        );
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
    // console.log(token);

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
      // console.log(data);
      const res = await axios.post(
        "http://localhost:8090/exam/addmcq",
        data,
        config
      );
      console.log("MCQ added successfully:", res.data);
    } catch (error) {
      console.error("Error adding MCQ:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add Exam
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <label className="block text-sm font-medium text-gray-700">
              Exam Name:
            </label>
            <input
              type="text"
              name="title"
              onChange={handleInput}
              value={formdata?.title}
              placeholder="Enter Title"
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="my-3">
            <label className="block text-sm font-medium text-gray-700">
              Options:
            </label>
            <input
              type="text"
              name="options[0]"
              onChange={handleInput}
              placeholder="Enter Option A"
              value={formdata.options[0]}
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              name="options[1]"
              onChange={handleInput}
              placeholder="Enter Option B"
              value={formdata.options[1]}
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              name="options[2]"
              onChange={handleInput}
              placeholder="Enter Option C"
              value={formdata.options[2]}
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              name="options[3]"
              onChange={handleInput}
              placeholder="Enter Option D"
              value={formdata.options[3]}
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="my-3">
            <label className="block text-sm font-medium text-gray-700">
              Select Ans:
            </label>
            <select
              name="ans"
              onChange={handleInput}
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={formdata.ans[0]}>A</option>
              <option value={formdata.ans[1]}>B</option>
              <option value={formdata.ans[2]}>C</option>
              <option value={formdata.ans[3]}>D</option>
            </select>
          </div>

          <div className="my-3">
            <label className="block text-sm font-medium text-gray-700">
              Select Exam:
            </label>
            <select
              name="exam"
              onChange={handleInput}
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
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

          <div className="my-3">
            <label className="block text-sm font-medium text-gray-700">
              Enter Marks:
            </label>
            <input
              type="number"
              name="marks"
              onChange={handleInput}
              value={formdata?.marks}
              min="1"
              placeholder="Enter marks"
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full my-3 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMcq;
