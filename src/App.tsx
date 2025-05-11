import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppNavigator from "./navigation";

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;
