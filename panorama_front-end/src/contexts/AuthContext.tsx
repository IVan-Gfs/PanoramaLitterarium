import { createContext, useState, useContext, type ReactNode } from "react";
import { type UserRole } from "../types/typesMenu"; 
interface UserData {
    email: string;
    role: UserRole; 
}

interface AuthContextType {
    user: UserData | null;
    login: (userData: UserData) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<UserData | null>(null);

    const login = (userData: UserData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
};
