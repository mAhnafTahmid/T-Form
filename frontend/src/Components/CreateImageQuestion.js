import React, { useState } from "react";
import { useQuestionsContext } from "../Context/QuestionsContext";
import { useQuestionTypeContext } from "../Context/QuestionTypeContext";
import { storage } from "../Firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";

const CreateImageQuestion = () => {
  const [newQuestion, setNewQuestion] = useState("");
  const [picture, setPicture] = useState(null);
  const { questions, setQuestions } = useQuestionsContext();
  const { questionType } = useQuestionTypeContext();

  const handlePhotoQuestion = async () => {
    if (newQuestion !== "" && picture !== null) {
      const storageRef = ref(storage, `images/${picture.name}`); // Create a reference to the file

      try {
        // Upload the file
        const snapshot = await uploadBytes(storageRef, picture);

        // Get the download URL
        const imageUrl = await getDownloadURL(snapshot.ref);

        const saveQuestion = {
          newQuestion,
          imageUrl,
          questionType,
          textAnswer: "",
        };

        setQuestions([...questions, saveQuestion]);
        setNewQuestion("");
        setPicture(null);
        toast.success("Your question was added successfully");
        console.log(questions);
      } catch (error) {
        toast.error(error.message);
        console.error("Error uploading image: ", error);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center mb-20 justify-center">
      <label className="text-2xl">Upload Picture</label>
      <div className="w-[50%] flex flex-col items-center justify-center">
        <input
          type="file"
          onChange={(e) => setPicture(e.target.files[0])}
          className="text-xl py-5 w-[49%] lg:w-full text-white"
        />
      </div>
      <label className="text-2xl mb-2">Enter the question</label>
      <input
        type="text"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        className="w-4/5 px-3 py-2 border border-gray-400 rounded my-4 mx-[88px] hover:border-blue-500"
      />
      <button
        type="button"
        onClick={handlePhotoQuestion}
        className="border px-4 py-2 my-4 rounded-lg bg-blue-400 hover:bg-blue-600 mx-auto text-black"
      >
        Add Question
      </button>
    </div>
  );
};

export default CreateImageQuestion;
