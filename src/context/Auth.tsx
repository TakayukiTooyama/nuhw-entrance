import { UserAuth } from 'models/users';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, provider } from 'utils/firebase';

type AuthContextProps = {
  user: UserAuth | null | undefined;
  loading: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps>({
  user: undefined,
  loading: true,
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
  const [loading, setLoading] = useState(true);

  const login = () => {
    auth.signInWithRedirect(provider);
  };

  const logout = () => {
    auth.signOut();
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, [user]);

  return {
    user,
    loading,
    login,
    logout,
  };
};
