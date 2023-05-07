import { Question, Word } from '../types';
import { createRandomQuestion } from './createRandomQuestion';

export const createRandomQuestionList = (wordList: Word[], questionQty: number, optioonsQty: number): Question[] => {
  const randomQuestionList: Question[] = [];

  for (let i = 0; i < questionQty; i++) {
    const { word, translations, correctAnswerIndex } = createRandomQuestion(wordList, optioonsQty);
    randomQuestionList.push({ word, translations, correctAnswerIndex });
  }

  return randomQuestionList;
};
