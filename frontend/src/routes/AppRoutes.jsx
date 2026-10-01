import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import ProtectedRoute from "../components/auth/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Command Center Routes */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        {/* Additional module routes (Forensics, Link Analysis, GIS Crime Map, Diurnal Matrix, Assistant) are initialized in modular feature commits */}
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;