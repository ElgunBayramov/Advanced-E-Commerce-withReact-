import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllCategories, getAllProducts, getProductById, getProductsByCategoryName } from "../actions/productAction";
import { ProductSliceType, ProductType } from "../../assets/types/sliceTypes";



const initialState: ProductSliceType = {
  products: [],
  categories:[],
  product: null,
  loading:false
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setLoading: (state:ProductSliceType,action:PayloadAction<boolean>) => {
      state.loading = action.payload;
  },
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
      }),
      builder.addCase(getProductById.fulfilled, (state, action) => {
        console.log("Product fetched:", action.payload); // Log the product fetched
        state.product = action.payload;
    })

  },
});

export const {filterProducts,setLoading} = productSlice.actions;
export default productSlice.reducer;
