import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import AppNavigator from "./navigation/AppNavigator";
import { actions, selectors } from "./redux-toolkit/rootReducer";
import { useAppDispatch, useAppSelector } from "./redux-toolkit/store";

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(selectors.selectAuth);
  // const navigation = useNavigation<RegistrationScreenNavigationProp>()

  useEffect(() => {
    dispatch(actions.auth.checkAuthPending());
  }, [dispatch]);

  const isSessionExpired = async () => {
    try {
      const expiryTime = await AsyncStorage.getItem("expiryTime");
      if (!expiryTime) return true;
      return new Date().getTime() > parseInt(expiryTime, 10);
    } catch (error) {
      console.error("Error checking session expiry:", error);
      return true;
    }
  };

  const checkSession = async () => {
    const expired = await isSessionExpired();
    if (expired) {
      // navigation.navigate('Login')
      await AsyncStorage.removeItem("token");
    }
  };

  checkSession();

  return (
    <NavigationContainer>
      <AppNavigator isAuthenticated={!!token} />
    </NavigationContainer>
  );
};

export default Main;
