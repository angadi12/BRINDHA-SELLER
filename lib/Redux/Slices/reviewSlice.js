import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllreview } from "@/lib/API/Reviews/Review"; 

// Thunk to fetch all tickets
export const fetchAllTickets = createAsyncThunk(
  "tickets/fetchAllTickets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetAllreview();
      if (response?.success === false) {
        return rejectWithValue(response.message);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearTickets: (state) => {
      state.tickets = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload
      })
      .addCase(fetchAllTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch tickets.";
      });
  },
});


export default reviewsSlice.reducer;
