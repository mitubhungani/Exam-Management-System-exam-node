import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'js-cookie';

const AddExam = () => {
  const [name, setExamName] = useState('');
  const [totalmarks, setTotalexammarks] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('name');
    // console.log(token);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to the Authorization header
      },
    };

    const exam = { name, totalmarks };

    try {
      const data = await axios.post('http://localhost:8090/exam/addexam', exam, config);
      console.log(data);
    } catch (error) {
      console.error("Error adding exam:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Exam</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Exam Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Exam Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setExamName(e.target.value)}
              name="name"
              placeholder="Enter Exam Name"
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Total Exam Marks Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Exam Marks:
            </label>
            <input
              type="number"
              value={totalmarks}
              onChange={(e) => setTotalexammarks(e.target.value)}
              name="totalmarks"
              placeholder="Enter Total Exam Marks"
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Add Exam
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExam;
