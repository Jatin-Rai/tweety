import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { firestoreApi } from "./slices/firestoreApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [firestoreApi.reducerPath]: firestoreApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(firestoreApi.middleware),
    devTools: true,
})