//import react router dom
import { Routes, Route } from "react-router-dom";

//import view home
import Home from "../home/index.jsx";

//import view register
import Register from "../auth/register.jsx";

//import view login
import Login from "../auth/login.jsx";

//import view dashboard
import Dashboard from "../dashboard/index.jsx";

//import store
import { useStore } from '../../stores/user.js';

//import hook Navigate from react router dom
import { Navigate } from "react-router-dom";

export default function AppRoutes() {

  //destruct state "token" from store
  const { token } = useStore();

  return (
    <Routes>
      {/* route "/" */}
      <Route path="/" element={<Home />} />

      {/* route "/register" */}
      <Route path="/register" element={
        token ? <Navigate to="/dashboard" replace /> : <Register />
      } />

      {/* route "/login" */}
      <Route path="/login" element={
        token ? <Navigate to="/dashboard" replace /> : <Login />
      } />

      {/* Protected Dashboard Route (Conditional Rendering) */}
      <Route path="/dashboard" element={
        token ? <Dashboard /> : <Navigate to="/login" replace />
      } />
    </Routes>
  );
}