import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    image : null
};

const profileImage = createSlice({
    name: 'profileImage',
    initialState,
    reducers : {
        updateImage : (state, action) => {
            state.image = action.payload
        }
    }
});

export const {updateImage} =profileImage.actions
export default profileImage.reducer