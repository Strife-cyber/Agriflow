import useControlHook from "./control-hook";

const primary = "/limite";

export const useCo2Hook = () => useControlHook<number>(`${primary}/co2`);
export const useLightHook = () => useControlHook<number>(`${primary}/light`);
export const useWaterHook = () => useControlHook<number>(`${primary}/water`);
export const useHumidityHook = () => useControlHook<number>(`${primary}/humidity`);
export const useTemperatureHook = () => useControlHook<number>(`${primary}/temperature`);
