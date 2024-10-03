import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import appReducer from './reducers/appSlice';
import productReducer from './reducers/productSlice';
import basketReducer from './reducers/basketSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    product: productReducer,
    basket: basketReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch : () => AppDispatch = useDispatch;
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;