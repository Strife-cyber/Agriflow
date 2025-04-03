import { firestore } from "@/firebase-config"
import { collection, getDocs, onSnapshot, QuerySnapshot } from "firebase/firestore"
import { useEffect, useState } from "react";

const useFirestoreHook = () => {
    const getCollection = async (path: string) => {
        const querySnapshot = await getDocs(collection(firestore, path));
        return querySnapshot;
    }

    return { getCollection };
}

export const realtimeCollection = (path: string) => {
    const [data, setData] = useState<QuerySnapshot | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, path), (snapshot) => setData(snapshot));
        setIsLoading(false);
        return () => unsubscribe();
    }, [path]);

    return { data, isLoading };
}

export default useFirestoreHook;
