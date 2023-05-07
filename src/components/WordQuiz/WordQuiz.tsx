import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectWords } from '../../redux/slices/wordsSlice';
import { Word, Question } from '../../types';
import { createRandomQuestionList } from '../../helpers/createRandomQuestionList';

const TOTAL_QUESTIONS = 10;
const TOTAL_OPTIONS = 3;

export const WordQuiz: React.FC = () => {
  // state variables
  const [started, setStarted] = useState<boolean>(false);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);

  // redux state
  const wordList: Word[] = useSelector(selectWords);

  // lifecycle methods
  useEffect(() => {
    if (wordList.length > 0) {
      const randomQuestionList = createRandomQuestionList(wordList, TOTAL_QUESTIONS, TOTAL_OPTIONS);
      setQuestions(randomQuestionList);
    }
  }, [wordList]);

  // event handlers
  const handleStart = (): void => {
    setStarted(true);
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
    setStarted(false);
    setQuestionIndex(0);
    setScore(0);
  };

  // rendering logic
  if (!started) {
    return <button onClick={handleStart}>Start Quiz</button>;
  }

  if (wordList.length === 0) {
    return (
      <div>
        <h2>No words yet ;(</h2>
      </div>
    );
  }

  if (questionIndex === TOTAL_QUESTIONS) {
    return (
      <div>
        <h2>Quiz Completed!</h2>
        <p>Your score is {score} out of {TOTAL_QUESTIONS}</p>
        <button onClick={handleRestart}>Start Again</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Question {questionIndex + 1}</h2>
      <p>What is the translation of &ldquo;{questions[questionIndex].word}&rdquo;?</p>
      {questions[questionIndex].translations.map((option, index) => (
        <button key={index} onClick={() => handleAnswer(option)}>
          {option}
        </button>
      ))}
    </div>
  );
};
