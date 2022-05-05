import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, Karyawan, Payment, Setting } from "../pages/admin";
import Auth from "../layouts/Auth";
import Admin from "../layouts/Admin";
import RequireAuth from "../components/RequireAuth";

const Router = () => {
  return (
    <div className="bg-slate-100 antialiased">
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Auth />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route index element={<Login />} />
          </Route>

          {/* Protected Route */}
          <Route element={<RequireAuth />}>
            <Route path="/admin" element={<Admin />}>
              <Route path="/admin/payment" element={<Payment />} />
              <Route path="/admin/setting" element={<Setting />} />
              <Route path="/admin/karyawan" element={<Karyawan />} />
              <Route index element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
