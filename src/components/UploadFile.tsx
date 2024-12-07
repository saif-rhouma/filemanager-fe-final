import { useState } from 'react';
import axiosInstance, { endpoints } from '../utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    handleUploadFile(formData);
  };

  const queryClient = useQueryClient();
  const uploadConfig = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  const { mutate: handleUploadFile } = useMutation({
    mutationFn: (fnFile) =>
      axiosInstance.post(endpoints.file.upload, fnFile, uploadConfig),
    onSuccess: async ({ data }) => {
      await queryClient.invalidateQueries({ queryKey: ['file-list'] });
      return data;
    },
    onSettled: async () => {
      setFile(null);
      setUploadStatus('');
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
      }}
    >
      {' '}
      <div
        className="mb-3"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <input
          type="file"
          className="form-control"
          onChange={handleFileChange}
        />
      </div>
      <div
        className="mb-3"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <button
          onClick={handleUpload}
          className="form-control bg-gradient-warning"
        >
          Upload
        </button>
      </div>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};
export default UploadFile;
