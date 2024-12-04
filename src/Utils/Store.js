import { configureStore } from "@reduxjs/toolkit";
import bookReducer from './BooksSlice'

const appStore = configureStore({
    reducer: {
        book: bookReducer,
    }
})

export default appStore;