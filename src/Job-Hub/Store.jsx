import { configureStore } from "@reduxjs/toolkit";
import jobReducer from './JobSlice'
const Store = configureStore({
    reducer: {
        jobs: jobReducer,
    },
});

export default Store;