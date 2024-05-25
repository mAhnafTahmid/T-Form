import React, { useState } from 'react';

const Form = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [numberOfOptions, setNumberOfOptions] = useState(0);
  const [correctOption, setCorrectOption] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [tries, setTries] = useState(0);
  const [numberOfTries, setNumberOfTries] = useState(1);
  const [description, setDescription] = useState('');
  const [questionType, setQuestionType] = useState('MCQ');
  const [textAnswer, setTextAnswer] = useState('')

  const handleCreateMCQ = () => {
    const saveQuestion = {
      newQuestion,
      options,
      correctOption,
      questionType
    };
    if (numberOfOptions > 0 && correctOption > 0 && correctOption <= numberOfOptions) {
      setQuestions([...questions, saveQuestion]);
      setNewQuestion('');
      setNumberOfOptions(0);
      setOptions([]);
      setCorrectOption('');
      setSubmitted(false);
    } else {
      alert('Number of answer options for MCQ must be greater than 0 and the correct answer must be within the range of the number of options');
    }
  };

  const handleNumberOfOptions = (e) => {
    const number = +e.target.value;
    if (!isNaN(number) && number > -1 && number < 8) {
      setNumberOfOptions(number);
      setOptions(Array(number).fill(''));
    }
  };

  const handleNumberOfSubmits = (e) => {
    const number = +e.target.value;
    setNumberOfTries(number);
  };

  const handleCorrectOption = (e) => {
    const number = +e.target.value;
    if (!isNaN(number) && number > -1 && number <= numberOfOptions) {
      setCorrectOption(number);
    }
  };

  const handleOptions = (index, value) => {
    let newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRadioClick = (questionIndex, optIndex) => {
    let newQuestions = [...questions];
    newQuestions[questionIndex].selectedOption = optIndex;
    setSubmitted(false);
    setQuestions(newQuestions);
  };

  const handleFormSubmit = () => {
    if (tries < numberOfTries) {
      setSubmitted(true);
    }
  };

  const handleSetDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleTextQuestion = (e) => {
    let newQuestions = [...questions]
  }

  const renderQuestionForm = () => {
    switch (questionType) {
      case 'MCQ':
        return (
          <div className='w-full'>
            <h1 className='text-2xl'>Enter the question</h1>
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="w-4/5 px-5 py-2 border border-gray-400 rounded mt-4 ml-4 mr-4 hover:border-blue-500"
            />
            <div className='w-full mt-5'>
              <h1 className='text-2xl'>Enter the number of answer options</h1>
              <input
                type="number"
                value={numberOfOptions}
                onChange={(e) => handleNumberOfOptions(e)}
                className="w-1/5 px-3 py-2 border border-gray-400 rounded mt-4 ml-4 mr-4 hover:border-blue-500"
              />
            </div>
            <div className='w-full mt-5'>
              <h1 className='text-2xl'>Enter the number of the correct option</h1>
              <input
                type="number"
                value={correctOption}
                onChange={(e) => handleCorrectOption(e)}
                className="w-1/5 px-3 py-2 border border-gray-400 rounded mt-4 ml-4 mr-4 hover:border-blue-500"
              />
            </div>
            <div className='w-full mt-5'>
              {options.map((option, index) => (
                <div key={index} className="mb-4">
                  <label className='w-full block mb-1'>Enter option {index + 1}</label>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptions(index, e.target.value)}
                    className="w-3/5 px-3 py-2 border border-gray-400 rounded mt-4 ml-4 mr-4 hover:border-blue-500"
                  ></input>
                </div>
              ))}
            </div>
            <button
              type='button'
              onClick={handleCreateMCQ}
              className="border px-4 py-2 my-4 rounded-lg bg-blue-400 hover:bg-blue-600"
            >Add Question</button>
          </div>
        );
      case 'Photo':
        return (
          <div className='w-full'>
            <h1 className='text-2xl'>Enter the question with Photo</h1>
            {/* Add your form fields for question with photo here */}
          </div>
        );
      case 'Text':
        return (
          <div className='w-full'>
            <h1 className='text-2xl'>Enter the text question</h1>
            <input
                type="text"
                value={newQuestion}
                className="w-3/5 px-3 py-2 border border-gray-400 rounded mt-4 mx-4 hover:border-blue-500"
                onChange={(e) => setNewQuestion(e.target.value)}
            ></input>
            <label className='text-2xl'>Enter your answer here</label>
            <textarea
                typeof='string'
                value={textAnswer}
                className="w-3/5 px-3 py-2 border border-gray-400 rounded mt-4 mx-4 hover:border-blue-500"
                onChange={(e) => setTextAnswer(e.target.value)}
            ></textarea>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='flex flex-col justify-top text-center bg-gray-600 min-h-screen'>
      <h1 className='text-purple-400 text-6xl pt-5 pb-5 bg-black w-full position: fixed'>T-Form</h1>
      <div className="flex justify-center w-full flex-grow pt-24">
        <div className='w-2/3 flex-grow'>
          <h1 className='text-4xl text-red-500 pt-7 pb-5 pl-7 text-left'>{`Instruction: ${description}`}</h1>
          <h1 className='text-4xl text-orange-300 py-5 pl-7 text-left'>Questions</h1>
          <div className='mt-1/15'>
            {questions.map((q, index) => (
              <div key={index} className='mt-5 mb-5 pl-7 text-left'>
                <label className='text-3xl text-yellow-300'>Q{index + 1}. {q.newQuestion}</label>
                {q.options.map((opt, optIndex) => (
                  <div key={optIndex} className="my-2 w-4/5">
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
                      className={`py-2 px-4 ${q.selectedOption === q.correctOption - 1 && q.selectedOption === optIndex && submitted ? 'bg-green-400' : 'bg-gray-600'}`}
                    >{opt}</label>
                  </div>
                ))}
                <div className='text-center my-7'>
                  <button
                    type='button'
                    className='px-4 py-2 bg-orange-500 border rounded-lg border-black my-4'
                    onClick={handleFormSubmit}
                  >Submit Answers</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='w-1/3 bg-white flex-grow'>
          <h1 className='text-4xl pt-5 pb-5 text-black'>Create a Question</h1>
          <div className='w-full'>
            <h1 className='text-2xl w-full px-3 text-center'>Enter description or instruction regarding the form</h1>
            <input
              type="text"
              value={description}
              onChange={(e) => handleSetDescription(e)}
              className="w-4/5 px-5 py-2 border border-gray-400 rounded mt-4 ml-4 mr-4 hover:border-blue-500"
            />
          </div>
          <div className='w-full mt-5'>
            <h1 className='text-2xl'>Enter the number of times a student can submit the form</h1>
            <input
              type="number"
              value={numberOfTries}
              onChange={(e) => handleNumberOfSubmits(e)}
              className="w-1/5 px-3 py-2 border border-gray-400 rounded mt-4 ml-4 mr-4 hover:border-blue-500"
            />
          </div>
          <div className='w-full mt-7 mb-5'>
            <div className='flex justify-around'>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 ml-4' onClick={() => setQuestionType('MCQ')}>
                Add MCQ Question
              </button>
              <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2' onClick={() => setQuestionType('Photo')}>
                Add Question with Photo
              </button>
              <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2 mr-4' onClick={() => setQuestionType('Text')}>
                Add Text Question
              </button>
            </div>
          </div>
          {renderQuestionForm()}
        </div>
      </div>
    </div>
  );
};

export default Form;
