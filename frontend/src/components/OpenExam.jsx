import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OpenExam = () => {
  const [exams, setExams] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [incorrectAnswer, setIncorrectAnswer] = useState(0);
  const [finalData, setFinalData] = useState({});
  const { examid } = useParams();

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

        const response = await axios.get(
          `http://localhost:8090/exam/${examid}`,
          config
        );
        setExams(response.data.mcqIds);
      } catch (error) {
        console.error(
          "Error fetching exams:",
          error.response?.data || error.message
        );
      }
    })();
  }, [examid]);

  const handleOptionChange = (questionId, selectedOption, e) => {
    const selectedData = e.target.getAttribute("data");

    setFinalData((prev) => ({
      ...prev,
      [questionId]: selectedData,
    }));

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const done = async () => {
    let correctCount = 0;
    let incorrectCount = 0;

    try {
      const mcqData = await axios.get(
        `http://localhost:8090/exam/${examid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("name")}`,
          },
        }
      );

      mcqData.data.mcqIds.forEach((data) => {
        if (data.ans === finalData[data._id]) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      });

      setCorrectAnswer(correctCount);
      setIncorrectAnswer(incorrectCount);

      if (correctCount > 0) {
        alert(`You passed the exam! Correct: ${correctCount}, Incorrect: ${incorrectCount}`);
      } else {
        alert("You failed the exam!");
      }
    } catch (error) {
      console.error(
        "Error checking the answer:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-8 text-blue-600">
        Open Exam
      </h1>
      {exams.map((e, index) => (
        <div
          key={index}
          className="bg-white p-4 mb-6 rounded-lg shadow-md border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-800">{e.title}</h2>
          <p className="text-sm text-gray-500 mb-4">Choose an option:</p>
          <div className="space-y-2">
            {e.options.map((option, optIndex) => (
              <label
                key={optIndex}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  required
                  type="radio"
                  id={optIndex}
                  data={
                    optIndex === 0
                      ? "A"
                      : optIndex === 1
                      ? "B"
                      : optIndex === 2
                      ? "C"
                      : "D"
                  }
                  name={e._id}
                  checked={selectedAnswers[e._id] === option}
                  onChange={(elm) => handleOptionChange(e._id, option, elm)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
          <p className="mt-2 text-gray-500 text-sm">Marks: {e.marks}</p>
        </div>
      ))}
      <button
        onClick={done}
        className="w-full py-3 mt-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Submit
      </button>
    </div>
  );
};

export default OpenExam;