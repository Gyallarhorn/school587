import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

console.log(import.meta.env.VITE_BASE_URL);

// const test = {
//   name: 'Hi',
// };

// localStorage.setItem('adminInfo', JSON.stringify(test));

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<App />}>
      {/* <Route path='/' index={true} element={/>}/> */}
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
