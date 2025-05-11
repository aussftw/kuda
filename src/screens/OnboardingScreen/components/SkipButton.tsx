import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

type SkipButtonProps = {
  onPress: () => void;
};

const SkipButton: React.FC<SkipButtonProps> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.skip}>
      <Text style={styles.skipText}>Skip</Text>
    </Pressable>
  );
};

export default SkipButton;

const styles = StyleSheet.create({
  skip: {
    position: "absolute",
    right: 16,
    top: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  skipText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
