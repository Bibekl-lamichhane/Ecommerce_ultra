"use client";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItems: [],
  wishLists: [],
  color: "grey",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCartItems(state, action) {
      const item = action.payload;
      const exist = state.cartItems?.find((i) => i._id == item._id);
      if (exist) {
        return;
      }
      state.cartItems.push(item);
    },
    removeCartItems(state, action) {
      const item = action.payload;
      const exist = state.cartItems?.find((i) => i._id == item);
      console.log(exist);
      if (exist) {
        const newCartItem = state.cartItems?.filter((i) => i._id != item);
        state.cartItems = newCartItem;
      }
    },

    setWishItems: (state, action) => {
      const item = action.payload;

      const exists = state.wishLists?.find((i) => i._id === item._id);

      if (exists) {
        state.wishLists = state.wishLists.filter((i) => i._id !== item._id);
      } else {
        state.wishLists?.push(item);
      }
    },
    removeWishItems: (state, action) => {
      const item = action.payload;
      const exists = state.wishLists?.find((i) => i._id === item._id);

      if (exists) {
        state.wishLists = state.wishLists.filter((i) => i._id !== item._id);
      }
    },
  },
});

export const { setCartItems, removeCartItems, setWishItems, removeWishItems } = productSlice.actions
export default productSlice.reducer
