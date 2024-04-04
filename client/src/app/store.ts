import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer
    },
});


/**
 * Now both of these types are to ensure type safety when dispatching actions and accessing the state from the store.
 * While it's possible to import the route state and the app dispatch types into each component, but it's
 * better to create type versions of the use dispatch and use selector hooks for usage in the application.
 */

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;