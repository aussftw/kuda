import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Ionicons } from "@expo/vector-icons";

import MainButton from "../../../shared/components/MainButton/MainButton";
import LinkText from "../../../shared/components/LinkText/LinkText";
import { useScrollEnabled } from "../../../hooks/useScrollEnabled";
import { useSignup } from "../../../hooks/useSignup";
import { schema } from "../CreateAccountValidation";
import { COLORS } from "../../../shared/constants";

const CreateAccountForm: React.FC = ({}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const scrollEnabled = useScrollEnabled();

  const { onSubmit, loading } = useSignup();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleTerms = () => {
    setAgreedToTerms(!agreedToTerms);
  };

  const onPressCreate = useCallback(() => {
    handleSubmit((data) => onSubmit(data, agreedToTerms))();
  }, [handleSubmit, onSubmit, agreedToTerms]);

  const keyboardVerticalOffsetBehavior =
    Platform.OS === "ios" ? "padding" : "height";

  return (
    <KeyboardAvoidingView
      behavior={keyboardVerticalOffsetBehavior}
      style={styles.keyboardAvoidingView}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={scrollEnabled}
        >
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Create account</Text>
              <Text style={styles.subtitle}>
                Complete the sign up to get started
              </Text>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Name</Text>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, value, onBlur } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your name"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      autoCapitalize="words"
                    />
                  )}
                />
                {errors.name && (
                  <Text style={styles.errorText}>{errors.name.message}</Text>
                )}
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Email</Text>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, value, onBlur } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your email"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  )}
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email.message}</Text>
                )}
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.passwordContainer}>
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        style={styles.passwordInput}
                        placeholder="Enter your password"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                      />
                    )}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={togglePasswordVisibility}
                    disabled={loading}
                  >
                    <Ionicons
                      name={showPassword ? "eye" : "eye-off"}
                      size={24}
                      color={COLORS.PRIMARY}
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text style={styles.errorText}>
                    {errors.password.message}
                  </Text>
                )}
              </View>

              <View style={styles.termsContainer}>
                <Pressable style={styles.checkbox} onPress={handleToggleTerms}>
                  {agreedToTerms && (
                    <View style={styles.checkedBox}>
                      <Ionicons
                        name="checkmark"
                        size={16}
                        color={COLORS.WHITE}
                      />
                    </View>
                  )}
                </Pressable>

                <View style={styles.termsTextContainer}>
                  <Text>By signing up, you agree to the </Text>
                  <LinkText text="Terms of Service" />
                  <LinkText text="and Privacy Policy" />
                </View>
              </View>
            </View>

            <View style={styles.bottomContainer}>
              <View style={styles.loginRow}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <LinkText text="Sign in" />
              </View>
              <MainButton
                title="Create account"
                onPress={onPressCreate}
                style={styles.createButton}
                disabled={loading}
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  formContainer: {
    flex: 1,
    marginTop: 36,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.PRIMARY,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.SECONDARY,
    marginBottom: 32,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: COLORS.SECONDARY,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.WHITE,
    height: 56,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 16,
    marginBottom: 24,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: COLORS.BORDER_LIGHT,
    borderRadius: 4,
    marginRight: 12,
    marginTop: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedBox: {
    width: 16,
    height: 16,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  termsTextContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
  bottomContainer: {
    marginBottom: 32,
  },
  loginText: {
    textAlign: "center",
    marginBottom: 32,
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  createButton: {
    backgroundColor: COLORS.PRIMARY,
  },
});

export default CreateAccountForm;
