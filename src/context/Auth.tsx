import { createContext, useContext, useEffect, useState } from 'react';

import type { UserAuth } from '@/models/users';
import { auth, provider } from '@/utils/firebase';

type AuthContextProps = {
  user: UserAuth | null | undefined;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps>({
  user: undefined,
  isLoading: true,
  login: () => undefined,
  logout: () => undefined,
});

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

const useProvideAuth = () => {
  const [user, setUser] = useState<UserAuth | null | undefined>();
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      }
    });
  }, [user]);

  return {
    user,
    isLoading,
    login,
    logout,
  };
};
