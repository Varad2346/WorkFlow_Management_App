import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reload: true,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    reload: (state, action) => {
      state.reload = action.payload.reload;
    },
  },
});

export const { reload } = boardSlice.actions;
export default boardSlice.reducer;
