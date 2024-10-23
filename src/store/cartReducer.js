import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "singleCart",
  initialState,
  reducers: {
    add: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },

    remove: (state, action) => {
        state.products = state.products.filter(item =>  item.id !== action.payload)
    },


    restCart:(state) => {
      state.products = []
    },

    incrementQuantity: (state, action) => {
        const item = state.products.find((item) => item.id === action.payload);
        if (item) {
          item.quantity++;
        }
      },
      decrementQuantity: (state, action) => {
        const item = state.products.find((item) => item.id === action.payload);
        if (item && item.quantity > 1) {
          item.quantity--;
        } 
     },
    }
});


export const { add, remove, restCart, incrementQuantity, decrementQuantity } = cartSlice.actions

export default cartSlice.reducer