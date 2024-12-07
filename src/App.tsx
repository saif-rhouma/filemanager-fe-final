import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import AuthGuard from './components/AuthGuard';
import { routes } from './configs/routes.path';
import Dashboard from './layouts/Dashboard';
import Login from './pages/Login';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const wrapWithAuthGuard = (Component) => (
//   <AuthGuard>
//     <Component />
//   </AuthGuard>
// );

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
