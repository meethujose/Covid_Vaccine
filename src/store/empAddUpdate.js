import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value : false
};

const empAddUpdateSlice = createSlice({
    name: 'empAddUpdate',
    initialState,
    reducers : {
        added(state) {
            state.value = !state.value
        }
    }
});

export const empAddUpdateAction =empAddUpdateSlice.actions
export default empAddUpdateSlice.reducer