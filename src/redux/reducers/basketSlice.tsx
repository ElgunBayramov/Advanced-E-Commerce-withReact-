import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BasketSliceType, ProductType } from "../../assets/types/sliceTypes";
import { toast } from "react-toastify";
import LoginService from "../../services/LoginService";


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
    const userBasket = state.baskets[userId] || [];

    const existingProduct = userBasket.find(item => item.product.id === product.id);
    if (existingProduct && existingProduct.count) {
      existingProduct.count += count;
    } else {
      userBasket.push({ product, count });
    }

    state.baskets[userId] = userBasket;

    localStorage.setItem(`basket_${userId}`, JSON.stringify(userBasket));
  },
  setDrawer:(state:BasketSliceType,action:PayloadAction<boolean>) => {
    state.drawer = action.payload;
  },
  calculateBasket: (state: BasketSliceType, action: PayloadAction<{ userId: string }>) => {
    const { userId } = action.payload;
    let total: number = 0;
    
    if (state.baskets[userId]) {
      state.baskets[userId].map(basketItem => {
        if (basketItem.count) {
          total = total + (basketItem.product.price * basketItem.count);
        }
      });
    }
    
    state.totalAmount = total;
  },
  removeProductFromBasket: (state: BasketSliceType, action: PayloadAction<{ userId: string; productId: number }>) => {
    const { userId, productId } = action.payload;

    if (state.baskets[userId]) {
      state.baskets[userId] = state.baskets[userId].filter(item => item.product.id !== productId);

      localStorage.setItem(`basket_${userId}`, JSON.stringify(state.baskets[userId]));
    }
  },

  updateBalance: (state: BasketSliceType, action: PayloadAction<{ userId: string; totalAmount: number }>) => {
    const { userId, totalAmount } = action.payload;
    const currentUserString = localStorage.getItem("currentUser");
    const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
  
    if (currentUser && currentUser.balance >= totalAmount) {
      currentUser.balance -= totalAmount;
  
      state.baskets[userId] = [];
      state.totalAmount = 0;
  
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem(`basket_${userId}`, JSON.stringify([]));
  
      LoginService.updateUserBalance(userId, currentUser.email, currentUser.password, currentUser.balance); 
  
      toast.success("Məhsullar uğurla alındı!");
    }
  },

  setUserBalance: (state: BasketSliceType, action: PayloadAction<{ userId: string; balance: number }>) => {
    const { userId, balance } = action.payload;
    const currentUserString = localStorage.getItem("currentUser");
    const currentUser = currentUserString ? JSON.parse(currentUserString) : null;

    if (currentUser && currentUser.id === userId) {
      currentUser.balance = balance; 
      localStorage.setItem("currentUser", JSON.stringify(currentUser)); 

      if (state.baskets[userId]) {
        state.baskets[userId] = state.baskets[userId].map(item => ({
          ...item,
          balance: currentUser.balance,
        }));
      }
    }}


}
});

export const { addToBasket, setBasket, setDrawer, calculateBasket, removeProductFromBasket, updateBalance, setUserBalance } = basketSlice.actions;
export default basketSlice.reducer;
