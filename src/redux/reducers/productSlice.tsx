import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllProducts } from "../actions/productAction";
import { ProductSliceType, ProductType } from "../../assets/types/sliceTypes";



const initialState: ProductSliceType = {
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.fulfilled, (state, action: PayloadAction<ProductType[]>) => {
        state.products = action.payload;
      })
  },
});

export const { } = productSlice.actions;
export default productSlice.reducer;
