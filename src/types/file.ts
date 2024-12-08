export interface IFile {
  id: string;
  filename: string;
  fileOriginalName: string;
  size: number;
  viewNumber: number;
  type: 'Image' | 'Video';
  isShared: boolean;
  createTime: string;
  updateTime: string;
  tags: Array<{
    id: string;
    text: string;
    createTime: string;
    updateTime: string;
  }>;
}
