import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const ADMIN_EMAIL = 'charlesadusarkodie@gmail.com';

interface AuthUserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface AuthState {
  user: AuthUserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isAdminUnlocked: boolean;
  isLoggingIn: boolean;
  error: string | null;
  lastLoginTime: string | null;
  hasWorkspaceScopes: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  isAdminUnlocked: false,
  isLoggingIn: false,
  error: null,
  lastLoginTime: null,
  hasWorkspaceScopes: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUserProfile | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.error = null;
      if (action.payload) {
        state.lastLoginTime = new Date().toISOString();
        state.hasWorkspaceScopes = true;
        state.isAdmin =
          action.payload.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() || state.isAdminUnlocked;
      } else {
        state.hasWorkspaceScopes = false;
        state.isAdmin = state.isAdminUnlocked;
      }
    },
    setAdminUnlocked: (state, action: PayloadAction<boolean>) => {
      state.isAdminUnlocked = action.payload;
      state.isAdmin =
        action.payload || state.user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
    },
    setLoggingIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggingIn = action.payload;
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoggingIn = false;
    },
    signOutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.isAdminUnlocked = false;
      state.hasWorkspaceScopes = false;
      state.error = null;
    },
  },
});

export const { setUser, setAdminUnlocked, setLoggingIn, setAuthError, signOutUser } =
  authSlice.actions;
export default authSlice.reducer;

