import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthGuard from './AuthGuard';
import Example from '../pages/Example';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const wrapWithAuthGuard = (_Component: React.ReactNode) => (
  <AuthGuard>
    <div></div>
  </AuthGuard>
);

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={wrapWithAuthGuard(<Example />)} />
      <Route path="/users" element={wrapWithAuthGuard(<Example />)} />
      <Route path="/requests" element={wrapWithAuthGuard(<Example />)} />
    </Routes>
  );
};
export default ProtectedRoutes;
