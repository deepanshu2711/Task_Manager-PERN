import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser : null,
    Alltasks :[],
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },

        deleteCurrentUser: (state) => {
            state.currentUser = null
        },

        currentUserTasks: (state, action) => {
            state.Alltasks = action.payload
        }

    }

});

export const {setCurrentUser, deleteCurrentUser ,currentUserTasks} = userSlice.actions;
export default userSlice.reducer;