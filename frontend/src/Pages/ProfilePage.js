import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQuestionsContext } from "../Context/QuestionsContext";

const ProfilePage = () => {
  const [code, setCode] = useState("");
  const [codes, setCodes] = useState(["bcvebvebvn"]);
  const { user } = useAuthContext();
  const { questions, setQuestions } = useQuestionsContext();
  const navigate = useNavigate();

  const handleCreateForm = () => {
    navigate("/form");
  };

  const handleEnterCode = async (e) => {
    e.preventDefault();
    if (code.length !== 10) {
      toast.error("Length of code should be 10 digits");
      console.log("Length of code should be 10 digits");
      return;
    }
    try {
      const res = await fetch("/form/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      if (res.ok) {
        setQuestions(data);
      } else {
        console.log("couldn't fetch form");
        toast.error("couldn't fetch form");
      }
    } catch (error) {
      console.log("error fetching form", error.message);
      toast.error("error fetching form");
    }
  };

  return (
    <div className="min-h-screen pt-[100px] flex flex-col-reverse sm:flex-row">
      {/* Left side */}
      <div className="flex flex-col flex-grow w-full sm:w-[70%]">
        <div className="flex flex-col items-start ml-auto w-full sm:w-[80%]">
          <h1 className="text-[80px] text-purple-700">
            Welcome <span className="text-[80px] text-white">{user?.name}</span>
          </h1>
          <h2 className="text-3xl mt-16 text-indigo-600">
            Create your own form now!
          </h2>
          <button
            onClick={handleCreateForm}
            className="w-[120px] my-8 py-2 border border-white text-white"
          >
            Create Form
          </button>
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-col flex-grow w-full sm:w-[30%]">
        <form
          onSubmit={handleEnterCode}
          className="px-3 py-3 flex flex-col items-center border border-white sm:mr-8 rounded-3xl"
        >
          <h1 className="text-3xl text-indigo-700 mb-5">Access a form</h1>
          <input
            onChange={(e) => {
              setCode(e.target.value);
            }}
            value={code}
            placeholder="10-digit code"
            type="text"
            className="w-[80%] px-2 py-2 rounded-xl bg-white text-black border-indigo-700 border-[2px] shadow-md shadow-indigo-700 my-3"
          />
          <button className="w-[120px] my-4 py-2 border border-white text-white">
            Enter Code
          </button>
        </form>
        <div className="px-3 py-3 my-9 flex flex-col items-center border border-white sm:mr-8 rounded-3xl">
          <h1 className="text-3xl text-indigo-700 mb-5">
            Codes to all of your forms
          </h1>
          {user?.codes?.length > 0 ? (
            codes.map((c) => (
              <input
                readOnly
                value={c}
                type="text"
                className="w-[80%] px-2 py-2 rounded-xl bg-white text-black border-indigo-700 border-[2px] shadow-md shadow-indigo-700 my-3"
              />
            ))
          ) : (
            <h1>You have not attempted any form</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
