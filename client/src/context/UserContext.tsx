import { createContext, useState, useEffect, type ReactNode } from "react";
import api from "../utils/axiosInterceptor";

// Define the user info type
export interface UserInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
  role: string;
}

// Define the context type
export interface UserContextType {
  user: UserInfo | null;
  isLoggedIn: boolean;
  setUser: (user: UserInfo | null) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

// Create context
const UserContext = createContext<UserContextType>({
  user: null,
  isLoggedIn: false,
  setUser: () => {},
  setIsLoggedIn: () => {},
});

// Provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/status", { withCredentials: true });
        const data = res.data;
        console.log(data);

        if (data.isLoggedIn && data.user) {
          setUser(data.user);
          setIsLoggedIn(data.isLoggedIn);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
        setIsLoggedIn(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoggedIn, setUser, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
