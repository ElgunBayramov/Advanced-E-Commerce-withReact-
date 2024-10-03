import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BasketSliceType, ProductType, } from "../../assets/types/sliceTypes";



const initialState: BasketSliceType = {
  basket: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket:(state:BasketSliceType,action:PayloadAction<ProductType[]>) => {
     state.basket = [...action.payload]
    },
    addToBasket: (state, action) => {
      const findProduct =
        state.basket &&
        state.basket.find((product) => product.id === action.payload.id);
      if (findProduct) {
        //bu mehsul movcuddur
        const extractedArray = state.basket.filter(
          (product) => product.id != action.payload.id
        );
        findProduct.count += action.payload.count;
        state.basket = [...extractedArray, findProduct];
      } else {
        state.basket = [...state.basket, action.payload];
      }
      localStorage.setItem("basket",JSON.stringify(state.basket))
    },
  },
  extraReducers: (builder) => {
  
  },
});

export const {addToBasket,setBasket} = basketSlice.actions;
export default basketSlice.reducer;
