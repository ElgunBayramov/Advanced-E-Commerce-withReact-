import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BasketSliceType, ProductType } from "../../assets/types/sliceTypes";


const initialState: BasketSliceType = {
  baskets: {}, 
  drawer:false,
  totalAmount:0,
};
export const basketSlice = createSlice({
  name: "basket",
  initialState,

  reducers: {
    setBasket: (state: BasketSliceType, action: PayloadAction<{ userId: string; products: any[]}>) => {
      const { userId, products } = action.payload;
      state.baskets[userId] = products.map(product => ({
        ...product, 
      }));
    },
  addToBasket: (state:BasketSliceType, action: PayloadAction<{ userId: string; product: ProductType; count: number }>) => {
    const { userId, product, count } = action.payload;
    //səbətdə məhsul yoxdur
    const userBasket = state.baskets[userId] || [];

    //səbətdə məhsul var
    const existingProduct = userBasket.find(item => item.product.id === product.id);
    // bu məhsulu səbətdən tapırıq
    if (existingProduct && existingProduct.count) {
      // Məhsul tapılarsa, onun sayını artır
      existingProduct.count += count;
    } else {
      // Məhsul tapılmazsa, yeni olaraq əlavə et
      userBasket.push({ product, count });
    }

    state.baskets[userId] = userBasket;

    // Basketi localStorage-də də yenilə
    localStorage.setItem(`basket_${userId}`, JSON.stringify(userBasket));
  },
  setDrawer:(state:BasketSliceType,action:PayloadAction<boolean>) => {
    state.drawer = action.payload;
  },
  calculateBasket: (state: BasketSliceType, action: PayloadAction<{ userId: string }>) => {
    const { userId } = action.payload;
    let sum: number = 0;
    
    if (state.baskets[userId]) {
      state.baskets[userId].map(basketItem => {
        if (basketItem.count) {
          sum = sum + (basketItem.product.price * basketItem.count);
        }
      });
    }
    
    state.totalAmount = sum;
  },
  removeProductFromBasket: (state: BasketSliceType, action: PayloadAction<{ userId: string; productId: number }>) => {
    const { userId, productId } = action.payload;

    if (state.baskets[userId]) {
      state.baskets[userId] = state.baskets[userId].filter(item => item.product.id !== productId);

      localStorage.setItem(`basket_${userId}`, JSON.stringify(state.baskets[userId]));
    }
  },
}
});

export const { addToBasket, setBasket, setDrawer, calculateBasket, removeProductFromBasket } = basketSlice.actions;
export default basketSlice.reducer;
