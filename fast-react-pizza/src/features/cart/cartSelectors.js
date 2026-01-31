import { createSelector } from "reselect";

export const getCart = (state) => state.cart.cart;
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
// export const getTotalCartPrice = (state) =>
//   state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getTotalCartPrice = createSelector([getCart], (cart) =>
  cart.reduce((sum, item) => sum + item.totalPrice, 0),
);
