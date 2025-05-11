import { useMemo } from "react";
import { Dimensions, Platform } from "react-native";

const isAndroid = () => Platform.OS === "android";

const isSmallDevice = () => {
  const { width, height } = Dimensions.get("window");
  return Math.min(width, height) < 360;
};

export const useScrollEnabled = () => {
  return useMemo(() => {
    return isAndroid() || isSmallDevice();
  }, []);
};
