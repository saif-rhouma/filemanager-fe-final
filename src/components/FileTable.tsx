import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { filesService } from '../services/file.service';
import { CONFIG } from '../configs/config-global';
import { FaRegFileVideo } from 'react-icons/fa6';
import { FaRegFileImage } from 'react-icons/fa6';
import { SiPrivateinternetaccess } from 'react-icons/si';
import { MdPublic } from 'react-icons/md';
import { RiStickyNoteAddLine } from 'react-icons/ri';
import { useCallback, useRef, useState } from 'react';
import Dialog from './Dialog';
import TagDialogContent from './TagDialogContent';
import { IFile } from '../types/file';
import { fileSizeFormatter } from '../utils/fomatter';

interface IFileTableProps {
  files: IFile[];
}

const FileTable: React.FC<IFileTableProps> = ({ files }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenShare, setIsDialogOpenShare] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | undefined>();
  const [shareLink, setShareLink] = useState('');
  const queryClient = useQueryClient();

  const inputRef = useRef<HTMLInputElement>(null);
  const handleSelectValue = () => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  const { mutate: activateShare } = useMutation({
    mutationFn: ({ fileId, isShared }: { fileId: string; isShared: boolean }) =>
      filesService.activateShare({ fileId, isShared }),
    onSuccess: async (file) => {
      if (file.isShared) {
        handleCopySharedLink(file);
      } else {
        toast.success('File Is private!');
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['file-list'] });
    },
    onError: () => {},
  });

  const handleCopySharedLink = useCallback((file: IFile) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        CONFIG.site.serverUrl + `api/public/shared/view/${file.id}`
      );
    }
    setShareLink(CONFIG.site.serverUrl + `api/public/shared/view/${file.id}`);
    setIsDialogOpenShare(true);
    toast.success('The Link In on your Clipboard. [IN CASE HTTPS]');
  }, []);

  return (
    <>
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <TagDialogContent
          onClose={() => setIsDialogOpen(false)}
          fileId={selectedFile}
        />
      </Dialog>
      <Dialog
        isOpen={isDialogOpenShare}
        onClose={() => setIsDialogOpenShare(false)}
      >
        <h6 className="mb-4">Sharing Link</h6>
        <input
          ref={inputRef}
          type="text"
          className="form-control"
          onClick={handleSelectValue}
          value={shareLink}
        />
      </Dialog>
      <div className="card mb-4">
        <div className="card-header pb-0">
          <h6>My Files Table</h6>
        </div>
        <div className="card-body px-0 pt-0 pb-2">
          <div className="table-responsive p-0">
            <table className="table align-items-center mb-0">
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    File Name
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    Is Shared
                  </th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Type
                  </th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    View
                  </th>
                  <th className="text-secondary opacity-7"></th>
                </tr>
              </thead>
              <tbody>
                {files.map((file: IFile) => (
                  <tr key={file.id}>
                    <td>
                      <div className="d-flex px-2 py-1">
                        <div className="px-2 py-1">
                          {file.type === 'Image' ? (
                            <FaRegFileImage size={24} onClick={() => {}} />
                          ) : (
                            <FaRegFileVideo size={24} />
                          )}
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <h6 className="mb-0 text-sm">
                            {file.fileOriginalName}
                          </h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-xs font-weight-bold mb-0">
                        {file.isShared ? (
                          <MdPublic
                            style={{
                              cursor: 'pointer',
                            }}
                            size={24}
                            onClick={() => handleCopySharedLink(file)}
                          />
                        ) : (
                          <SiPrivateinternetaccess size={24} />
                        )}
                      </p>
                    </td>
                    <td className="align-middle text-center text-sm">
                      <span className="badge badge-sm bg-gradient-success">
                        {fileSizeFormatter(file.size)}
                      </span>
                    </td>
                    <td className="align-middle text-center">
                      <span className="text-secondary text-xs font-weight-bold">
                        {file.viewNumber}
                      </span>
                    </td>
                    <td
                      className="d-flex align-items-center"
                      style={{ justifyContent: 'space-around' }}
                    >
                      <button
                        className={`btn mb-0 text-xs  ${
                          file.isShared
                            ? 'bg-gradient-danger'
                            : 'bg-gradient-success'
                        }`}
                        onClick={() => {
                          activateShare({
                            fileId: file.id,
                            isShared: !file.isShared,
                          });
                        }}
                      >
                        {file.isShared ? 'Make It Private' : 'Make It Public'}
                      </button>
                      <RiStickyNoteAddLine
                        size={24}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setSelectedFile(file.id);
                          setIsDialogOpen(true);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default FileTable;
