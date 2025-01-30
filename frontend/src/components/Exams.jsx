import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Exams = () => {
  const [exams, setExams] = useState([]);

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

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Exams</h1>
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {exams.map((e, index) => (
          <Link
            to={`/exams/${e._id}`}
            key={index}
            className="block bg-white shadow-lg rounded-lg p-6 hover:bg-blue-50 transition"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-700">
                {e.name}
              </h2>
              <p className="text-gray-600 mt-2">Total Marks: {e.totalmarks}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Exams;
