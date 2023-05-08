import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addWord, selectWords } from '../../redux/slices';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Word } from '../../types';

import './AddNewWordsForm.scss';

const startingWords = [
  { eng: 'apple', ukr: 'яблуко' },
  { eng: 'banana', ukr: 'банан' },
  { eng: 'car', ukr: 'автомобіль' },
  { eng: 'house', ukr: 'будинок' },
  { eng: 'cat', ukr: 'кіт' },
  { eng: 'dog', ukr: 'собака' },
  { eng: 'book', ukr: 'книга' },
  { eng: 'pen', ukr: 'ручка' },
  { eng: 'sun', ukr: 'сонце' },
  { eng: 'moon', ukr: 'місяць' },
];

export const AddNewWordsForm: React.FC = () => {
  const [english, setEnglish] = useState('');
  const [ukrainian, setUkrainian] = useState('');
  const [error, setError] = useState('');

  const dispatch = useAppDispatch();
  const words = useAppSelector(selectWords);

  const validateWord = (word: Word, words: Word[]) => {
    const exists = words.some((w) =>
      w.eng.toLowerCase() === word.eng.toLowerCase() ||
      w.ukr.toLowerCase() === word.ukr.toLowerCase()
    );

    if (exists) {
      setError('This word already exists.');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newWord: Word = { eng: english.toLowerCase(), ukr: ukrainian };
    validateWord(newWord, words);
    dispatch(addWord(newWord));
    setEnglish('');
    setUkrainian('');
  };

  const handleAddStartingWords = () => {
    startingWords.forEach((word) => {
      dispatch(addWord(word));
    });
  };

  // Determine if either input field is empty
  const isDisabled = !english || !ukrainian;

  return (
    <div className="add-form">
      <div className="add-form__content">
        <Link to="/">
          <img src="https://img.icons8.com/metro/26/null/multiply.png" className="add-form__close-button" />
        </Link>

        <form onSubmit={handleSubmit} className="add-form__form">
          <label className="add-form__label">
            English:
            <input
              type="text"
              value={english}
              onChange={(e) => setEnglish(e.target.value)}
              className="add-form__input"
            />
          </label>

          <label className="add-form__label">
            Українська:
            <input
              type="text"
              value={ukrainian}
              onChange={(e) => setUkrainian(e.target.value)}
              className="add-form__input"
            />
          </label>

          {error && <p>{error}</p>}

          <button
            type="submit"
            className="add-form__button"
            disabled={isDisabled}
          >
            Add word
          </button>
          <h2 className="add-form__text">or...</h2>
          <Link to="/" onClick={handleAddStartingWords} className="add-form__button add-form__button--starter">
            Add starting words
          </Link>
        </form>
      </div>
    </div>
  );
};
