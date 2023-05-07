import React from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <nav className="header__container">
        <NavLink to="/"> Dictionary</NavLink>
        <NavLink to="/add">Add words</NavLink>
        <NavLink to="/quiz">Quiz</NavLink>
      </nav>
    </header>
  );
};