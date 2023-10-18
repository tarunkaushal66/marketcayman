import { createSlice } from "@reduxjs/toolkit";
import {
  getAddDetails,
  getAllAdds,
  getAllCategories,
  getProductFormFields,
  getSubCategories,
} from "./thunk";

const initialState = {
  categories: {},
  subCategories: {},
  productFormFields: {},
  addDetails: {},
  allAdds: {},
};

const adsSlice = createSlice({
  name: "adsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state, action) => {})
      .addCase(getAllCategories.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {});
    builder
      .addCase(getSubCategories.pending, (state, action) => {})
      .addCase(getSubCategories.fulfilled, (state, action) => {
        state.subCategories = action.payload;
      })
      .addCase(getSubCategories.rejected, (state, action) => {});
    builder
      .addCase(getProductFormFields.pending, (state, action) => {})
      .addCase(getProductFormFields.fulfilled, (state, action) => {
        state.productFormFields = action.payload;
      })
      .addCase(getProductFormFields.rejected, (state, action) => {});
    builder
      .addCase(getAllAdds.pending, (state, action) => {})
      .addCase(getAllAdds.fulfilled, (state, action) => {
        state.allAdds = action.payload;
      })
      .addCase(getAllAdds.rejected, (state, action) => {});
    builder
      .addCase(getAddDetails.pending, (state, action) => {})
      .addCase(getAddDetails.fulfilled, (state, action) => {
        state.addDetails = action.payload;
      })
      .addCase(getAddDetails.rejected, (state, action) => {});
  },
});

export default adsSlice.reducer;
