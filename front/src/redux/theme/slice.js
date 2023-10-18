import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
};

const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
  // extraReducers:(bilder)=>{

  // }
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
