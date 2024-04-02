import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import UserPage from './pages/UserPage/UserPage.jsx';
import Register from './pages/Register/Register.jsx';
import AdminRoutes from './pages/Admin/AdminRoutes.jsx';
import PanelChecked from './pages/Admin/PanelChecked/PanelChecked.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<Home />} />
      <Route path="/users/:id" element={<UserPage />} />
      <Route path="/register" element={<Register />} />

      <Route path="" element={<AdminRoutes />}>
        <Route path="/admin-panel/checked-users" element={<PanelChecked />} />
        <Route path="/admin-panel/checked-users/:id" element={<UserPage />} />
      </Route>

    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
