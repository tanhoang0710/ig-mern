import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/user.interface";

interface IAppState {
  isAuthenticated: boolean;
  authUser: IUser | null;
}

const initialState: IAppState = {
  isAuthenticated: false,
  authUser: null,
};

const authSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
  },
});

export const { setIsAuthenticated, setAuthUser } = authSlice.actions;
export default authSlice.reducer;