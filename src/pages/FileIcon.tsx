import { IFile } from '../types/file';
import { fileSizeFormatter } from '../utils/fomatter';

interface FileIconProps {
  file: IFile;
  showTags: () => void;
  reorderFiles: (draggedFileId: string, targetFileId: string) => void;
}

const FileIcon: React.FC<FileIconProps> = ({
  file,
  showTags,
  reorderFiles,
}) => {
  const handleDragStart = () => {
    localStorage.setItem('draggedFileId', file.id);
  };

  const handleDrop = () => {
    const draggedFileId = localStorage.getItem('draggedFileId');
    if (draggedFileId) {
      reorderFiles(draggedFileId, file.id);
    }
    localStorage.removeItem('draggedFileId');
  };

  return (
    <div
      className="col-lg-3 col-xl-2"
      draggable
      onDragStart={handleDragStart}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="file-man-box">
        <div className="file-img-box">
          <img
            src={`https://coderthemes.com/highdmin/layouts/assets/images/file_icons/${file.type === 'Image' ? 'jpg' : 'avi'}.svg`}
            alt="icon"
          />
        </div>

        <div className="file-man-title" onClick={showTags}>
          <h5 className="mb-0 text-overflow">{file.fileOriginalName}</h5>
          <p className="mb-0">
            <small>{fileSizeFormatter(file.size)}</small>
          </p>
        </div>
      </div>
    </div>
  );
};
export default FileIcon;
