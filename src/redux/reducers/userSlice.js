import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userID: '',
    },
    reducers: {
        setUserID: (state, action) => {
            state.userID = action.payload;
        },
    },
});
