import { useState } from "react";
import { Alert } from "react-native";
import { getAccountData, signup } from "../services/services";
import { useAccountStore } from "../store/useAccountStore";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation";

type SignupData = {
  name: string;
  email: string;
  password: string;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MyAccount"
>;

export function useSignup() {
  const setAccount = useAccountStore((state) => state.setAccount);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const onSubmit = async (data: SignupData, agreedToTerms: boolean) => {
    if (!agreedToTerms) {
      Alert.alert("Terms Required", "Please agree to the terms.", [
        { text: "OK" },
      ]);
      return;
    }

    try {
      setLoading(true);
      const signupResult = await signup(data);
      const { username, password } = signupResult.basicAuthCredentials;
      const accountData = await getAccountData(username, password);
      setAccount(accountData);
      navigation.navigate("MyAccount");
    } catch (error: any) {
      Alert.alert("Signup Failed", error.message || "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { onSubmit, loading };
}
