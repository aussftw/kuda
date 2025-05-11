import React, { useCallback } from "react";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import SkipButton from "./components/SkipButton";
import OnboardingCarousel from "./components/OnboardingCarousel";
import { RootStackParamList } from "../../navigation";
import Container from "../../shared/components/Container/Container";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Onboarding"
>;

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const completeOnboarding = useCallback(async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    navigation.replace("CreateAccount");
  }, [navigation]);

  return (
    <Container statusBarStyle="auto" backgroundColor="#F5F7FF">
      <SkipButton onPress={completeOnboarding} />
      <OnboardingCarousel onComplete={completeOnboarding} />
    </Container>
  );
};

export default OnboardingScreen;
