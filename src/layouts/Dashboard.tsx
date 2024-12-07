import { useQuery } from '@tanstack/react-query';
import DashBoardHeaderNav from '../components/DashBoardHeaderNav';
import FileTable from '../components/FileTable';
import Sidebar from '../components/Sidebar';
import { endpoints } from '../utils/axios';
import LoadingScreen from '../components/LoadingScreen';
import ErrorBlock from '../components/ErrorBlock';
import { filesService } from '../services/file.service';
import UploadFile from '../components/UploadFile';

const Dashboard = () => {
  const response = useQuery({
    queryKey: ['file-list'],
    queryFn: async () => {
      const data = await filesService.getAllFiles();
      return data;
    },
  });
  if (response.isPending || response.isLoading) {
    return <LoadingScreen />;
  }
  if (response.isError) {
    return <ErrorBlock route={endpoints.file.list} />;
  }

  return (
    <>
      <Sidebar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <DashBoardHeaderNav />
        <UploadFile />
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <FileTable files={response.data} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Dashboard;
