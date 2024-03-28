import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import UserPage from './pages/UserPage/UserPage.jsx';
import Register from './pages/Register/Register.jsx';

// const test = {
//   name: 'Hi',
// };

// localStorage.setItem('adminInfo', JSON.stringify(test));

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<App />}>
      <Route path='/' index={true} element={<Home />} />
      <Route path='users/:id' element={<UserPage />} />
      <Route path='/register' element={<Register />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
