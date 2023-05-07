import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Word } from '../../types/Word';
import { RootState } from '../store';

interface WordsState {
  words: Word[]
}

const initialState: WordsState = {
  words: []
};

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Word>) => {
      const newWord: Word = {
        eng: action.payload.eng.toLowerCase(),
        ukr: action.payload.ukr.toLowerCase(),
      };

      const existingWord = state.words.find((word) => word.eng === newWord.eng && word.ukr === newWord.ukr);

      if (!existingWord) {
        state.words.push(newWord);
      }
    },
  }
});

export const selectWords = (state: RootState) => state.words.words;
export const { add } = wordsSlice.actions;
export const wordsReducer = wordsSlice.reducer;
