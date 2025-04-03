import useControlHook from "./control-hook";

const primary = "/activators";
const secondary = `${primary}/state`

export const useFanHook = () => useControlHook<boolean>(`${primary}/fan`);
export const usePumpHook = () => useControlHook<boolean>(`${primary}/pump`);
export const useLightHook = () => useControlHook<boolean>(`${primary}/light`);


export const useFanStateHook = () => useControlHook<boolean>(`${secondary}/fan`);
export const usePumpStateHook = () => useControlHook<boolean>(`${secondary}/pump`);
export const useLightStateHook = () => useControlHook<boolean>(`${secondary}/light`);
