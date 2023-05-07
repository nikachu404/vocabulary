import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectWords } from '../../redux/slices/wordsSlice';
import { Word } from '../../types/Word';

export const Dictionary: React.FC = () => {
  const words = useAppSelector(selectWords);

  return (
    <table>
      <thead>
        <tr>
          <th>English</th>
          <th>Українська</th>
        </tr>
      </thead>
      <tbody>
        {words.map((word: Word, index: number) => (
          <tr key={index}>
            <td>{word.eng}</td>
            <td>{word.ukr}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
