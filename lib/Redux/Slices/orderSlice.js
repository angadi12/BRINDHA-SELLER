import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllorder ,Getorderbyid} from "@/lib/API/order/Order";

export const fetchAllorders = createAsyncThunk(
  "order/fetchAllorders",
  async (filter, { rejectWithValue }) => {
    try {
      const response = await GetAllorder(filter);
      if (response?.status !== 200) {
        return rejectWithValue(response.message);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchordersbyid = createAsyncThunk(
  "order/fetchordersbyid",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Getorderbyid(id);
      if (response?.status === false) {
        return rejectWithValue(response.message);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    data: [],
    loading: false,
    error: null,

    orderdata: null,
    orderloading: false,
    ordererror: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllorders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllorders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllorders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(fetchordersbyid.pending, (state) => {
        state.orderloading = true;
        state.ordererror = null;
      })
      .addCase(fetchordersbyid.fulfilled, (state, action) => {
        state.orderloading = false;
        state.orderdata = action.payload;
      })
      .addCase(fetchordersbyid.rejected, (state, action) => {
        state.orderloading = false;
        state.ordererror = action.payload || "Something went wrong";
      });
  },
});

export default orderSlice.reducer;
