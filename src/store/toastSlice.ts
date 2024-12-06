import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Toast {
  severity: "success" | "error" | "info" | "warn";
  summary: string;
  detail: string;
  life: number;
}

interface ToastState {
  toast: Toast | {};
  loader: boolean;
}

const initialState: ToastState = {
  toast: {},
  loader: false,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    toastSuccess: (state, action: PayloadAction<Partial<Toast>>) => {
      state.toast = {
        severity: "success",
        summary: "Success",
        detail: "Success",
        life: 3000,
        ...action.payload,
      };
    },
    toastError: (state, action: PayloadAction<Partial<Toast>>) => {
      state.toast = {
        severity: "error",
        summary: "Error",
        detail: "Failed",
        life: 3000,
        ...action.payload,
      };
    },
    toastInfo: (state, action: PayloadAction<Partial<Toast>>) => {
      state.toast = {
        severity: "info",
        summary: "Info",
        detail: "Info",
        life: 3000,
        ...action.payload,
      };
    },
    toastWarn: (state, action: PayloadAction<Partial<Toast>>) => {
      state.toast = {
        severity: "warn",
        summary: "Warn",
        detail: "Warn",
        life: 3000,
        ...action.payload,
      };
    },
    showLoader: (state) => {
      state.loader = true;
    },
    hideLoader: (state) => {
      state.loader = false;
    },
  },
});

export const {
  toastSuccess,
  toastError,
  toastInfo,
  toastWarn,
  showLoader,
  hideLoader,
} = toastSlice.actions;

export default toastSlice.reducer;
