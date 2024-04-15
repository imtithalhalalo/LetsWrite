import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios'

export const register = createAsyncThunk('/auth/register', async (params: any, { dispatch, rejectWithValue }) => {
    try {
        const { data } = await axios.post('/api/user/register', params);

        if ('token' in data) {
            window.localStorage.setItem('token', data.token)
            dispatch(account())
        }
        return data
    } catch (error: any) {
        if (error?.response?.status === 400) {
            if (error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            }
            return rejectWithValue(error.response.data)
        }

        return rejectWithValue('Something went wrong')
    }
});


export const login = createAsyncThunk('/auth/login', async (params: any, { dispatch, rejectWithValue }) => {
    try {
        const { data } = await axios.post('/api/user/login', params);

        if ('token' in data) {
            window.localStorage.setItem('token', data.token)
            dispatch(account())
        }
        return data
    } catch (error: any) {
        if (error?.response?.status === 400 || error?.response?.status === 404) {
            if (error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            }
            return rejectWithValue(error.response.data)
        }

        return rejectWithValue('Something went wrong')
    }
    
});


export const account = createAsyncThunk('/auth/account', async () => {
    const { data } = await axios.get('/api/user/account')

    return data
})
const initialState = {
    data: null,
    status: 'loading',
    error: ''
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
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload as string
                state.status = 'error';
            })
            .addCase(register.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'success';
            })
            .addCase(login.pending, (state) => {
                state.data = null;
                state.status = 'loading';
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload as string
                state.status = 'error';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'success';
            })
            .addCase(account.pending, (state) => {
                state.data = null;
                state.status = 'loading';
            })
            .addCase(account.rejected, (state, action) => {
                state.error = action.payload as string
                state.status = 'error';
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