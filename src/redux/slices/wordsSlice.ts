import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Word } from '../../types';

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
    addWord: (state, action: PayloadAction<Word>) => {
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

export const { addWord } = wordsSlice.actions;
export const selectWords = (state: RootState) => state.words.words;
export const wordsReducer = wordsSlice.reducer;
