import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
   
  },
});

export const { getAllProducts } = productsSlice.actions;
export default productsSlice.reducer;
