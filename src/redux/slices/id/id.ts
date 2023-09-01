import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  initialState: {
    userId: "",
  },
  name: "User", // used for dev tools
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
    },
  },
});

export const { setUser } = userSlice.actions; 
export default userSlice.reducer;