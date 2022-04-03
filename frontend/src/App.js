import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, Karyawan, Payment, Setting } from "./pages/admin";
import Auth from "./layouts/Auth";
import Admin from "./layouts/Admin";

const App = () => {
  return (
    <div className='bg-slate-100 antialiased'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Auth />}>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route index element={<Login />} />
          </Route>
          <Route path='/admin' element={<Admin />}>
            <Route path='/admin/payment' element={<Payment />} />
            <Route path='/admin/setting' element={<Setting />} />
            <Route path='/admin/karyawan' element={<Karyawan />} />
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
