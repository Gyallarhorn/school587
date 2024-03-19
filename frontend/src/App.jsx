import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './components/Navigation/Navigation';

import './App.css';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Navigation />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </>

  );
}

export default App;
