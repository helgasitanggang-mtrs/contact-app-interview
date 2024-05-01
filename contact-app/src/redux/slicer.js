import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, postContacts, resetAll, getContactById } from './actions';

const initialState = {
    contacts: [],
        loading: false,
        isError: false,
        errorMessage: null,
        responseStatus: null,
        contact: {},
        contactGetByIdMessage: null
}

const contactSlice = createSlice({
    name: 'contact',
    initialState,
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
            })
            .addCase(postContacts.pending, (state) => {
                state.loading = true;
            })
            .addCase(postContacts.fulfilled, (state, action) => {
                state.responseStatus = 201;
                state.loading = false;
                state.isError = null;
            })
            .addCase(postContacts.rejected, (state, action) => {
                state.loading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
            .addCase(getContactById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getContactById.fulfilled, (state, action) => {
                state.contact = action.payload;
                state.loading = false;
                state.isError = null;
                state.contactGetByIdMessage = 'success';
            })
            .addCase(getContactById.rejected, (state, action) => {
                state.loading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
            .addCase(resetAll, () => initialState)
    }
});

export default contactSlice.reducer;