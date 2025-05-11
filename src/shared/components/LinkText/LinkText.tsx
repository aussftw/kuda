import React from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  StyleProp,
  TextStyle,
  Linking,
} from "react-native";

import { COLORS } from "../../constants";
type LinkTextProps = {
  text: string;
  onPress?: () => void;
  style?: StyleProp<TextStyle>;
};

const LinkText: React.FC<LinkTextProps> = ({ text, onPress, style }) => {
  const handlePress = onPress || (() => Linking.openURL("https://example.com"));
  return (
    <Pressable onPress={handlePress}>
      <Text style={[styles.linkText, style]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  linkText: {
    color: COLORS.PRIMARY,
    fontWeight: "500",
  },
});

export default LinkText;
