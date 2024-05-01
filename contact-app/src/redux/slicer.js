import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts } from './actions';

const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        contacts: [],
        loading: false,
        isError: false,
        errorMessage: null,

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.contacts = action.payload;
                state.loading = false;
                state.isError = null;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.loading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            });
    }
});

export default contactSlice.reducer;