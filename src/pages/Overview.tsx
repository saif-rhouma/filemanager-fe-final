import { useQuery } from '@tanstack/react-query';
import FileTable from '../components/FileTable';
import UploadFile from '../components/UploadFile';
import { filesService } from '../services/file.service';
import LoadingScreen from '../components/LoadingScreen';
import ErrorBlock from '../components/ErrorBlock';
import { endpoints } from '../utils/axios';

const Overview = () => {
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
      <UploadFile />
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <FileTable files={response.data} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Overview;
