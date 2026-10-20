import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type NavTab =
  | "home"
  | "junior"
  | "academy"
  | "tati-club"
  | "for-schools"
  | "about"
  | "register"
  | "learner"
  | "parent-dashboard"
  | "workspace";

interface ConfirmationModalConfig {
  isOpen: boolean;
  title: string;
  description: string;
  affectedItems?: string[];
  confirmLabel: string;
  cancelLabel?: string;
  onConfirmAction?: string;
}

interface ToastConfig {
  id: string;
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

interface UIState {
  activeTab: NavTab;
  viewportMode: "responsive" | "mobile-frame";
  mobileDeviceType: "iphone" | "android";
  confirmationModal: ConfirmationModalConfig;
  toasts: ToastConfig[];
  selectedModuleIdForDetail: number | null;
}

const routeTabs: NavTab[] = [
  "home",
  "junior",
  "academy",
  "tati-club",
  "for-schools",
  "about",
  "register",
  "learner",
  "parent-dashboard",
  "workspace",
];
const initialHash =
  typeof window === "undefined" ? "" : window.location.hash.slice(1);
const initialState: UIState = {
  activeTab: routeTabs.includes(initialHash as NavTab)
    ? (initialHash as NavTab)
    : "home",
  viewportMode: "responsive",
  mobileDeviceType: "iphone",
  confirmationModal: {
    isOpen: false,
    title: "",
    description: "",
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
  },
  toasts: [],
  selectedModuleIdForDetail: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<NavTab>) => {
      state.activeTab = action.payload;
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    setViewportMode: (
      state,
      action: PayloadAction<"responsive" | "mobile-frame">,
    ) => {
      state.viewportMode = action.payload;
    },
    toggleViewportMode: (state) => {
      state.viewportMode =
        state.viewportMode === "responsive" ? "mobile-frame" : "responsive";
    },
    setMobileDeviceType: (
      state,
      action: PayloadAction<"iphone" | "android">,
    ) => {
      state.mobileDeviceType = action.payload;
    },
    openConfirmationModal: (
      state,
      action: PayloadAction<Omit<ConfirmationModalConfig, "isOpen">>,
    ) => {
      state.confirmationModal = {
        ...action.payload,
        isOpen: true,
      };
    },
    closeConfirmationModal: (state) => {
      state.confirmationModal.isOpen = false;
    },
    addToast: (state, action: PayloadAction<Omit<ToastConfig, "id">>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
      state.toasts.push({ ...action.payload, id });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    setSelectedModuleId: (state, action: PayloadAction<number | null>) => {
      state.selectedModuleIdForDetail = action.payload;
    },
  },
});

export const {
  setActiveTab,
  setViewportMode,
  toggleViewportMode,
  setMobileDeviceType,
  openConfirmationModal,
  closeConfirmationModal,
  addToast,
  removeToast,
  setSelectedModuleId,
} = uiSlice.actions;

export default uiSlice.reducer;
