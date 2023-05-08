import { Question, Word } from '../types';
import { createRandomTranslations } from './createRandomTranslations';

export const createRandomQuestionList = (wordList: Word[], questionQty: number, optionsQty: number): Question[] => {
  const randomQuestionList: Question[] = [];

  const uniqueWords = new Set();
  while (uniqueWords.size < questionQty) {
    const randomWord: Word = wordList[Math.floor(Math.random() * wordList.length)];

    if (!uniqueWords.has(randomWord.eng)) {
      uniqueWords.add(randomWord.eng);
      const randomTranslations: string[] = createRandomTranslations(randomWord, wordList, optionsQty);
      const correctAnswerIndex = randomTranslations.indexOf(randomWord.ukr);
      randomQuestionList.push({ word: randomWord.eng, translations: randomTranslations, correctAnswerIndex });
    }
  }

  return randomQuestionList;
};