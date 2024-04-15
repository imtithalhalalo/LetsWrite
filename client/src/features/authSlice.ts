import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios'

export const register = createAsyncThunk('/auth/register', async (params: any, { dispatch }) => {
    const { data } = await axios.post('/api/user/register', params);

    if ('token' in data) {
        window.localStorage.setItem('token', data.token)
        dispatch(account())
    }
    return data
});


export const login = createAsyncThunk('/auth/login', async (params: any, { dispatch }) => {
    const { data } = await axios.post('/api/user/login', params);

    if ('token' in data) {
        window.localStorage.setItem('token', data.token)
        dispatch(account())
    }
    return data
});


export const account = createAsyncThunk('/auth/account', async () => {
    const { data } = await axios.get('/api/user/account')

    return data
})
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
            .addCase(account.pending, (state) => {
                state.data = null;
                state.status = 'loading';
            })
            .addCase(account.rejected, (state) => {
                state.data = null,
                    state.status = 'loading';
            })
            .addCase(account.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'success';
            })
    },
    reducers: {
        logout: (state) => {
            state.data = null
        }
    }
})

//we export it differently because it is a synchronous action
export const { logout } = authReducer.actions
export default authReducer.reducer