import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, database } from "../../Firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

const userCollectionName = "users";
const companyCollectionName = "companies";
export const createAccountThunk = createAsyncThunk(
  "auth/createAccount",
  async (accountData, { rejectWithValue }) => {
    const { email, password, isCompany, companyData } = accountData;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: accountData.name,
      });

      if (isCompany) {
        await setDoc(doc(database, "companies", user.uid), {
          id: user.uid,
          email,
          name: companyData.name,
          nit: companyData.nit,
          address: companyData.address,
          city: companyData.city,
          description: companyData.description,
          titular: companyData.titular,
          photoUrl: companyData.photo,
        });
      } else {
        await setDoc(doc(database, "users", user.uid), {
          id: user.uid,
          email,
          name: accountData.name,
        });
      }

      return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        isCompany: isCompany,
        accountCreated: true,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const loginWithEmailAndPassworThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userDoc = await getDoc(doc(database, "users", user.uid));
      const companyDoc = await getDoc(doc(database, "companies", user.uid));

      if (companyDoc.exists()) {
        const companyData = companyDoc.data();
        return {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          isCompany: true,
          ...companyData,
        };
      } else if (userDoc.exists()) {
        return {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          isCompany: false,
        };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
  return null;
});

export const googleLoginThunk = createAsyncThunk(
  "auth/googleLogin",
  async ({ isCompany, nit, address, titular }, thunkAPI) => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, googleProvider);
      let newUser = null;

      const collectionRef = isCompany
        ? doc(database, companyCollectionName, user.uid)
        : doc(database, userCollectionName, user.uid);

      const userDoc = await getDoc(collectionRef);

      if (userDoc.exists()) {
        newUser = userDoc.data();
      } else {
        newUser = {
          id: user.uid,
          displayName: user.displayName,
          accessToken: user.accessToken,
          email: user.email,
          isAdmin: false,
          userType: isCompany ? "company" : "user",
          ...(isCompany && { nit, address, titular }),
        };
        await setDoc(collectionRef, newUser);
      }

      return newUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const restoreActiveSessionThunk = createAsyncThunk(
  "auth/restoreActiveSession",
  async (userId) => {
    const userRef = doc(database, userCollectionName, userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      const companyRef = doc(database, companyCollectionName, userId);
      const companyDoc = await getDoc(companyRef);
      if (companyDoc.exists()) {
        return companyDoc.data();
      } else {
        throw new Error("Usuario no encontrado");
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isRegistered: false,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearRegistration: (state) => {
      state.isRegistered = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccountThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccountThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isRegistered = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(createAccountThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginWithEmailAndPassworThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithEmailAndPassworThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginWithEmailAndPassworThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error.message);
      })
      .addCase(googleLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLoginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(googleLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(restoreActiveSessionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restoreActiveSessionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(restoreActiveSessionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectUser = (state) => state.auth.user;

export const useAuth = () => {
  const user = useSelector(selectUser);
  return user;
};

const authReducer = authSlice.reducer;
export default authReducer;

export const { clearError, clearRegistration } = authSlice.actions;
