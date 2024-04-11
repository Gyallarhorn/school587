import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import UserPage from './pages/UserPage/UserPage.jsx';
import Register from './pages/Register/Register.jsx';
import AdminRoutes from './pages/Admin/AdminRoutes.jsx';
import PanelChecked from './pages/Admin/PanelChecked/PanelChecked.jsx';
import PanelNew from './pages/Admin/PanelNew/PanelNew.jsx';
import UpdateUser from './pages/Admin/UpdateUser/UpdateUser.jsx';
import Universitites from './pages/Admin/Universities/Universitites.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<Home />} />
      <Route path="/users/:id" element={<UserPage isAdmin={false} />} />
      <Route path="/register" element={<Register />} />

      <Route path="" element={<AdminRoutes />}>
        <Route path="/admin-panel/checked-users" element={<PanelChecked />} />
        <Route path="/admin-panel/checked-users/:id" element={<UserPage isAdmin={true} />} />
        <Route path="/admin-panel/new-users" element={<PanelNew />} />
        <Route path="/admin-panel/new-users/:id" element={<UserPage isAdmin={true} />} />
        <Route path="/admin-panel/edit/:id" element={<UpdateUser />} />
        <Route path="/admin-panel/universities" element={<Universitites />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
