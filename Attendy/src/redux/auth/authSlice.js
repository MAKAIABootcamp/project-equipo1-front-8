import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
    const { email, password, name, isCompany, companyData } = accountData;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });

      if (isCompany) {
        await setDoc(doc(database, "companies", user.uid), {
          email,
          titular: name,
          companyName: companyData.companyName,
          nit: companyData.nit,
          address: companyData.address,
        });
      } else {
        await setDoc(doc(database, "users", user.uid), {
          email,
          name,
        });
      }

      return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        isCompany,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const loginWithEmailAndPassworThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const collectionRef = user.email.includes("@empresa.com")
      ? doc(database, companyCollectionName, user.uid)
      : doc(database, userCollectionName, user.uid);

    const userDoc = await getDoc(collectionRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error("No se encontraron datos del usuario");
    }
  }
);

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
  return null;
});

export const googleLoginThunk = createAsyncThunk(
  "auth/googleLogin",
  async ({ isCompany, nit, address, titular }) => {
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
  }
);

export const loginWithVerificationCodeThunk = createAsyncThunk(
  "auth/loginWithVerificationCode",
  async (code, { rejectWithValue }) => {
    try {
      const confirmationResult = window.confirmationResult;
      if (!confirmationResult) {
        throw new Error("No hay resultado de confirmación disponible");
      }
      const { user } = await confirmationResult.confirm(code);
      let newUser = null;
      const userRef = doc(database, userCollectionName, user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        newUser = userDoc.data();
      } else {
        newUser = {
          id: user.uid,
          displayName: user.displayName,
          accessToken: user.accessToken,
          email: user.email,
          phoneNumber: user.phoneNumber,
          isAdmin: false,
          city: null,
        };
        await setDoc(userRef, newUser);
      }

      return newUser;
    } catch (error) {
      return rejectWithValue(error.message || "Error en la verificación");
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
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
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
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = action.payload;
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
      .addCase(loginWithVerificationCodeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithVerificationCodeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginWithVerificationCodeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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

const authReducer = authSlice.reducer;
export default authReducer;

export const { clearError } = authSlice.actions;
