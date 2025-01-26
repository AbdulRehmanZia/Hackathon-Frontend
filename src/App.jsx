import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import RegisterBeneficiary from "./pages/RegisterBeneficiary";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/receptionist/register" element={<RegisterBeneficiary />} />
    </Routes>
  );
}

export default App;
