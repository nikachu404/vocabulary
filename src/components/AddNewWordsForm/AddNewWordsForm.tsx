import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../../redux/slices/wordsSlice';
import { Word } from '../../types/Word';

export const AddNewWordsForm: React.FC = () => {
  const [english, setEnglish] = useState('');
  const [ukrainian, setUkrainian] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newWord: Word = { eng: english, ukr: ukrainian };
    dispatch(add(newWord));
    setEnglish('');
    setUkrainian('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        English:
        <input type="text" value={english} onChange={(e) => setEnglish(e.target.value)} />
      </label>
      <label>
        Українська:
        <input type="text" value={ukrainian} onChange={(e) => setUkrainian(e.target.value)} />
      </label>
      <button type="submit">Add word</button>
    </form>
  );
};
