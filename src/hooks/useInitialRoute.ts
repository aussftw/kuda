import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { RootStackParamList } from "../navigation";

type RouteName = keyof RootStackParamList;

export default function useInitialRoute() {
  const [initialRoute, setInitialRoute] = useState<RouteName | null>(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const seen = await AsyncStorage.getItem("hasSeenOnboarding");
        setInitialRoute(seen === "true" ? "CreateAccount" : "Onboarding");
      } catch (error) {
        console.warn("Error reading onboarding flag", error);
        setInitialRoute("Onboarding");
      }
    };
    checkOnboarding();
  }, []);

  return initialRoute;
}
