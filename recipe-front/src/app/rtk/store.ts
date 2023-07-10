import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { serverApi } from '@/app/rtk/api/setting';

export const rootReducer = combineReducers({
  [serverApi.reducerPath]: serverApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([serverApi.middleware]),
});

setupListeners(store.dispatch);
