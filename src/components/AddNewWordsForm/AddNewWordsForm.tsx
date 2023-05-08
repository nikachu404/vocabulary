import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addWord } from '../../redux/slices';
import { Word } from '../../types';

import './AddNewWordsForm.scss';

export const AddNewWordsForm: React.FC = () => {
  const [english, setEnglish] = useState('');
  const [ukrainian, setUkrainian] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newWord: Word = { eng: english, ukr: ukrainian };
    dispatch(addWord(newWord));
    setEnglish('');
    setUkrainian('');
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
            <input type="text" value={english} onChange={(e) => setEnglish(e.target.value)} className="add-form__input" />
          </label>
          <label className="add-form__label">
            Українська:
            <input type="text" value={ukrainian} onChange={(e) => setUkrainian(e.target.value)} className="add-form__input" />
          </label>
          <button type="submit" className="add-form__button" disabled={isDisabled}>
            Add word
          </button>
        </form>
      </div>
    </div>
  );
};
