import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiService } from "../api/apiService";

export const fetchProductsDataAsync = createAsyncThunk(
  "cart/fetchProductsDataAsync",
async ({search, page , limit} ) => {
    try {
      const response = await apiService.get(
        `/api/products?search=${search}&page=${page}&limit=${limit}`
      );
      return response.data.payload;
    } catch (error) {
      console.error("Error fetching cart data:", error);
      throw error;
    }
  }
);

const initialState = {
  allProducts: null,
  pagination: null,
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsDataAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsDataAsync.fulfilled, (state, action) => {
        const products = action.payload.products;
        const pagination = action.payload.pagination;
        
        state.loading = false;
        state.allProducts = products;
        state.pagination = pagination;
      })
      .addCase(fetchProductsDataAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { getAllProducts } = productsSlice.actions;
export default productsSlice.reducer;
