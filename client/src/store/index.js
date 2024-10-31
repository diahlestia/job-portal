import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './reducer';

const store = configureStore({
    reducer: {
        job: jobReducer,
    },
});

export default store;
