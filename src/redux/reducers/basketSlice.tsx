import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BasketSliceType, ProductType, UserType, } from "../../assets/types/sliceTypes";



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
      if(state.basket.length == 0){
        //sebet boşdursa
        state.basket = [action.payload]
      }
      else{
        //sebetde mehsul varsa
        const findProduct = state.basket.find((product) => product.id === action.payload.id);
        if (findProduct) {
          // bu mehsul sebete evvelceden elave olunub
          const extractedArray = state.basket.filter((product) => product.id !== action.payload.id);
          findProduct.count += action.payload.count;
          state.basket = [...extractedArray, findProduct];
        } else {
          //bu mehsul sebete elave olunmayib
          state.basket = [...state.basket, action.payload];
        }
        
      }
      const currentUserString = localStorage.getItem("currentUser");
      if (currentUserString) {
        const currentUser: UserType = JSON.parse(currentUserString);
        localStorage.setItem(`basket_${currentUser.id}`, JSON.stringify(state.basket));
      }
    },
  },
  extraReducers: (builder) => {
  
  },
});

export const {addToBasket,setBasket} = basketSlice.actions;
export default basketSlice.reducer;
