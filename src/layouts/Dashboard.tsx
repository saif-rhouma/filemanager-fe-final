import { Outlet } from 'react-router-dom';
import DashBoardHeaderNav from '../components/DashBoardHeaderNav';
import Sidebar from '../components/Sidebar';

const Dashboard: React.ComponentType = () => {
  return (
    <>
      <Sidebar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <DashBoardHeaderNav />
        <Outlet />
      </main>
    </>
  );
};
export default Dashboard;
