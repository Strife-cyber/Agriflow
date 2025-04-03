import { useEffect, useState } from "react";
import { database } from "../firebase-config";
import { onValue, ref } from "firebase/database";

export const useRealtimeHook = (path: string) => {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const dbRef = ref(database, path);

        const unsubscribe = onValue(dbRef, (snapshot) => {
            const newData = snapshot.val();
            setData((prevData: any) => {
                return JSON.stringify(prevData) !== JSON.stringify(newData)
                    ? { ...newData }
                    : prevData;
            });
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [path]);

    return { data, isLoading }
}
