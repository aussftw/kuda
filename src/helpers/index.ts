import { Platform, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const isIOS = () => Platform.OS === "ios";
export const isAndroid = () => Platform.OS === "android";
export const isSmallDevice = () => {
  return Math.min(width, height) < 360;
};

export const formatCurrency = (amount: number) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatTransactionAmount = (currency: string, amount: number) => {
  if (amount > 0) {
    return `+${currency}${formatCurrency(amount)}`;
  }
  return `-${currency}${formatCurrency(Math.abs(amount))}`;
};

export const getInitialLetter = (name: string) => {
  return name.charAt(0).toUpperCase();
};
