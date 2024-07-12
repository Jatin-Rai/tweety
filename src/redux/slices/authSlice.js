import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    loading: false,
    error: null
};

export const signup = createAsyncThunk(
    "auth/signup",
    async ({ username, email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                username,
                email,
                createdAt: new Date().toISOString()
            });

            return { uid: user.uid, username, email };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const signin = createAsyncThunk(
    "auth/signin",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                return { uid: user.uid, username: userData.username, email: userData.email };
            } else {
                throw new Error("User not found in Firestore");
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const signout = createAsyncThunk(
    "auth/signout",
    async () => {
        await signOut(auth);
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        clearUser: (state) => {
            state.user = null;
            localStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signup.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(signup.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(signup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(signin.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(signin.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(signin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(signout.fulfilled, (state) => {
            state.user = null;
            localStorage.clear();
        });
    }
});

export const { setUser, clearUser } = authSlice.actions;

export const authStateListener = (dispatch) => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                dispatch(setUser({ uid: user.uid, username: userData.username, email: userData.email }));
            } else {
                dispatch(clearUser());
            }
        } else {
            dispatch(clearUser());
        }
    });
};

export default authSlice.reducer;
