import { ToastContainer } from 'react-toastify';
import './App.css';
import Loader from './components/Loader';
import MainRouter from './routes/MainRouter';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from './redux/store';
import { useEffect } from 'react';
import { getAllProducts } from './redux/actions/productAction';
import { ProductType, UserType } from './assets/types/sliceTypes';
import { setCurrentUser } from './redux/reducers/appSlice';
import { setBasket, setUserBalance } from './redux/reducers/basketSlice';
import BasketDetails from './components/BasketDetails';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  const currentUserString = localStorage.getItem("currentUser");

  
  useEffect(() => {
    if (currentUserString) {
      const currentUser: UserType = JSON.parse(currentUserString);
      dispatch(setCurrentUser(currentUser));
  
      // Get the user's specific basket
      const basketString = localStorage.getItem(`basket_${currentUser.id}`);
      if (basketString) {
        const basket: ProductType[] = JSON.parse(basketString);
        dispatch(setBasket({ userId: currentUser.id, products: basket })); 
        dispatch(setUserBalance({ userId: currentUser.id, balance: currentUser.balance }));
      }
  
      // const storedBalance = localStorage.getItem(`balance_${currentUser.id}`);
      // if (storedBalance) {
      //   dispatch(setUserBalance({ userId: currentUser.id, balance: parseFloat(storedBalance) }));
      // } else {
      //   // If no stored balance, use the balance from the user object
      // }
    }
  }, [currentUserString, dispatch]);
  



  // useEffect(() => {
  //   const currentUserString = localStorage.getItem("currentUser");

  //   if (currentUserString) {
  //     try {
  //       const currentUser: UserType = JSON.parse(currentUserString);
  //       dispatch(setCurrentUser(currentUser));

  //       // Get the user's specific basket
  //       const basketString = localStorage.getItem(`basket_${currentUser.id}`);
  //       if (basketString) {
  //         const basket: ProductType[] = JSON.parse(basketString);
  //         if (basket.length > 0) {
  //           dispatch(setBasket({ userId: currentUser.id, products: basket })); // Store basket in Redux
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error parsing currentUser or basket from localStorage:", error);
  //     }
  //   }
  // }, [dispatch]);
  return (
    <div>
      <MainRouter />
      <ToastContainer autoClose={2000} />
      <BasketDetails/>
      <Loader />
    </div>
  );
}

export default App;
