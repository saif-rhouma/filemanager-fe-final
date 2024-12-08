import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface IAuthGuard {
  children: ReactNode;
}

const ACCESS_TOKEN_KEY = 'accessToken';

const AuthGuard = ({ children }: IAuthGuard) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (!accessToken) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
export default AuthGuard;
