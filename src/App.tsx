import './App.css';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './configs/routes.path';
import Dashboard from './layouts/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Dashboard />} />
          <Route path={routes.dashboard.root} element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
