import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetDashboardcount, Getordergraph, Getearninggraph } from "@/lib/API/Dashboard/Dashboard";

// Async Thunks
export const fetchDashboardCount = createAsyncThunk("dashboard/fetchCount", async (_, thunkAPI) => {
  try {
    const response = await GetDashboardcount();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchOrderGraph = createAsyncThunk("dashboard/fetchOrderGraph", async (filter, thunkAPI) => {
  try {
    const response = await Getordergraph(filter);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchEarningGraph = createAsyncThunk("dashboard/fetchEarningGraph", async (filter, thunkAPI) => {
  try {
    const response = await Getearninggraph(filter);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Initial State
const initialState = {
  count: null,
  orderGraph: null,
  earningGraph: null,
  loadingCount: false,
  loadingOrder: false,
  loadingEarning: false,
  errorCount: null,
  errorOrder: null,
  errorEarning: null,
};

// Slice
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Dashboard Count
      .addCase(fetchDashboardCount.pending, (state) => {
        state.loadingCount = true;
        state.errorCount = null;
      })
      .addCase(fetchDashboardCount.fulfilled, (state, action) => {
        state.loadingCount = false;
        state.count = action.payload;
      })
      .addCase(fetchDashboardCount.rejected, (state, action) => {
        state.loadingCount = false;
        state.errorCount = action.payload;
      })

      // Order Graph
      .addCase(fetchOrderGraph.pending, (state) => {
        state.loadingOrder = true;
        state.errorOrder = null;
      })
      .addCase(fetchOrderGraph.fulfilled, (state, action) => {
        state.loadingOrder = false;
        state.orderGraph = action.payload;
      })
      .addCase(fetchOrderGraph.rejected, (state, action) => {
        state.loadingOrder = false;
        state.errorOrder = action.payload;
      })

      // Earning Graph
      .addCase(fetchEarningGraph.pending, (state) => {
        state.loadingEarning = true;
        state.errorEarning = null;
      })
      .addCase(fetchEarningGraph.fulfilled, (state, action) => {
        state.loadingEarning = false;
        state.earningGraph = action.payload;
      })
      .addCase(fetchEarningGraph.rejected, (state, action) => {
        state.loadingEarning = false;
        state.errorEarning = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
