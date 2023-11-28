import { createSlice } from '@reduxjs/toolkit';

export const costSlice = createSlice({
    name: 'cost',
    initialState: {
        costData: [],
    },
    reducers: {
        setCostData: (state, action) => {
            if (state.costData) {
                state.costData.map((item) => {
                    if (item[Object.keys(item)[0]].length === 0) {
                        state.costData = state.costData.filter(
                            (value) => value[Object.keys(item)[0]] !== item[Object.keys(item)[0]],
                        );
                    }

                    if (Object.keys(item)[0] === Object.keys(action.payload)[0]) {
                        state.costData = state.costData.filter((value) => value !== item);
                    }
                });
            }

            if (!action.payload) {
                return;
            }
            state.costData.push(action.payload);
        },
        clearCostData: (state, action) => {
            state.costData = [];
        },
    },
});
