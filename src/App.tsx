import { ToastContainer } from 'react-toastify'
import './App.css'
import Loader from './components/Loader'
import MainRouter from './routes/MainRouter'
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from './redux/store';

import { useEffect } from 'react';
import { getAllProducts } from './redux/actions/productAction';
import { ProductType, UserType } from './assets/types/sliceTypes';
import { setCurrentUser } from './redux/reducers/appSlice';
import { setBasket } from './redux/reducers/basketSlice';

function App() {
  const dispatch = useAppDispatch()
 useEffect(() => {
   dispatch(getAllProducts())
 },[])

 useEffect(() => {
  const currentUserString: string | null = localStorage.getItem("currentUser");
  if (currentUserString) {
    const currentUser: UserType = JSON.parse(currentUserString);
    dispatch(setCurrentUser(currentUser));

    // Get the user's specific basket
    const basketString = localStorage.getItem(`basket_${currentUser.id}`);
    if (basketString) {
      const basket: ProductType[] = JSON.parse(basketString);
      dispatch(setBasket({ userId: currentUser.id, products: basket })); // Store basket in Redux
    }
  }
}, [dispatch]);


  return (
  <div>
    <MainRouter/>
    <ToastContainer autoClose={2000} />
    <Loader/>
  </div>
  )
}

export default App
