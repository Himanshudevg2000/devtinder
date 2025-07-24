import {createSlice} from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "Feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
        removeFeed: (state, action) => {
            let newArray = state.filter(res => res._id != action.payload);
            return newArray;
        }
    }
});

export const {addFeed, removeFeed} = feedSlice.actions;

export default feedSlice.reducer;