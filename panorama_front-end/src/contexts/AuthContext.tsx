import { createContext, useState, useContext, type ReactNode } from "react";
import { type UserRole } from "../types/typesMenu"; 
import { logoutUsuario } from "../services/entities/usuario/api/usuario.api";
import type { Perfil } from "../services/entities/usuario/type/Usuario";
const AUTH_USER_KEY = "auth_user";

interface UserData {
    email: string;
    perfil: Perfil
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
    const [user, setUser] = useState<UserData | null>(() => {
        const storedUser = localStorage.getItem(AUTH_USER_KEY);

        if (!storedUser) {
            return null;
        }

        try {
            return JSON.parse(storedUser) as UserData;
        } catch {
            localStorage.removeItem(AUTH_USER_KEY);
            return null;
        }
    });

    const login = (userData: UserData) => {
        setUser(userData);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData));
    };

     const logout = async () => {
        try {
            await logoutUsuario(); 
        } catch (error) {
            console.error("Erro ao deslogar no servidor:", error);
        } finally {
            setUser(null);
            localStorage.removeItem(AUTH_USER_KEY);
            localStorage.removeItem("token");
        }
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
