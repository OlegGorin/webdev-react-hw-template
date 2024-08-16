import { fetchRegistration, fetchToken, fetchUser } from "@/api/userAuth";
import { UserType } from "@/Types/user";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenType } from "@/Types/token";
import { SigninType, SignupType } from "@/Types/sign";

export const getToken = createAsyncThunk(
  "user/getToken",
  async ({ email, password }: SigninType) => {
    const tokens = await fetchToken({ email, password });
    return tokens;
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ email, password }: SigninType) => {
    const user = await fetchUser({ email, password });
    return user;
  }
);

export const getRegistration = createAsyncThunk(
  "user/getRegistration",
  async ({ email, password, username }: SignupType) => {
    const user = await fetchRegistration({ email, password, username });
    return user;
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
      .addCase(getUser.rejected, (state, action) => {
        console.error("Error:", action.error.message);
        // alert("Error:", action.error.message);
      })
      .addCase(getRegistration.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getRegistration.rejected, (state, action) => {
        console.error("Error:", action.error.message);
      })
      .addCase(getToken.fulfilled, (state, action) => {
        state.tokens = action.payload;
      })
      .addCase(getToken.rejected, (state, action) => {
        console.error("Error:", action.error.message);
      });
  },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
