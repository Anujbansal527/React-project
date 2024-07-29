import { createSlice } from '@reduxjs/toolkit';

const customerSlice = createSlice({
    name: 'data',
    initialState: [],
    reducers: {

        //REDUCER AN FUNTION TO ADD USER
        addUser: (state, action) => {
            state.push(action.payload);
        },


        //for updating
        editUser: (state, action) => {
            const index = state.findIndex(data => data.pan === action.payload.pan);
            console.log(action.payload)
            if (index !== -1) {
                state[index] = action.payload;
                console.log(state[index])
            }
        },

        //for deleting
        deleteUser: (state, action) => {
            console.log(state.payload)
            return state.filter(data => data.pan !== action.payload);
        },
    },
});

export const { addUser, editUser, deleteUser } = customerSlice.actions;

export default customerSlice.reducer;
