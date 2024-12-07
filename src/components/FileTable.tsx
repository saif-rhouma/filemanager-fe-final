import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { filesService } from '../services/file.service';
import { CONFIG } from '../configs/config-global';

const FileTable = ({ files }) => {
  const queryClient = useQueryClient();

  const { mutate: activateShare } = useMutation({
    mutationFn: ({ fileId, isShared }: { fileId: string; isShared: boolean }) =>
      filesService.activateShare({ fileId, isShared }),
    onSuccess: async (file) => {
      if (file.isShared) {
        navigator.clipboard.writeText(
          CONFIG.site.serverUrl + `api/public/shared/view/${file.id}`
        );
        toast.success('The Link In on your Clipboard . JUST PAST');
      } else {
        toast.success('File Is private!');
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['file-list'] });
    },
    onError: () => {},
  });

  return (
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
              {files.map((file) => (
                <tr>
                  <td>
                    <div className="d-flex px-2 py-1">
                      <div>
                        {file.type === 'Image' ? (
                          <img
                            src="../assets/img/team-1.jpg"
                            className="avatar avatar-sm me-3"
                          />
                        ) : (
                          <img
                            src="../assets/img/team-2.jpg"
                            className="avatar avatar-sm me-3"
                          />
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
                      {file.isShared ? 'Is Public' : 'Is Private'}
                    </p>
                  </td>
                  <td className="align-middle text-center text-sm">
                    <span className="badge badge-sm bg-gradient-success">
                      {file.size}
                    </span>
                  </td>
                  <td className="align-middle text-center">
                    <span className="text-secondary text-xs font-weight-bold">
                      {file.viewNumber}
                    </span>
                  </td>
                  <td className="align-middle">
                    <button
                      className="btn bg-gradient-info mt-4 mb-0 font-weight-bold text-xs"
                      onClick={() => {
                        activateShare({
                          fileId: file.id,
                          isShared: !file.isShared,
                        });
                      }}
                    >
                      Switch Share
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default FileTable;
