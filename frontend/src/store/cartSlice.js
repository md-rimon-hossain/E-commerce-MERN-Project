import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiService } from "../api/apiService";

export const fetchCartData = createAsyncThunk(
  "cart/fetchCartData",
  async (userId) => {
    try {
      const response = await apiService.get(`/api/cart/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching cart data:", error);
      throw error;
    }
  }
);

export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async ({ userId, productId, quantity }) => {
    try {
      const response = await apiService.post(`/api/cart`, {
        userId,
        productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching cart data:", error);
      throw error;
    }
  }
);

export const removeToCartAsync = createAsyncThunk(
  "cart/removeToCartAsync",
  async ({ userId, productId, quantity }) => {
    try {
      const response = await apiService.post(`/api/cart`, {
        userId,
        productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching cart data:", error);
      throw error;
    }
  }
);

export const deleteCartItemAsync = createAsyncThunk(
  "cart/deleteCartItemAsync",
  async ({ cartId, itemId }) => {
    console.log(cartId,itemId)
    try {
      const response = await apiService.delete(
        `/api/cart/${cartId}/items/${itemId}`
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error fetching cart data:", error);
      throw error;
    }
  }
);

const initialState = {
  cartProducts: null,
  cartItemsCount: 0,
  totalPrice: 0,
  discountPrice: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hideCartNotification: (state) => {
      state.showNotification = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        const cart = action.payload.payload;
        state.loading = false;
        state.cartProducts = cart;
        const quantity = cart.items.reduce(
          (accumulator, product) => accumulator + product.quantity,
          0
        );
        state.cartItemsCount = quantity;
        const totalPrice = cart.items.reduce(
          (accumulator, product) =>
            accumulator + product.product.price * product.quantity,
          0
        );
        state.totalPrice = totalPrice;
        const discountPrice = cart.items.reduce(
          (accumulator, product) =>
            accumulator + product.product.originalPrice * product.quantity,
          0
        );
        state.discountPrice = discountPrice - totalPrice;
        
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
        state.showNotification = true;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        const cart = action.payload.payload;
        state.loading = false;
        state.cartProducts = cart;
        const quantity = cart.items.reduce(
          (accumulator, product) => accumulator + product.quantity,
          0
        );
        state.cartItemsCount = quantity;

        const totalPrice = cart.items.reduce(
          (accumulator, product) =>
            accumulator + product.product.price * product.quantity,
          0
        );
        state.totalPrice = totalPrice;

        const discountPrice = cart.items.reduce(
          (accumulator, product) =>
            accumulator + product.product.originalPrice * product.quantity,
          0
        );
        state.discountPrice = discountPrice - totalPrice;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(removeToCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeToCartAsync.fulfilled, (state, action) => {
        const cart = action.payload.payload;
        state.loading = false;
        state.cartProducts = cart;
        const quantity = cart.items.reduce(
          (accumulator, product) => accumulator + product.quantity,
          0
        );
        state.cartItemsCount = quantity;
        const totalPrice = cart.items.reduce(
          (accumulator, product) =>
            accumulator + product.product.price * product.quantity,
          0
        );
        state.totalPrice = totalPrice;
        const discountPrice = cart.items.reduce(
          (accumulator, product) =>
            accumulator + product.product.originalPrice * product.quantity,
          0
        );
        state.discountPrice = discountPrice - totalPrice;
      })
      .addCase(removeToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        const cart = action.payload.payload;
        state.loading = false;
        state.cartProducts = cart;
        const quantity = cart.items.reduce(
          (accumulator, product) => accumulator + product.quantity,
          0
        );
        state.cartItemsCount = quantity;
        const totalPrice = cart.items.reduce(
          (accumulator, product) =>
            accumulator + product.product.price * product.quantity,
          0
        );
        state.totalPrice = totalPrice;
        const discountPrice = cart.items.reduce(
          (accumulator, product) =>
            accumulator + product.product.originalPrice * product.quantity,
          0
        );
        state.discountPrice = discountPrice - totalPrice;
      })
      .addCase(deleteCartItemAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addToCart, hideCartNotification, removeToCart } =
  cartSlice.actions;
export default cartSlice.reducer;
