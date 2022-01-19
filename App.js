import React from "react";
import { Button, LogBox, StyleSheet, Text, View } from 'react-native';
import tw from 'tailwind-rn'
import StackNavigator from "./StackNavigator";
LogBox.ignoreAllLogs();
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from "./hooks/useAuth";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider >
      <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}

