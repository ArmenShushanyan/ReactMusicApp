import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './features/playerSlice'
import authReducer from './features/authSlice'
import { spotifyCoreApi } from './services/spotifyCoreApi'

export const store = configureStore({
  reducer: {
    player: playerReducer,
    auth: authReducer,
    [spotifyCoreApi.reducerPath]: spotifyCoreApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(spotifyCoreApi.middleware),
});
