import {
  Lato_400Regular,
  Lato_700Bold,
  useFonts,
} from "@expo-google-fonts/lato";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";
import { AuthStackParamList, RootStackParamList } from "./src/@types/navigation";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import { BudgetDetails } from "./src/screens/BudgetDetails";
import { BudgetForm } from "./src/screens/BudgetForm";
import { Home } from "./src/screens/Home";
import { SignIn } from "./src/screens/SignIn";
import { SignUp } from "./src/screens/SignUp";

const queryClient = new QueryClient();

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<RootStackParamList>();

SplashScreen.preventAutoHideAsync();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
}

function AppNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="BudgetForm" component={BudgetForm} />
      <AppStack.Screen name="BudgetDetails" component={BudgetDetails} />
    </AppStack.Navigator>
  );
}

function Routes() {
  const { user, isLoadingUser } = useAuth();

  if (isLoadingUser) return null;

  return user ? <AppNavigator /> : <AuthNavigator />;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <AuthProvider>
            <NavigationContainer>
              <Routes />
            </NavigationContainer>
          </AuthProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
