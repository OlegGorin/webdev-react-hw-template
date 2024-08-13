import { fetchRegistration, fetchToken, getUser } from "@/api/userAuth";
import { UserType } from "@/Types/user";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenType } from "@/Types/token";
import { SigninType, SignupType } from "@/Types/sign";

export const getToken = createAsyncThunk(
  "user/getToken",
  async ({ email, password }: SigninType) => {
    const response = await fetchToken({ email, password });
    return response;
  }
);

export const getRegitration = createAsyncThunk(
  "user/getRegistration",
  async ({ email, password, username }: SignupType) => {
    const response = await fetchRegistration({ email, password, username });
    return response;
  }
);

type UserStateType = {
  user: UserType | null;
  tokens: TokenType | null;
};

const initialState: UserStateType = {
  user: null,
  tokens: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.tokens = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getToken.fulfilled, (state, action) => {
        state.tokens = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
