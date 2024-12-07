import { createContext, Dispatch, SetStateAction } from 'react';

type ContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<ContextType | undefined>(undefined);
