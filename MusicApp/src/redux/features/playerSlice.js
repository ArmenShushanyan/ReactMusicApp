import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: '',
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      const { song, data, i } = action.payload;

      state.activeSong = song;
      state.currentSongs = data?.tracks || data || [];
      state.currentIndex = i;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      state.currentIndex = action.payload;
      state.activeSong = state.currentSongs[action.payload] || null;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      state.currentIndex = action.payload;
      state.activeSong = state.currentSongs[action.payload] || null;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { setActiveSong, nextSong, prevSong, playPause } = playerSlice.actions;

export default playerSlice.reducer;
