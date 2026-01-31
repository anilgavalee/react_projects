import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import menuReducer from "./features/menu/menuSlice";
import cartReducer from "./features/cart/cartSlice";
import orderReducer from "./features/order/orderSlice";
const store = configureStore({
  reducer: {
    //features will come here
    user: userReducer,
    menu: menuReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export default store;
