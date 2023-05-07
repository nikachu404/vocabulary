import { Question, Word } from '../types';
import { createRandomTranslations } from './createRandomTranslations';

export const createRandomQuestion = (wordList: Word[], optionsQty: number): Question => {
  const randomWord: Word = wordList[Math.floor(Math.random() * wordList.length)];
  const randomTranslations: string[] = createRandomTranslations(randomWord, wordList, optionsQty);
  const correctAnswerIndex = randomTranslations.indexOf(randomWord.ukr);

  return { word: randomWord.eng, translations: randomTranslations, correctAnswerIndex};
};