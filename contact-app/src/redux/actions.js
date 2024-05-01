import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

import { apiUrl } from '../api';
import contactTypes from './types';

const { fetchContactsRequest } = contactTypes

export const fetchContacts = createAsyncThunk(fetchContactsRequest, async (data = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(apiUrl.contactUrl);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});