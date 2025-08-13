import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  GetAllAdmin,
  GetAdminbyid,
  DeleteAdmin,
  CreateAdmin,
  UpdateAdmin
} from "@/lib/API/sellerAdmin/Admin"; 

// Get all admins
export const fetchAdmins = createAsyncThunk(
  "admins/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await GetAllAdmin();
      if (res?.status === false) return rejectWithValue(res?.message || "Failed to fetch admins");
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Get admin by ID
export const fetchAdminById = createAsyncThunk(
  "admins/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await GetAdminbyid(id);
      if (res?.status === false) return rejectWithValue(res?.message || "Failed to fetch admin");
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Create admin
export const createAdmin = createAsyncThunk(
  "admins/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await CreateAdmin(data);
      if (res?.status === false) return rejectWithValue(res?.message || "Failed to create admin");
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Update admin
export const updateAdmin = createAsyncThunk(
  "admins/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await UpdateAdmin(id, data);
      if (res?.status === false) return rejectWithValue(res?.message || "Failed to update admin");
      return { id, updated: res };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Delete admin
export const deleteAdmin = createAsyncThunk(
  "admins/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await DeleteAdmin(id);
      if (res?.status === false) return rejectWithValue(res?.message || "Failed to delete admin");
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admins",
  initialState: {
    list: [],
    selectedAdmin: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedAdmin(state) {
      state.selectedAdmin = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload?.data || [];
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by ID
      .addCase(fetchAdminById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAdmin = action.payload?.data || null;
      })
      .addCase(fetchAdminById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.list.push(action.payload?.data);
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update
      .addCase(updateAdmin.fulfilled, (state, action) => {
        const { id, updated } = action.payload;
        state.list = state.list.map((admin) =>
          admin._id === id ? { ...admin, ...updated.data } : admin
        );
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.list = state.list.filter((admin) => admin._id !== action.payload);
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearSelectedAdmin } = adminSlice.actions;
export default adminSlice.reducer;
