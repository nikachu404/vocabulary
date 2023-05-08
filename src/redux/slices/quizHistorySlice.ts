import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface QuizResult {
  date: string;
  score: string;
}

interface QuizHistoryState {
  quizHistory: QuizResult[];
}

const initialState: QuizHistoryState = {
  quizHistory: [],
};

const quizHistorySlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    addResult(state, action: PayloadAction<QuizResult>) {
      state.quizHistory.unshift(action.payload);
      
      // no more than 5 results are stored
      if (state.quizHistory.length > 5) {
        state.quizHistory.splice(-1, 1);
      }
    },
  },
});

export const { addResult } = quizHistorySlice.actions;
export const selectQuizHistory = (state: RootState) => state.quizHistory.quizHistory;
export const quizHistoryReducer = quizHistorySlice.reducer;
