import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../axios'


export const fetchStories = createAsyncThunk('/stories/fetchStories',async () => {
    const { data } = await axios.get('/api/stories')

    return data
})
export const initialStoriesState = {
    stories: [],
    status: 'loading'
}

const storiesSlice = createSlice({
    name: 'stories',
    initialState: initialStoriesState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchStories.pending, (state) => {
                state.stories = [];
                state.status = 'loading';
            })
            .addCase(fetchStories.rejected, (state) => {
                state.stories = []
                state.status = 'error';
            })
            .addCase(fetchStories.fulfilled, (state, action) => {
                state.stories = action.payload;
                state.status = 'success';
            })
    },
    reducers: {}
})

export default storiesSlice.reducer