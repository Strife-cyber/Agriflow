import useControlHook from "./control-hook";

const primary = "threshold";

export const useWaterTankThresholdHook = () => useControlHook<Object>(`${primary}/tank`);
export const useCo2LevelThresholdHook = () => useControlHook<Object>(`${primary}/co2Level`);
export const useSoilHumidityThresholdHook = () => useControlHook<Object>(`${primary}/humidity`);
export const useLuminosityThresholdHook = () => useControlHook<Object>(`${primary}/luminosity`);
export const useTemperatureThresholdHook = () => useControlHook<Object>(`${primary}/temperature`);
