import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllCategories, getAllProducts, getProductsByCategoryName } from "../actions/productAction";
import { ProductSliceType, ProductType } from "../../assets/types/sliceTypes";



const initialState: ProductSliceType = {
  products: [],
  categories:[]
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    filterProducts: (state:ProductSliceType,action:PayloadAction<string>) => {
      const filteredList:ProductType[] = [];
      state.products.map((product:ProductType) => {
        if(product.title.toLowerCase().includes(action.payload.toLowerCase())){
          filteredList.push(product)
        }
      })
      state.products = [...filteredList]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.fulfilled, (state, action: PayloadAction<ProductType[]>) => {
        state.products = action.payload;
      }),
      builder.addCase(getAllCategories.fulfilled, (state,action:PayloadAction<string[]>) =>{
        state.categories = action.payload;
      }),
      builder.addCase(getProductsByCategoryName.fulfilled, (state,action:PayloadAction<ProductType[]>) =>{
        state.products =action.payload;
      })
  },
});

export const {filterProducts} = productSlice.actions;
export default productSlice.reducer;
