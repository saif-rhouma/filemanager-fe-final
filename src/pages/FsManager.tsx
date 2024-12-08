import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import ErrorBlock from '../components/ErrorBlock';
import LoadingScreen from '../components/LoadingScreen';
import { filesService } from '../services/file.service';
import { endpoints } from '../utils/axios';
import FileIcon from './FileIcon';
import Dialog from '../components/Dialog';
import { IFile } from '../types/file';

const FsManager = () => {
  const [files, setFiles] = useState<IFile[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<IFile | null>(null);

  const handleShowTags = useCallback((file: IFile) => {
    setSelectedFile(file);
    setIsDialogOpen(true);
  }, []);

  const reorderFiles = (draggedFileId: string, targetFileId: string) => {
    const draggedIndex = files.findIndex((file) => file.id === draggedFileId);
    const targetIndex = files.findIndex((file) => file.id === targetFileId);

    if (
      draggedIndex === -1 ||
      targetIndex === -1 ||
      draggedIndex === targetIndex
    ) {
      return;
    }

    const updatedFiles = [...files];
    const [draggedItem] = updatedFiles.splice(draggedIndex, 1);
    updatedFiles.splice(targetIndex, 0, draggedItem);

    setFiles(updatedFiles);
  };

  const response = useQuery({
    queryKey: ['file-list'],
    queryFn: async () => {
      const data = await filesService.getAllFiles();
      setFiles(data);
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
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedFile(null);
        }}
      >
        <h6 className="mb-2">File Tags</h6>

        <div>
          {selectedFile &&
            (selectedFile.tags.length ? (
              selectedFile.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="badge badge-sm bg-gradient-info m-1"
                >
                  {tag.text}
                </span>
              ))
            ) : (
              <span>No Tags for this file.</span>
            ))}
        </div>
      </Dialog>
      <div className="container-fluid py-4">
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="card-box">
                  <div className="row">
                    {files.map((file) => (
                      <FileIcon
                        key={file.id}
                        file={file}
                        showTags={() => handleShowTags(file)}
                        reorderFiles={reorderFiles}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FsManager;
