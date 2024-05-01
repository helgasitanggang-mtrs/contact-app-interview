import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './slicer';

const store = configureStore({
    reducer: {
        contact: contactReducer,
    },
});

export default store;
