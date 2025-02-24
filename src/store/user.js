import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getToken } from "../utils/auth";
import { login, getUserInfo } from "@/api/login";

const initialState = {
  user: {
    name: "",
    role: "",
    avatar: "",
    token: getToken(),
  },
  loading: false,
  error: null,
};

export const loginAsync = createAsyncThunk(
  "user/login", // action类型前缀
  async (userData, { rejectWithValue }) => {
    try {
      const response = await login(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserInfoAsync = createAsyncThunk(
  "user/getUserInfo",
  async (token, { rejectWithValue }) => {
    try {
      const response = await getUserInfo(token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserInfoAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInfoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserInfoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
