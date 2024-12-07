import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface IAuthGuard {
  children: ReactNode;
}

const ACCESS_TOKEN_KEY = 'accessToken';

const AuthGuard: React.FC<IAuthGuard> = ({ children }) => {
  const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  // try {
  //   jwtDecode(accessToken);
  // } catch (_) {
  //   sessionStorage.removeItem('access_token');

  //   return <Navigate to="/login" />;
  // }

  return children;
};
export default AuthGuard;
