import axiosInstance, { endpoints } from '../utils/axios';

const getAllFiles = async () => {
  const response = await axiosInstance.get(endpoints.file.list);
  const { data } = response;
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const activateShare = async (payload: any) => {
  const response = await axiosInstance.patch(endpoints.file.share, payload);
  const { data } = response;
  return data;
};

export const filesService = {
  getAllFiles,
  activateShare,
};
