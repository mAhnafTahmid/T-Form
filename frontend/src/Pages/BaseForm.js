import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import RenderQuestion from "../Components/RenderQuestion";
import { useQuestionTypeContext } from "../Context/QuestionTypeContext";
import { useQuestionsContext } from "../Context/QuestionsContext";
import ShowQuestions from "../Components/ShowQuestions";

const BaseForm = () => {
  const { questions } = useQuestionsContext();
  const { setQuestionType } = useQuestionTypeContext();

  const handleCreateForm = () => {};

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <div className="w-full flex flex-row px-4 py-5">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden bg-transparent border-none px-6"
            >
              <RxHamburgerMenu className="text-white text-3xl" />
            </label>
          </div>

          <ShowQuestions />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-full p-4 text-xl">
            {/* Sidebar content here */}
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden w-[80px] bg-inherit border-transparent text-3xl text-white mb-2"
            >
              <RxCross2 />
            </label>

            <div className="divider divider-primary lg:hidden"></div>

            <li className="m-1">
              <button
                onClick={(e) => {
                  setQuestionType("text");
                }}
              >
                Add Text Question
              </button>
            </li>
            <li className="m-1">
              <button
                onClick={(e) => {
                  setQuestionType("mcq");
                }}
              >
                Add MCQ Question
              </button>
            </li>
            <li className="m-1">
              <button
                onClick={(e) => {
                  setQuestionType("image");
                }}
              >
                Add Image Question
              </button>
            </li>
            <div className="divider divider-primary"></div>
            <RenderQuestion />
            {questions.length > 0 && (
              <button
                type="button"
                onClick={handleCreateForm}
                className="border px-4 py-2 my-4 rounded-lg bg-purple-900 hover:bg-indigo-900 text-orange-600 border-indigo-500 hover:text-orange-400"
              >
                Create Form
              </button>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default BaseForm;
