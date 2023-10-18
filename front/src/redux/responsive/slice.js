import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openCategoryBar: false,
};

const responsiveSlice = createSlice({
  name: "responsiveSlice",
  initialState,
  reducers: {
    toggleCategoryBar: (state, action) => {
      state.openCategoryBar = action.payload;
    },
  },
  // extraReducers:(bilder)=>{

  // }
});

export const { toggleCategoryBar } = responsiveSlice.actions;

export default responsiveSlice.reducer;
