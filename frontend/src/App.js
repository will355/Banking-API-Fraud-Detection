import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import DashboardPage from "./pages/DashboardPage.js";
import TransferPage from "./pages/TransferPage.js";
import TransactionsPage from "./pages/TransactionsPage.js";
import FraudAlertsPage from "./pages/FraudAlertsPage.js";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  return (
    <div className="app-shell">
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transfer"
          element={
            <ProtectedRoute>
              <TransferPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <TransactionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fraud"
          element={
            <ProtectedRoute>
              <FraudAlertsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
