import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const getSpotifyToken = createAsyncThunk(
    'auth/getSpotifyToken',
    async () => {
        const res = await fetch("http://localhost:8000/spotify-token");
        const data = await res.json();
        return data.access_token;
    }
) 

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: null,
        tokenExpiry: null,
        loading: false,
        error: null
    },
    reducers: {
        clearToken: (state) => {
            state.accessToken = null
            state.tokenExpiry = null
        }
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(getSpotifyToken.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getSpotifyToken.fulfilled, (state, action) => {
                state.accessToken = action.payload
                state.tokenExpiry = Date.now() + 3600000;
                state.loading = false
                state.error = null
            })
            .addCase(getSpotifyToken.rejected, (state, action) => {
                state.error = action.error.message
                state.loading = false
            })
    }
})

export const { clearToken } = authSlice.actions
export default authSlice.reducer
