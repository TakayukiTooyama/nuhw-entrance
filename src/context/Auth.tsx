import { UserAuth } from 'models/users';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, provider } from 'utils/firebase';

type AuthContextProps = {
  user: UserAuth | null | undefined;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps>({
  user: undefined,
  login: () => undefined,
  logout: () => undefined,
});

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const useProvideAuth = () => {
  const [user, setUser] = useState<UserAuth | null | undefined>();

  const login = () => {
    auth.signInWithRedirect(provider);
  };

  const logout = () => {
    auth.signOut();
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return {
    user,
    login,
    logout,
  };
};
