import { ref, set } from "firebase/database";
import { database } from "../firebase-config";
import { useRealtimeHook } from "./realtime-hook";

const useControlHook = <T extends boolean | number | Object> (path: string) => {
    const status = useRealtimeHook(path);

    const updateStatus = async (value: T) => {
        try {
            await set(ref(database, path), value);
        } catch (error) {
            console.error(`Failed to update status at ${path}: `, error);
            throw error
        }
    }

    return { status, updateStatus }
}

export default useControlHook;
