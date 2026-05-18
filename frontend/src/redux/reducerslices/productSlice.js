'use client'
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  cartItems: [],
  wishLists:[],
  color:'grey'
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {

  setCartItems(state, action) {
      const item=action.payload;
      const exist=state.cartsItems.find(i=>i._id==item._id)
      if(exist){
      }
      state.cartItems.push(item)  
    },

setWishItems: (state, action) => {
  const item = action.payload;

  const exists = state.wishLists?.find(
    i => i._id === item._id
  );

  if (exists) {
    state.wishLists = state.wishLists.filter(
      i => i._id !== item._id
    );
  } else {
    state.wishLists?.push(item);
  }
}
  }
})

export const { setCartItems, setWishItems } = productSlice.actions

export default productSlice.reducer