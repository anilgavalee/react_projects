import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  menu: [],
  status: "idle", //loading, error
};

export const fetchMenu = createAsyncThunk("menu/fetchMenu", async () => {
  const res = await fetch("https://react-fast-pizza-api.onrender.com/api/menu");
  const data = await res.json();
  return data.data;
});

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.status = "idle";
        state.menu = action.payload;
      })
      .addCase(fetchMenu.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default menuSlice.reducer;
