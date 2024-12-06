import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { provideUserInfo, setLoginInfo, clearLoginInfo } from "../utils/local";

interface User {
  name: string;
  email: string;
  token: string;
}

interface AuthState {
  user: User | null;
  department: string | null;
}

const initialState: AuthState = {
  user: provideUserInfo(),
  department: localStorage.getItem("USERDEPARTMENT")
    ? JSON.parse(localStorage.getItem("USERDEPARTMENT") as string)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User>) => {
      const userObj = action.payload;
      state.user = userObj;
      setLoginInfo(userObj);
    },
    setDepartment: (state, action: PayloadAction<string | null>) => {
      state.department = action.payload;
      if (action.payload) {
        localStorage.setItem("USERDEPARTMENT", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("USERDEPARTMENT");
      }
    },
    removeCredentials: (state) => {
      state.user = null; // Safely setting null
      state.department = null; // Safely setting null
      clearLoginInfo();
    },
  },
});

export const { setCredentials, setDepartment, removeCredentials } =
  authSlice.actions;

export default authSlice.reducer;
