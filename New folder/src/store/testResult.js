import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value : false
};

const testAddUpdateSlice = createSlice({
    name: 'testAddUpdate',
    initialState,
    reducers : {
        added(state) {
            state.value = !state.value
        }
    }
});

export const  testAddUpdateAction = testAddUpdateSlice.actions
export default  testAddUpdateSlice.reducer