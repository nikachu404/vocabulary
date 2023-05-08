import { Word } from '../types';
import { shuffleArray } from './shuffleArray';

export const createRandomTranslations = (correctWord: Word, wordList: Word[], translationsQty: number): string[] => {
  const randomTranslations: string[] = [];

  while (randomTranslations.length < translationsQty) {
    const randomWord: Word = wordList[Math.floor(Math.random() * wordList.length)];
    const randomTranslation: string = randomWord.ukr;

    if (
      !randomTranslations.includes(randomTranslation) &&
      randomTranslation !== correctWord.ukr
    ) {
      randomTranslations.push(randomTranslation);
    }
  }

  randomTranslations.push(correctWord.ukr);
  const shuffledRandomTranslations = shuffleArray(randomTranslations);
  return shuffledRandomTranslations;
};
