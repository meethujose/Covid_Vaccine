import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value : false
};

const vaccineAddUpdateSlice = createSlice({
    name: 'vaccineAddUpdate',
    initialState,
    reducers : {
        added(state) {
            state.value = !state.value
        }
    }
});

export const vaccineAddUpdateAction =vaccineAddUpdateSlice.actions
export default vaccineAddUpdateSlice.reducer