import { createSlice } from '@reduxjs/toolkit';

const initialState = [];


const userDataUpdateSlice = createSlice({
    name: 'userData',
    initialState,
    reducers : {
        add(state,action) {       
            // state.push(action.payload)
            console.log("action",action.payload);
            return([...state,...action.payload])
          },
    }
});

export const userDataUpdateAction = userDataUpdateSlice.actions
export default  userDataUpdateSlice.reducer