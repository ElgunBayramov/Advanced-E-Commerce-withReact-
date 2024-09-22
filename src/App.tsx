import { ToastContainer } from 'react-toastify'
import './App.css'
import Loader from './components/Loader'
import MainRouter from './routes/MainRouter'
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
  <div>
    <MainRouter/>
    <ToastContainer autoClose={2000} />
    <Loader/>
  </div>
  )
}

export default App
