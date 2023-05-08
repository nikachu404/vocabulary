import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { selectWords, selectQuizHistory } from '../../redux/slices';

import './Home.scss';

export const Home: React.FC = () => {
  const words = useAppSelector(selectWords);
  const quizHistoryResults = useAppSelector(selectQuizHistory);

  return (
    <div className="home">
      {words.length > 0 ? (
        <>
          <h1>Vocabulary</h1>
          <table className='home__words'>
            <thead>
              <tr>
                <th>English</th>
                <th>Українська</th>
              </tr>
            </thead>
            <tbody>
              {words.map((word) => (
                <tr key={word.eng}>
                  <td>{word.eng}</td>
                  <td>{word.ukr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <h2>No words yet ;(</h2>
      )}

      <div className="home__sidebar">
        <Link to="/add" className="home__add-word">
          <p className="home__add-word-text">Expand your lexicon!</p>
          <img
            src="https://img.icons8.com/ios-glyphs/30/null/plus-math.png"
            className="home__add-word-icon"
            alt="add"
          />
        </Link>

        <div className="home__activity">
          <h2>Recent activity</h2>

          <div className="home__activity-list">
            {quizHistoryResults.map((result, index) => {
              const [date, time] = result.date.split(', ');

              return (
                <div key={index} className="home__activity-result">
                  <div className="home__activity-date">
                    <p className="home__activity-day">{date}</p>
                    <p className="home__activity-time">{time}</p>
                  </div>
                  <p className="home__activity-score">Score: {result.score}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

