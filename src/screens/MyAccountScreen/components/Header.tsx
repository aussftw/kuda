import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => (
  <View style={styles.header}>
    <View style={styles.backButtonContainer}>
      <TouchableOpacity disabled>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
    </View>
    <Text style={styles.headerTitle}>{title}</Text>
    <View style={styles.placeholder} />
  </View>
);

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  placeholder: {
    width: 24,
  },
  backButtonContainer: {
    width: 30,
    height: 30,
    backgroundColor: "#fff",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
