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
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            if (!user) {
                setError("Authentication failed. Please try again.");
                return false;
            }
    
            // Fetch user data from Firestore based on email
            const usersRef = collection(firestore, "users");
            const q = query(usersRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);
    
            if (querySnapshot.empty) {
                console.warn("User data not found in Firestore!");
                setError("Your account exists, but no user data was found. Please contact support.");
                return false;
            }
    
            // Retrieve user data
            const userData = querySnapshot.docs[0].data();
            login(userData.username || "", email, userData.role === "admin");
    
            return true;
        } catch (error) {
            const authError = error as AuthError;
    
            // Firebase Authentication Errors
            switch (authError.code) {
                case "auth/user-not-found":
                    setError("No account found with this email.");
                    break;
                case "auth/wrong-password":
                    setError("Incorrect password. Please try again.");
                    break;
                case "auth/invalid-email":
                    setError("Invalid email format.");
                    break;
                case "auth/too-many-requests":
                    setError("Too many login attempts. Please try again later.");
                    break;
                default:
                    setError("Login failed. Please check your credentials and try again.");
            }
    
            console.error("Login error: ", authError);
            return false;
        }
    };    

    const logoutFunction = async () => logout();

    return { registerFunction, loginFunction, logoutFunction, error }
}

export default useAuthHook;
