import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/hooks';
import { selectWords, addResult } from '../../redux/slices';
import { Word, Question } from '../../types';
import { createRandomQuestionList } from '../../helpers/createRandomQuestionList';

import './WordQuiz.scss';

const TOTAL_QUESTIONS = 10;
const TOTAL_OPTIONS = 3;

export const WordQuiz: React.FC = () => {
  // state variables
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);

  // redux state
  const wordList: Word[] = useSelector(selectWords);
  const dispatch = useAppDispatch();

  const generateQuestions = () => {
    if (wordList.length >= 10) {
      const randomQuestionList = createRandomQuestionList(wordList, TOTAL_QUESTIONS, TOTAL_OPTIONS);
      setQuestions(randomQuestionList);
      setQuestionIndex(0); // reset question index on new question list
      setScore(0); // reset score on new question list
    } else {
      setQuestions([]); // set questions to empty array if wordList has less than 10 words
      setQuestionIndex(0); // reset question index
      setScore(0); // reset score
    }
  };

  useEffect(() => {
    if (wordList.length >= 10) {
      generateQuestions();
    }
  }, [wordList]);

  // event handlers
  const handleStart = (): void => {
    setStarted(true);
    generateQuestions();
  };

  const handleAnswer = (answer: string): void => {
    const currentQuestion = questions[questionIndex];
    const isAnswerCorrect = answer === currentQuestion.translations[currentQuestion.correctAnswerIndex];
    if (isAnswerCorrect) {
      setScore(score + 1);
    }
    setQuestionIndex(questionIndex + 1);
  };

  const handleRestart = (): void => {
    setStarted(true);
    generateQuestions();
  };

  // rendering logic
  if (!started) {
    return (
      <div className="quiz__container">
        <img src='https://media.giphy.com/media/1oBwBVLGoLteCP2kyD/giphy.gif' className="quiz__gif" />
        <h2>Test your vocabulary</h2>
        <button onClick={handleStart} className="quiz__button">
          Start Quiz!
        </button>
      </div>
    );
  }

  if (wordList.length < 10) {
    return (
      <div>
        <h2>Need at least 10 words to start quiz ;(</h2>
      </div>
    );
  }

  if (questionIndex === TOTAL_QUESTIONS) {
    const percentageResult = Math.round((score / TOTAL_QUESTIONS) * 100); // calculate percentage

    const date = new Date();
    const formattedDate = date.toLocaleString();
    dispatch(addResult({ date: formattedDate, score: `${percentageResult}%` })); // dispatch quiz result

    return (
      <div className="quiz__container">
        <h2>Quiz Completed!</h2>
        <p>Your result: {percentageResult}%</p>
        <button onClick={handleRestart} className="quiz__button">Start Again</button>
      </div>
    );
  }

  return (
    <div className="word-quiz">
      <h2>Question {questionIndex + 1}</h2>
      <p>What is the translation of &ldquo;{questions[questionIndex].word}&rdquo;?</p>
      <div className="quiz__question-container">
        {questions[questionIndex].translations.map((option, index) => (
          <div
            key={`option-${index}`}
            onClick={() => handleAnswer(option)}
            className="quiz__question"
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};
