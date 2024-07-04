import React from "react";
import CreateTextQuestion from "./CreateTextQuestion";
import { useQuestionTypeContext } from "../Context/QuestionTypeContext";
import CreateMcqQuestion from "./CreateMcqQuestion";
import CreateImageQuestion from "./CreateImageQuestion";
import CreateFormDetails from "./CreateFormDetails";

const RenderQuestion = () => {
  const { questionType } = useQuestionTypeContext();
  switch (questionType) {
    case "text":
      return (
        <div>
          <CreateTextQuestion />
        </div>
      );
    case "mcq":
      return (
        <div>
          <CreateMcqQuestion />
        </div>
      );
    case "image":
      return (
        <div>
          <CreateImageQuestion />
        </div>
      );
    case "details":
      return (
        <div>
          <CreateFormDetails />
        </div>
      );
    default:
      return null;
  }
};

export default RenderQuestion;
