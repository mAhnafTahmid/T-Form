import { createContext, useContext, useState } from "react";

export const QuestionsContext = createContext();

export const useQuestionsContext = () => {
  return useContext(QuestionsContext);
};

export const QuestionsContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  return (
    <QuestionsContext.Provider value={{ questions, setQuestions }}>
      {children}
    </QuestionsContext.Provider>
  );
};
