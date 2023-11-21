import './App.css';
import AllRoutes from './routes/AllRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img from './assets/raychan-background.jpg';
import { MemorizedSpinner } from './components';
import { useCommonContext } from './hooks';
import ScrollToTop from './components/Other/ScrollToTop';

function App() {
  // contexts
  const { showSpinner } = useCommonContext();

  return (
    <div
      className='bg-cover bg-no-repeat bg-center'
      style={{ backgroundImage: `url(${img})` }}
    >
      {showSpinner && <MemorizedSpinner />}
      <ScrollToTop />
      <AllRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
