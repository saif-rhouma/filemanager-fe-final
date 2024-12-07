import { useEffect } from 'react';
import axiosInstance from '../utils/axios';

const randomUserUrl = 'api/test/example/';

const CustomInstance = () => {
  const fetchData = async () => {
    const { data } = await axiosInstance.get(randomUserUrl);
    console.log('----> Response', data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <h2 className="text-center">
      Custom Instance - See Console To Check Backend
    </h2>
  );
};
export default CustomInstance;
