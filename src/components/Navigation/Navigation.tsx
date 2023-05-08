import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { useAppSelector } from '../../redux/hooks';
import { selectQuizHistory } from '../../redux/slices';

import './Navigation.scss';

export const Navigation: React.FC = () => {
  const quizHistory = useAppSelector(selectQuizHistory);

  const calculateAverageScore = () => {
    const totalScore = quizHistory.reduce((acc, quizResult) => {
      const score = parseInt(quizResult.score.replace('%', ''));
      return acc + score;
    }, 0);

    return quizHistory.length > 0 ? Math.round(totalScore / quizHistory.length) : 0;
  };

  const averageScore = calculateAverageScore();

  return (
    <header className="navigation">
      <nav className="navigation__container">
        <ul className="navigation__nav-list">
          <li className="navigation__nav-item">
            <img src="https://img.icons8.com/dusk/64/null/dictionary.png" className="navigation__icon" />
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn('navigation__nav-link',
                  { 'navigation__nav-link--selected': isActive })
              }
            >
              Home
            </NavLink>
          </li>

          <li className="navigation__nav-item">
            <img src="https://img.icons8.com/dusk/64/null/questions.png" className="navigation__icon" />
            <NavLink
              to="/quiz"
              className={({ isActive }) =>
                cn('navigation__nav-link',
                  { 'navigation__nav-link--selected': isActive })
              }
            >
              Quiz
            </NavLink>
          </li>
        </ul>

        <div className="navigation__stats">
          <div className="navigation__stat-item">
            <div className="navigation__stat-label">Your average performance:</div>
            <div className="navigation__stat-value">{averageScore}%</div>
          </div>
        </div>
      </nav>
    </header>
  );
};

