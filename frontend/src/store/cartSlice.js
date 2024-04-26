import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: [],
  cartItems: 0,
  showNotification: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { payload } = action;
      const existingProduct = state.cartProducts.find(
        (product) => product.slug === payload.slug
      );

      if (!existingProduct) {
        // If product doesn't exist in cart, add it
        state.cartProducts.push(payload);
        state.cartItems = state.cartProducts.length;
        state.showNotification = true;
      }
    },

    removeToCart: (state, action) => {
      const { payload } = action;

      const filteredProduct = state.cartProducts.filter(
        (product) => product.slug !== payload
      );

      state.cartProducts = filteredProduct;
      state.cartItems = state.cartProducts.length;
    },

    hideCartNotification: (state) => {
      state.showNotification = false;
    },
  },
});

export const { addToCart, hideCartNotification, removeToCart } =
  cartSlice.actions;
export default cartSlice.reducer;
