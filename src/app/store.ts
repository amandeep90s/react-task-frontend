import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authReducer from "../reducers/auth";
import messageReducer from "../reducers/message";
import themeReducer from "../reducers/theme"

const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    theme: themeReducer
  }
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;