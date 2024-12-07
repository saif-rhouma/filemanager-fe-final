/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import axiosInstance, { endpoints } from '../utils/axios';

import { AuthContext } from '../contexts/auth-context';
import { AxiosRequestConfig } from 'axios';

type Props = {
  children: ReactNode;
};

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [token, setToken] = useState();
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await axiosInstance.get(endpoints.auth.me);
        localStorage.setItem('user', response.data);
        setIsAuthenticated(true);
      } catch {
        setToken(undefined);
      }
    };
    fetchMe();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = axiosInstance.interceptors.request.use((config) => {
      const customConfig = config as AxiosRequestConfig & { _retry?: boolean };
      // Add access token to request headers
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);

      if (!customConfig._retry && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      axiosInstance.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  // useLayoutEffect(() => {
  //   const refreshInterceptor = axiosInstance.interceptors.response.use(
  //     (response) => response,
  //     async (error) => {
  //       const originalRequest = error.config;
  //       const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  //       if (error.statusCode === 401 && refreshToken) {
  //         try {
  //           const response = await axiosInstance.post(
  //             endpoints.auth.refreshToken,
  //             {
  //               refreshToken: `Bearer ${refreshToken}`,
  //             }
  //           );

  //           localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);

  //           originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
  //           originalRequest._retry = true;
  //           return axiosInstance(originalRequest);
  //         } catch (error) {
  //           localStorage.removeItem(ACCESS_TOKEN_KEY);
  //           localStorage.removeItem(REFRESH_TOKEN_KEY);
  //         }
  //       }
  //       return Promise.reject(error);
  //     }
  //   );

  //   return () => {
  //     axiosInstance.interceptors.response.eject(refreshInterceptor);
  //   };
  // }, [token]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
