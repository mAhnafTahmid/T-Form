import React, { useState } from "react";
import { useQuestionsContext } from "../Context/QuestionsContext";
import { useQuestionTypeContext } from "../Context/QuestionTypeContext";
import toast from "react-hot-toast";

const CreateMcqQuestion = () => {
  const [options, setOptions] = useState([]);
  const [numberOfOptions, setNumberOfOptions] = useState(0);
  const [correctOption, setCorrectOption] = useState(0);
  const [newQuestion, setNewQuestion] = useState("");
  const { questions, setQuestions } = useQuestionsContext();
  const { questionType } = useQuestionTypeContext();

  const handleCreateMCQ = () => {
    const saveQuestion = {
      newQuestion,
      options,
      correctOption,
      questionType,
    };
    if (
      numberOfOptions > 0 &&
      correctOption > 0 &&
      correctOption <= numberOfOptions
    ) {
      setQuestions([...questions, saveQuestion]);
      setNewQuestion("");
      setNumberOfOptions(0);
      setOptions([]);
      setCorrectOption("");
      toast.success("Your question was added successfully");
      console.log(questions);
    } else {
      toast.error(
        "Number of answer options for MCQ must be greater than 0 and the correct answer must be within the range of the number of options"
      );
    }
  };

  const handleNumberOfOptions = (e) => {
    const number = +e.target.value;
    if (!isNaN(number) && number >= 0 && number < 8) {
      setNumberOfOptions(number);
      setOptions(Array(number).fill(""));
    }
  };

  const handleCorrectOption = (e) => {
    const number = +e.target.value;
    if (!isNaN(number) && number > 0 && number <= numberOfOptions) {
      setCorrectOption(number);
    }
  };

  const handleOptions = (index, value) => {
    let newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="w-full flex flex-col items-center mb-20">
      <h1 className="text-2xl">Enter the question</h1>
      <input
        type="text"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        className="w-4/5 px-5 py-2 border border-gray-400 rounded mt-4 mx-20 hover:border-blue-500"
      />
      <div className="w-full mt-5 flex flex-col items-center">
        <h1 className="text-2xl">Enter the number of answer options</h1>
        <input
          type="number"
          value={numberOfOptions}
          onChange={(e) => handleNumberOfOptions(e)}
          className="w-1/5 px-3 py-2 border border-gray-400 rounded mt-4 hover:border-blue-500"
        />
      </div>
      <div className="w-full mt-5 flex flex-col items-center">
        <h1 className="text-2xl">Enter the number of the correct option</h1>
        <input
          type="number"
          value={correctOption}
          onChange={(e) => handleCorrectOption(e)}
          className="w-1/5 px-3 py-2 border border-gray-400 rounded mt-4 ml-4 mr-4 hover:border-blue-500"
        />
      </div>
      <div className="w-full mt-5 flex flex-col items-center">
        {options.map((option, index) => (
          <div key={index} className="mb-4 flex flex-col items-center w-full">
            <label className="w-full block mb-1 text-center">
              Enter option {index + 1}
            </label>
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptions(index, e.target.value)}
              className="w-3/5 px-5 py-2 border border-gray-400 rounded mt-4 ml-4 mr-4 hover:border-blue-500"
            ></input>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleCreateMCQ}
        className="border px-4 py-2 my-4 rounded-lg bg-blue-400 hover:bg-blue-600 text-black"
      >
        Add Question
      </button>
    </div>
  );
};

export default CreateMcqQuestion;
