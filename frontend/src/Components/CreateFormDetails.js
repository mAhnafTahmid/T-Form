import React, { useState } from "react";
import { useQuestionTypeContext } from "../Context/QuestionTypeContext";
import { useQuestionsContext } from "../Context/QuestionsContext";
import toast from "react-hot-toast";

const CreateFormDetails = () => {
  const [description, setDescription] = useState("");
  const [numberOfTries, setNumberOfTries] = useState(1);
  const { questionType } = useQuestionTypeContext();
  const { questions, setQuestions } = useQuestionsContext();

  const handleSetDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleNumberOfSubmits = (e) => {
    const number = +e.target.value;
    if (number < 1) {
      toast.error("Number of tries cannot be less than 1");
      return;
    }
    if (number > 10) {
      toast.error("Number of tries cannot be more than 10");
      return;
    }
    setNumberOfTries(number);
  };

  const handleSetDetails = () => {
    if (description === "" || numberOfTries < 1) {
      toast.error(
        "Your description is empty or number of tries is less then 1"
      );
      return;
    }

    const filteredQuestions = questions.filter(
      (question) => question.questionType !== "details"
    );

    const data = {
      description,
      numberOfTries,
      questionType,
    };

    try {
      setQuestions([...filteredQuestions, data]);
      toast.success("Form details have been saved");
      setDescription("");
      setNumberOfTries(1);
    } catch (error) {
      console.log("Error in saving details", error.message);
      toast.error("Error saving form details");
    }
  };

  return (
    <div className="flex flex-col justify-start items-center pb-20">
      <div className="w-full flex flex-col justify-start items-center flex-wrap my-2">
        <h1 className="text-xl w-4/5 text-center mb-2">
          Enter description regarding the form
        </h1>
        <textarea
          value={description}
          onChange={(e) => handleSetDescription(e)}
          placeholder="Enter form description"
          className="w-[70%] py-2 border border-gray-400 rounded mt-4 hover:border-blue-500 px-2 bg-white text-black"
          required
        />
      </div>
      <div className="w-full mt-5 mb-4 flex flex-col justify-start items-center flex-wrap">
        <h1 className="text-xl w-4/5 text-center mb-2">
          Enter the number of times a student can submit the form
        </h1>
        <input
          type="number"
          value={numberOfTries}
          onChange={(e) => handleNumberOfSubmits(e)}
          className="w-[15%] py-2 border border-gray-400 rounded mt-4 ml-4 mr-4 hover:border-blue-500 bg-white text-black text-center"
        />
      </div>
      <button
        type="button"
        onClick={handleSetDetails}
        className="border px-4 py-2 my-4 rounded-lg bg-blue-400 hover:bg-blue-600 mx-auto text-black"
      >
        Add Question
      </button>
    </div>
  );
};

export default CreateFormDetails;
