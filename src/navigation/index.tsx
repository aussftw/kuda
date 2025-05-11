import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnboardingScreen from "../screens/OnboardingScreen/OnboardingScreen";
import CreateAccount from "../screens/CreateAccountScreen/CreateAccount";
import MyAccountScreen from "../screens/MyAccountScreen/MyAccountScreen";

import useInitialRoute from "../hooks/useInitialRoute";

export type RootStackParamList = {
  Onboarding: undefined;
  CreateAccount: undefined;
  MyAccount: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const initialRoute = useInitialRoute();

  if (!initialRoute) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="MyAccount" component={MyAccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
