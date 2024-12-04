import { createSlice } from "@reduxjs/toolkit";
import bookData from "./BookDATA";

let localBooks = JSON.parse(localStorage.getItem("bookData"));

const bookSlice = createSlice({
    name: "book",
    initialState: {
        items: localBooks ? [...localBooks] : [...bookData]
    },
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload)
            localStorage.setItem("bookData", JSON.stringify(state.items));
        }
    }
})

export const { addItem } = bookSlice.actions;
export default bookSlice.reducer;