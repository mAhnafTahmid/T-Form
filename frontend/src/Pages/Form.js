import React from 'react'
import { useState } from 'react'

const Form = () => {
    const [questions, addQuestions] = useState([])
    const [newQuestion, addNewQuestion] = useState('')
    const [options, addOptions] = useState([])
    const [numberOfOptions, addNumberOfOptions] = useState(0)
    const [correctOption, addCorrectOptions] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const [tries, setTries] = useState(0)
    const [numberOfTries, setNumberOfTries] = useState(1)
    const [description, setDescription] = useState('')

    const handleCreateMCQ = () => {
        const saveQuestion = {
            newQuestion,
            options,
            correctOption
        }
        if (numberOfOptions > 0 && correctOption > 0 && correctOption <= numberOfOptions) {
            let newQuestions = [...questions]
            newQuestions = [...newQuestions, saveQuestion]
            addQuestions(newQuestions)
            addNewQuestion('')
            addNumberOfOptions(0)
            addOptions([])
            addCorrectOptions('')
            setSubmitted(false)
        }
        else {
            alert('Number of answer options for MCQ must be greater than 0 and the correct answer must be within the range of the number of options')
        }
    }

    const handleNumberOfOptions = (e) => {
        const number = +e.target.value
        if (!isNaN(number) && number > -1 && number < 8) {
            addNumberOfOptions(number)
            addOptions(Array(number).fill(''))
        }
    }

    const handleNumberOfSubmits = (e) => {
        const number = +e.target.value
        setNumberOfTries(number)
    }

    const handleCorrectOption = (e) => {
        const number = +e.target.value
        if (!isNaN(number) && number > -1 && number <= numberOfOptions) {
            addCorrectOptions(number)
        }
    }

    const handleOptions = (index, value) => {
        let newOptions = [...options]
        newOptions[index] = value
        addOptions(newOptions)
    }

    const handleRadioClick = (questionIndex, optIndex) => {
        let newQuestions = [...questions]
        newQuestions[questionIndex].selectedOption = optIndex
        setSubmitted(false)
        addQuestions(newQuestions)
    }

    const handleFormSubmit = () => {
        if (tries < numberOfTries) {
            setSubmitted(true)
        }
    }

    const handleSetDescription = (e) => {
        setDescription(e.target.value)
    }

  return (
    <div className='flex flex-col justify-top text-center bg-gray-600 min-h-screen'>
        <h1 className='text-purple-400 text-6xl pt-5 pb-5 bg-black w-full position: fixed'>T-Form</h1>
        <div className="flex justify-center w-full flex-grow pt-24">
            <div className='w-2/3 flex-grow'>
                <h1 className='text-4xl text-red-500 pt-5 pb-5'>{`Instruction: ${description}`}</h1>
                <h1 className='text-4xl text-orange-300 pt-5 pb-5'>Questions</h1>
                <div className='mt-1/15'>
                    {questions.map((q, index) => (
                        <div key={index} className='mt-5 mb-5'>
                            <label className='text-3xl text-yellow-300'>Q{index+1}. {q.newQuestion}</label>
                            {q.options.map((opt, optIndex) => (
                                <div key={optIndex} className="my-2">
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
                                        className={`py-2 px-4 ${q.selectedOption === q.correctOption-1 && q.selectedOption === optIndex && submitted ? 'bg-green-400' : 'bg-gray-600'}`}
                                    >{opt}</label>
                                </div>
                            ))}
                            <button
                                type='button'
                                className='px-4 py-2 bg-orange-500 border rounded-lg border-black my-4'
                                onClick={handleFormSubmit}
                            >Submit Answers</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className='w-1/3 bg-white flex-grow'>
                <h1 className='text-4xl pt-5 pb-5 text-black'>Create an MCQ question</h1>
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
                    <h1 className='text-2xl'>Enter the question</h1>
                    <input
                        type="text"
                        value={newQuestion}
                        onChange={(e) => addNewQuestion(e.target.value)}
                        className="w-4/5 px-5 py-2 border border-gray-400 rounded mt-4 ml-4 mr-4 hover:border-blue-500"
                    />
                </div>
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
                    <h1 className='text-2xl'>Enter the number of times a student can submit the form</h1>
                    <input
                        type="number"
                        value={numberOfTries}
                        onChange={(e) => handleNumberOfSubmits(e)}
                        className="w-1/5 px-3 py-2 border border-gray-400 rounded mt-4 ml-4 mr-4 hover:border-blue-500"
                    />
                </div>
                <div className='w-full mt-5'>
                {options.map((option, index) => (
                    <div key={index} className="mb-4">
                        <label className='w-full block mb-1'>Enter option {index+1}</label>
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
        </div>
    </div>
  )
}

export default Form