import { createContext, useState, useContext } from "react";
export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
  };
  const handleProfile = (profile) => {
    setUserProfile(profile);
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, userProfile, handleLogin, handleLogout, handleProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
