import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  Addproducts,
  Sendproductforverification,
  getproductbyid,
  getproductcount,
  Getallproduct,
} from "@/lib/API/Product/product";

// Thunks
export const addProduct = createAsyncThunk("product/add", async (data, thunkAPI) => {
  try {
    const res = await Addproducts(data);
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const sendForVerification = createAsyncThunk("product/verify", async (data, thunkAPI) => {
  try {
    const res = await Sendproductforverification(data);
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const fetchProductById = createAsyncThunk("product/fetchById", async (id, thunkAPI) => {
  try {
    const res = await getproductbyid(id);
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const fetchProductCount = createAsyncThunk("product/fetchCount", async (_, thunkAPI) => {
  try {
    const res = await getproductcount();
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAll",
  async ({ Status, CategoryId, SubcategoryId, Measturments, page, limit }, thunkAPI) => {
    try {
      const res = await Getallproduct(Status, CategoryId, SubcategoryId, Measturments, page, limit);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// Initial State
const initialState = {
  allProducts: [],
  productCount: null,
  singleProduct: null,

  // Loading States
  loadingAdd: false,
  loadingVerify: false,
  loadingById: false,
  loadingCount: false,
  loadingAll: false,

  // Error States
  errorAdd: null,
  errorVerify: null,
  errorById: null,
  errorCount: null,
  errorAll: null,

  // Flags
  addSuccess: false,
  verificationSuccess: false,
};

// Slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.addSuccess = false;
      state.verificationSuccess = false;
      state.errorAdd = null;
      state.errorVerify = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Product
      .addCase(addProduct.pending, (state) => {
        state.loadingAdd = true;
        state.addSuccess = false;
        state.errorAdd = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loadingAdd = false;
        state.addSuccess = true;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loadingAdd = false;
        state.errorAdd = action.payload;
      })

      // Send for Verification
      .addCase(sendForVerification.pending, (state) => {
        state.loadingVerify = true;
        state.verificationSuccess = false;
        state.errorVerify = null;
      })
      .addCase(sendForVerification.fulfilled, (state) => {
        state.loadingVerify = false;
        state.verificationSuccess = true;
      })
      .addCase(sendForVerification.rejected, (state, action) => {
        state.loadingVerify = false;
        state.errorVerify = action.payload;
      })

      // Fetch Product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loadingById = true;
        state.errorById = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loadingById = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loadingById = false;
        state.errorById = action.payload;
      })

      // Fetch Product Count
      .addCase(fetchProductCount.pending, (state) => {
        state.loadingCount = true;
        state.errorCount = null;
      })
      .addCase(fetchProductCount.fulfilled, (state, action) => {
        state.loadingCount = false;
        state.productCount = action.payload;
      })
      .addCase(fetchProductCount.rejected, (state, action) => {
        state.loadingCount = false;
        state.errorCount = action.payload;
      })

      // Fetch All Products
      .addCase(fetchAllProducts.pending, (state) => {
        state.loadingAll = true;
        state.errorAll = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loadingAll = false;
        state.allProducts = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loadingAll = false;
        state.errorAll = action.payload;
      });
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
