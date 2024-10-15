import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  location: null, 
  loading: false,
  error: null,
};

export const fetchGeolocation = createAsyncThunk(
  "geolocation/fetchGeolocation",
  async () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocalización no soportada en este navegador."));
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
);

const geolocationSlice = createSlice({
  name: "geolocation",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeolocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGeolocation.fulfilled, (state, action) => {
        state.loading = false;
        state.location = action.payload; 
        state.error = null;
      })
      .addCase(fetchGeolocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
      });
  },
});

export const { clearError } = geolocationSlice.actions;
export const selectLocation = (state) => state.geolocation.location;
export const selectLoading = (state) => state.geolocation.loading;
export const selectError = (state) => state.geolocation.error;

export default geolocationSlice.reducer;
