import {createAsyncThunk, createAction} from '@reduxjs/toolkit';
import axios from 'axios';

import { apiUrl } from '../api';
import contactTypes from './types';

const { fetchContactsRequest, createContactsRequest, resetState, fetchContactById, updateContactRequest, deleteContactRequest } = contactTypes

export const fetchContacts = createAsyncThunk(fetchContactsRequest, async (data = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(apiUrl.contactUrl);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const postContacts = createAsyncThunk(createContactsRequest, async (data = null, { rejectWithValue }) => {
    try {
        const mappedData = {
            firstName: data.firstName,
            lastName: data.lastName,
            age: Number(data.age),
            photo: data.imagePreview,
        }
        const response = await axios.post(apiUrl.contactUrl, mappedData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getContactById = createAsyncThunk(fetchContactById, async (data = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${apiUrl.contactUrl}/${data.id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateContactById = createAsyncThunk(updateContactRequest, async (data = null, { rejectWithValue }) => {
    try {
        const mappedDataId = data.id;
        const mappedData = {
            firstName: data.firstName,
            lastName: data.lastName,
            age: Number(data.age),
            photo: data.imagePreview,
        }
        const response = await axios.put(`${apiUrl.contactUrl}/${mappedDataId}`, mappedData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteContactById = createAsyncThunk(deleteContactRequest, async (dataId, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${apiUrl.contactUrl}/${dataId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


export const resetAll = createAction(resetState);