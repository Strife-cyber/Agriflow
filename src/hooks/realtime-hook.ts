import { useEffect, useState } from "react";
import { database } from "../firebase-config";
import { onValue, ref } from "firebase/database";

export const useRealtimeHook = (path: string) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const dbRef = ref(database, path);

        const unsubscribe = onValue(dbRef, (snapshot) => {
            setData(snapshot.val());
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [path]);

    return { data, isLoading }
}
