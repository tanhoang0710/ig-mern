import { createSlice } from "@reduxjs/toolkit";

interface IAppState {
  isAuthenticated: boolean;
  authUser: any | null;
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