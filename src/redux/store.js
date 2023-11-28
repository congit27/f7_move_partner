import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './reducers/userSlice';
import { costSlice } from './reducers/costSlice';

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        cost: costSlice.reducer,
    },
});

export default store;
