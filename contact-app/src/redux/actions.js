import {createAsyncThunk, createAction} from '@reduxjs/toolkit';
import axios from 'axios';

import { apiUrl } from '../api';
import contactTypes from './types';

const { fetchContactsRequest, createContactsRequest, resetState, fetchContactById } = contactTypes

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
        console.log(response.data, '99999');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const resetAll = createAction(resetState);