import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearCart } from "../cart/cartSlice";
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { dispatch }) => {
    const res = await fetch(
      "https://react-fast-pizza-api.onrender.com/api/order",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      },
    );
    const data = await res.json();
    dispatch(clearCart());
    return data;
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    status: "idle",
    orderId: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "success";
        state.orderId = action.payload.data.id;
      })
      .addCase(createOrder.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default orderSlice.reducer;
