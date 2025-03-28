import Cookies from "js-cookie";
import { enc } from "crypto-js";
import { encrypt, decrypt } from "crypto-js/aes";
import { createContext, ReactNode, useContext, useState } from "react";

interface AuthState {
    username:   string | null;
    email:      string | null;
    connected:  boolean;
}

interface AuthContextType {
    authState: AuthState;
    login: (username: string, email: string) => void;
    logout: () => void;
}

const ENCRYPTION_KEY = import.meta.env.VITE_APP_ENCRYPTION_KEY || '';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>(() => {
        const encryptedData = Cookies.get('auth');

        if (encryptedData) {
            try {
                const decrypted = decrypt(encryptedData, ENCRYPTION_KEY).toString(enc.Utf8);
                return JSON.parse(decrypted);
            } catch (error) {
                console.error('Failed to decrypt cookie: ', error)
            }
        }

        return {
            username: null,
            email: null,
            connected: false
        }
    });

    const login = (username: string, email: string) => {
        const newState: AuthState = {
            username, email, connected: true
        }

        const encryptedData = encrypt(JSON.stringify(newState), ENCRYPTION_KEY).toString();
        Cookies.set('auth', encryptedData, {
            expires: 1,
            secure: true,
            sameSite: 'strict'
        })

        setAuthState(newState)
    }

    const logout = () => {
        Cookies.remove('auth');
        setAuthState({
            username: null,
            email: null,
            connected: false
        })
    }

    const value = { authState, login, logout }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider")
    return context;
}
