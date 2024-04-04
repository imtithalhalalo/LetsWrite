import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios'

export const register = createAsyncThunk('/auth/register', async (params: any) => {
    const { data } = await axios.post('/api/user/register', params);
    return data
});


export const login = createAsyncThunk('/auth/login', async (params: any) => {
    const { data } = await axios.post('/api/user/login', params);
    return data
});

const initialState = {
    data: null,
    status: 'loading'
}

const authReducer = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.data = null;
                state.status = 'loading';
            })
            .addCase(register.rejected, (state) => {
                state.data = null,
                    state.status = 'loading';
            })
            .addCase(register.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'success';
            })
            .addCase(login.pending, (state) => {
                state.data = null;
                state.status = 'loading';
            })
            .addCase(login.rejected, (state) => {
                state.data = null,
                    state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'success';
            })
    },
    reducers: {}
})

export default authReducer.reducer