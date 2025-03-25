import useControlHook from "./control-hook";

const primary = "/commande";

export const useFanHook = () => useControlHook<boolean>(`${primary}/fans`);
export const usePumpHook = () => useControlHook<boolean>(`${primary}/pump`);
export const useLightHook = () => useControlHook<boolean>(`${primary}/light`);
