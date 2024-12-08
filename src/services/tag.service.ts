import axiosInstance, { endpoints } from '../utils/axios';

const addNewTag = async (payload: any) => {
  const response = await axiosInstance.post(endpoints.tag.add, payload);
  const { data } = response;
  return data;
};

export const tagsService = {
  addNewTag,
};
