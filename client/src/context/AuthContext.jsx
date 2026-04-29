import { createContext, useContext, useEffect, useState } from "react";
import { useMe } from "../hooks/authApi.hook";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [credit, setCredit] = useState(null);
  const [initialized, setInitialized] = useState(false);

  const { data, isLoading, isError } = useMe();

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
      setCredit(data.credit);
    } else {
      setUser(null);
      setCredit(null);
    }

    setInitialized(!isLoading);
  }, [data, isError, isLoading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        credit,
        setUser,
        setCredit,
        loading: isLoading,
        initialized,
        isError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
