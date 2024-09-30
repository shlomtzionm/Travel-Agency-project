import { Navigate, Route, Routes } from 'react-router-dom';
import Add from '../../DataArea/Add/Add';
import List from '../../DataArea/List/List';
import Home from '../Home/Home';
import Page404 from '../Page404/Page404';
import './Routing.css';
import { Register } from '../../UserArea/Register/Register';
import { Login } from '../../UserArea/Login/Login';
import AdminRoute from './AdminRoute';
import {LoginAuthorization} from './LoginAuthorization';
import SimpleCharts from '../../DataArea/Chart/Chart';

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        {/* Home */}
        <Route path="/home" element={<Home />} />

        {/* List (Protected) */}
        <Route path="/list" element={<LoginAuthorization><List/></LoginAuthorization>} />

        {/* Add (Protected and Admin Only) */}
        <Route path="/add" element={<LoginAuthorization><AdminRoute><Add /></AdminRoute></LoginAuthorization>} />
        <Route path="/chart" element={<LoginAuthorization><AdminRoute><SimpleCharts /></AdminRoute></LoginAuthorization>} />

        {/* User Authentication */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Page not found route */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default Routing;
