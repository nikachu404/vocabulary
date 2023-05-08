import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  HashRouter,
  Routes,
  Route
} from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { App } from './App.tsx';
import { AddNewWordsForm, WordQuiz, Home  } from './components';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store.ts';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="add" element={<AddNewWordsForm />} />
            <Route path="quiz" element={<WordQuiz />} />
          </Route>
        </Routes>
      </PersistGate>
    </Provider>
  </HashRouter>
);
