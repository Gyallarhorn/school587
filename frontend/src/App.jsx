import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './components/Navigation/Navigation';

import './App.css';

function App() {
  return (
    <>
      <Navigation />
      <main className="main">
        <Outlet />
      </main>
      <ToastContainer />
    </>

  );
}

export default App;
