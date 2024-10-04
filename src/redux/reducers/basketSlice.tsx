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

      // Transform ProductType[] to BasketItemType[]
      const basketItems: BasketItemType[] = products.map(product => ({
          product,
          quantity:1 // Initialize with a quantity of 1 or any default value you prefer
      }));

      state.baskets[userId] = basketItems; // Store the array of basket items under the user ID
  },
  addToBasket(state, action: PayloadAction<{ userId: string; product: ProductType; quantity: number }>) {
    const { userId, product, quantity } = action.payload;
    if (!state.baskets[userId]) {
        state.baskets[userId] = []; // Initialize if user basket doesn't exist
    }

    const existingItem = state.baskets[userId].find(item => item.product.id === product.id);
    if (existingItem) {
        // Update the quantity of the existing item without affecting the total
        existingItem.quantity += quantity; // Set quantity to the new value
    } else {
        // Add new item with quantity
        state.baskets[userId].push({ product, quantity });
    }

    // Save the updated basket to localStorage
    localStorage.setItem(`basket_${userId}`, JSON.stringify(state.baskets[userId]));
},
  },
});

export const { addToBasket, setBasket } = basketSlice.actions;
export default basketSlice.reducer;
