import React, { ReactNode } from "react";
import { ScrollView, StyleSheet, View, ViewStyle } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { useScrollEnabled } from "../../../hooks/useScrollEnabled";

type ContainerProps = {
  children: ReactNode;
  style?: ViewStyle;
  safeAreaEdges?: Edge[];
  includeBottomSafeArea?: boolean;
  statusBarStyle?: "auto" | "inverted" | "light" | "dark";
  backgroundColor?: string;
};

const Container: React.FC<ContainerProps> = ({
  children,
  style,
  safeAreaEdges = ["top", "right", "left", "bottom"],
  statusBarStyle = "auto",
  backgroundColor,
}) => {
  const scrollEnabled = useScrollEnabled();

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      scrollEnabled={scrollEnabled}
      style={{ backgroundColor }}
    >
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor }, style]}
        edges={safeAreaEdges}
      >
        <StatusBar style={statusBarStyle} />

        <View style={styles.container}>{children}</View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
});

export default Container;
