import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import AuthGuard from './components/AuthGuard';
import { routes } from './configs/routes.path';
import Dashboard from './layouts/Dashboard';
import Login from './pages/Login';
import FsManager from './pages/FsManager';
import Overview from './pages/Overview';

const wrapWithAuthGuard = (Component: React.ComponentType) => (
  <AuthGuard>
    <Component />
  </AuthGuard>
);

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={wrapWithAuthGuard(Dashboard)}>
          <Route index element={<Overview />} />
          <Route path={routes.dashboard.filemanager} element={<FsManager />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
