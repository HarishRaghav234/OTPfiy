
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorMessage from './components/ErrorMessage';


function App() {

  return (
    <>
        <Navbar/>
        <Outlet />
        <ErrorMessage />
        <Footer />
    </>
  )
}

export default App
