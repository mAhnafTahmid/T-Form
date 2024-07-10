import React, { useEffect, useState } from "react";
import { useQuestionsContext } from "../Context/QuestionsContext";
import toast from "react-hot-toast";

const ShowQuestions = () => {
  const [submitted, setSubmitted] = useState(false);
  const [description, setDescription] = useState(null);

  const { questions, setQuestions } = useQuestionsContext();

  const handleFormSubmit = () => {
    if (description.numberOfTries < 1) {
      toast.error("You can no longer submit the answers");
      return;
    }

    // Update the number of tries
    const updatedNumberOfTries = description.numberOfTries - 1;

    // Create an updated description object
    const updatedDescription = {
      ...description,
      numberOfTries: updatedNumberOfTries,
    };

    // Update the description state
    setDescription(updatedDescription);

    // Filter out previous 'details' question
    const filteredQuestions = questions.filter(
      (question) => question.questionType !== "details"
    );

    // Update the questions state with the updated description
    setQuestions([...filteredQuestions, updatedDescription]);
    toast.success("Submitted you answer successfully");
  };

  const handleRadioClick = (questionIndex, optIndex) => {
    let newQuestions = [...questions];
    newQuestions[questionIndex].selectedOption = optIndex;
    // setSubmitted(false);
    setQuestions(newQuestions);
  };

  const handleInputChange = (questionIndex, value) => {
    let newQuestions = [...questions];
    newQuestions[questionIndex].textAnswer = value;
    setQuestions(newQuestions);
  };

  useEffect(() => {
    const detailQuestion = questions.find(
      (question) => question.questionType === "details"
    );
    if (detailQuestion) {
      setDescription(detailQuestion);
    }
  }, [questions]);

  return (
    <div className="flex flex-col justify-center items-center w-full flex-wrap">
      <div className="w-full max-w-full lg:max-w-4xl overflow-hidden">
        <h1 className="text-4xl text-red-500 pt-7 pb-5 px-7 break-words">{`Instruction: ${
          description ? description.description : "Not Set"
        }`}</h1>
        <h1 className="text-4xl text-red-500 pt-7 pb-5 px-7 ">{`Number of tries: ${
          description ? description.numberOfTries : "Not Set"
        }`}</h1>
      </div>
      {questions.map((q, index) => (
        <div
          key={index}
          className="my-5 text-center flex flex-col justify-center items-center w-full"
        >
          {q.questionType !== "details" && (
            <label className="text-3xl text-yellow-300  max-w-full lg:max-w-4xl overflow-hidden break-words">
              Q{index + 1}. {q.newQuestion}
            </label>
          )}
          {q.questionType === "mcq" &&
            q.options.map((opt, optIndex) => (
              <div key={optIndex} className="my-2 w-4/5 text-left flex">
                <input
                  type="radio"
                  id={`${index}-${optIndex}`}
                  name={`${index}`}
                  className="mr-2"
                  checked={q.selectedOption === optIndex}
                  onChange={() => handleRadioClick(index, optIndex)}
                ></input>
                <label
                  htmlFor={`${index}-${optIndex}`}
                  className={`py-2 px-4 w-[200px] hover:bg-gray-600 border rounded-lg border-transparent flex-grow ${
                    q.selectedOption === q.correctOption - 1 &&
                    q.selectedOption === optIndex &&
                    submitted
                      ? "bg-green-400"
                      : ""
                  }`}
                >
                  {opt}
                </label>
              </div>
            ))}
          {q.questionType === "image" && (
            <div className="my-2 w-4/5 flex flex-col justify-center items-center">
              <img
                src={q.imageUrl}
                alt="Question related"
                className="my-2"
                style={{ width: "500px", height: "400px" }}
              />
              <div className="my-2 w-4/5 pt-4">
                <textarea
                  className="w-full px-3 py-2 border border-gray-400 rounded mt-4 hover:border-blue-500 bg-white text-black"
                  value={q.textAnswer}
                  placeholder="Enter your answer"
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  rows="4" // You can adjust the number of rows as needed
                />
              </div>
            </div>
          )}
          {q.questionType === "text" && (
            <div className="my-2 w-4/5">
              <textarea
                className="w-full px-3 py-2 border border-gray-400 rounded mt-4 ml-4 mr-4 hover:border-blue-500 bg-white text-black"
                value={q.textAnswer}
                placeholder="Enter your answer"
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            </div>
          )}
        </div>
      ))}
      <div className="text-center my-7">
        <button
          type="button"
          className="px-4 py-2 bg-orange-500 border rounded-lg border-black my-4"
          onClick={handleFormSubmit}
        >
          Submit Answers
        </button>
      </div>
    </div>
  );
};

export default ShowQuestions;
