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
  loading: boolean;
  setUser: (user: UserInfo | null) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setLoading: (loading: boolean) => void;
}

// Create context with default values
const UserContext = createContext<UserContextType>({
  user: null,
  isLoggedIn: false,
  loading: true,
  setUser: () => {},
  setIsLoggedIn: () => {},
  setLoading: () => {},
});

// Provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/status", { withCredentials: true });
        const data = res.data;
        setUser(data.user ?? null);
        setIsLoggedIn(data.isLoggedIn ?? false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false); // ensures spinner stops
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, isLoggedIn, loading, setUser, setIsLoggedIn, setLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
