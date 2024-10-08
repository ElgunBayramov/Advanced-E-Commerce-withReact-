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
  
      // Save updated balance to Redux and localStorage
      state.baskets[userId] = [];
      state.totalAmount = 0;
  
      // Update balance in localStorage
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem(`basket_${userId}`, JSON.stringify([]));
  
      // Update balance, email, and password in the database
      LoginService.updateUserBalance(userId, currentUser.email, currentUser.password, currentUser.balance); // Pass email and password
  
      toast.success("Məhsullar uğurla alındı!");
    }
  },
  
  

  setUserBalance: (state: BasketSliceType, action: PayloadAction<{ userId: string; balance: number }>) => {
    const { userId, balance } = action.payload;
    const currentUserString = localStorage.getItem("currentUser");
    const currentUser = currentUserString ? JSON.parse(currentUserString) : null;

    if (currentUser && currentUser.id === userId) {
      currentUser.balance = balance; // Update the balance
      localStorage.setItem("currentUser", JSON.stringify(currentUser)); // Update localStorage

      // Update the user's basket in Redux
      if (state.baskets[userId]) {
        state.baskets[userId] = state.baskets[userId].map(item => ({
          ...item,
          // Assuming you want to store balance in the basket items as well
          balance: currentUser.balance,
        }));
      }
    }}


}
});

export const { addToBasket, setBasket, setDrawer, calculateBasket, removeProductFromBasket, updateBalance, setUserBalance } = basketSlice.actions;
export default basketSlice.reducer;
