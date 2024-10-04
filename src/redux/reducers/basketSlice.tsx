import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BasketItemType, BasketSliceType, ProductType, UserType } from "../../assets/types/sliceTypes";


const initialState: BasketSliceType = {
  baskets: {}, // Initialize as an empty object
};
export const basketSlice = createSlice({
  name: "basket",
  initialState,

  reducers: {
    setBasket: (state, action: PayloadAction<{ userId: string; products: ProductType[] }>) => {
      const { userId, products } = action.payload;

      state.baskets[userId] = products.map(product => ({
        product, 
        count: 1  //default deyer
      }));
  },
  addToBasket(state, action: PayloadAction<{ userId: string; product: ProductType; count: number }>) {
    const { userId, product, count } = action.payload;

    if (!state.baskets[userId] || state.baskets[userId].length === 0) {
        // Basket is empty, initialize with the product
        state.baskets[userId] = [{ product, count }];
    } else {
        // Basket already has items
        const findProduct = state.baskets[userId].find(item => item.product.id === product.id);
        if (findProduct && findProduct.count) {
            // Product already exists in the basket
            findProduct.count += count; // Only update the count
        } else {
            // Product does not exist in the basket, add it
            state.baskets[userId].push({ product, count });
        }
    }
    // Save the updated basket to localStorage
    localStorage.setItem(`basket_${userId}`, JSON.stringify(state.baskets[userId]));

},
  },
});

export const { addToBasket, setBasket } = basketSlice.actions;
export default basketSlice.reducer;
