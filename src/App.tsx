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

 useEffect(()=> {
  const currentUserString: string | null = localStorage.getItem("currentUser");
  if(currentUserString){
    const currentUser:UserType = JSON.parse(currentUserString) as UserType;
    dispatch(setCurrentUser(currentUser))
  }
 },[])

 useEffect(() => {
const basketString = localStorage.getItem("basket");
if(basketString){
  const basket:ProductType[] = JSON.parse(basketString) as ProductType[]
  dispatch(setBasket(basket));
}
 },[])
  return (
  <div>
    <MainRouter/>
    <ToastContainer autoClose={2000} />
    <Loader/>
  </div>
  )
}

export default App
