import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  Createvendor,
  Vendorlogin,
  Sendverification,
  Getverficationdata,
  Getverificationstatus,
} from "@/lib/API/Auth/Auth";
import Cookies from "js-cookie";

// Thunks
export const createVendorThunk = createAsyncThunk(
  "vendor/create",
  async (data, thunkAPI) => {
    try {
      const response = await Createvendor(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const vendorLoginThunk = createAsyncThunk(
  "vendor/login",
  async (data, thunkAPI) => {
    try {
      const response = await Vendorlogin(data);

      if (response?.token) {
        Cookies.set("token", response?.token);
        Cookies.set("isCompanyVerified", response?.data?.isCompanyVerified);
      }

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const sendVerificationThunk = createAsyncThunk(
  "vendor/sendVerification",
  async (data, thunkAPI) => {
    try {
      const response = await Sendverification(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getVerificationDataThunk = createAsyncThunk(
  "vendor/getVerificationData",
  async (_, thunkAPI) => {
    try {
      const response = await Getverficationdata();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getVerificationStatusThunk = createAsyncThunk(
  "vendor/getVerificationStatus",
  async (_, thunkAPI) => {
    try {
      const response = await Getverificationstatus();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Slice
const vendorSlice = createSlice({
  name: "vendor",
  initialState: {
    loading: false,
    error: null,
    user: null,
    status: null,
    verificationData: null,
  },
  reducers: {
    logoutVendor: (state) => {
      state.user = null;
      state.status = null;
      state.verificationData = null;
      Cookies.remove("token");
      Cookies.remove("isCompanyVerified");
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Vendor
      .addCase(createVendorThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createVendorThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(createVendorThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login Vendor
      .addCase(vendorLoginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(vendorLoginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.data;
      })
      .addCase(vendorLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Send Verification
      .addCase(sendVerificationThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendVerificationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(sendVerificationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Verification Data
      .addCase(getVerificationDataThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVerificationDataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.verificationData = action.payload;
      })
      .addCase(getVerificationDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Verification Status
      .addCase(getVerificationStatusThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVerificationStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(getVerificationStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutVendor } = vendorSlice.actions;
export default vendorSlice.reducer;
