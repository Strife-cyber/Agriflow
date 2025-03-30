import { useState } from "react";
import { auth, firestore } from "../firebase-config";
import { useAuth } from "../context/auth-context";

import { 
    AuthError,
    updateProfile,
    sendEmailVerification,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword 
} from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

interface AuthHook {
    registerFunction: (name: string, email: string, password: string) => Promise<boolean>;
    loginFunction: (email: string, password: string) => Promise<boolean>;
    logoutFunction: () => void;
    error: string | null;
}

const useAuthHook = (): AuthHook => {
    const { login, logout } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const registerFunction = async(
        name: string, 
        email: string, 
        password: string
    ): Promise<boolean> => {
        try {
            setError(null);

            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(credentials.user, { displayName: name });

            login(name, email);
            await sendEmailVerification(credentials.user, {
                url: ''
            });

            return true
        } catch (error) {
            const authError = error as AuthError;
            setError(authError.message);
            console.error("Registration error: ", authError);
            return false
        }
    }

    const loginFunction = async (email: string, password: string): Promise<boolean> => {
        try {
            setError(null);
    
            // Sign in the user
            await signInWithEmailAndPassword(auth, email, password);
    
            // Fetch user data from Firestore based on email
            const usersRef = collection(firestore, "users");
            const q = query(usersRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                login(userData.username || "", email);
            } else {
                console.warn("User data not found in Firestore!");
                setError("User data not found.");
                return false;
            }
    
            return true;
        } catch (error) {
            const authError = error as AuthError;
            setError(authError.message);
            console.error("Login error: ", authError);
            return false;
        }
    };

    const logoutFunction = async () => logout();

    return { registerFunction, loginFunction, logoutFunction, error }
}

export default useAuthHook;
