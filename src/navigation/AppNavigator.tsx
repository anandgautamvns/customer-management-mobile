import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { memo, useCallback } from "react";
import { Button } from "react-native-paper";
import { logoutAction } from "../dataService/authApi";
import { useAppDispatch } from "../redux-toolkit/store";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import CustomerScreen from "../screens/customerScreen";
import { SCREEN } from "./enum";
import { RootBottomTabParamList, RootStackParamList } from "./type";

const Stack = createStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<RootBottomTabParamList>();

type AppNavigatorProps = {
  isAuthenticated: boolean;
};

const AppNavigator: React.FC<AppNavigatorProps> = ({ isAuthenticated }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();

  const handleLogout = useCallback(async () => {
    dispatch(logoutAction()).then(() => {
      navigation.navigate(SCREEN.PROFILE, {
        screen: SCREEN.LOGIN,
      });
    });
  }, [dispatch, navigation]);

  const renderLogout = () => (
    <Button icon="account" mode="contained" onPress={handleLogout}>
      {SCREEN.LOGOUT}
    </Button>
  );

  const TabNavigation = () => {
    return (
      <BottomTab.Navigator
        initialRouteName={SCREEN.PROFILE}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }: { color: string; size: number }) => {
            const routeName = route.name as keyof RootBottomTabParamList;
            const icons: Record<keyof RootBottomTabParamList, string> = {
              Profile: "face-woman-profile",
              Customer: "card-account-details",
            };
            return (
              <MaterialCommunityIcons
                name={icons[routeName] as any}
                color={color}
                size={size}
              />
            );
          },
        })}
      >
        <BottomTab.Screen
          name={SCREEN.PROFILE}
          component={ProfileScreen}
          options={{
            title: `${SCREEN.PROFILE}`,
            headerRight: renderLogout,
          }}
        />
        <BottomTab.Screen
          name={SCREEN.CUSTOMER}
          component={CustomerScreen}
          options={{
            title: `${SCREEN.CUSTOMER}`,
            // headerRight: renderLogout,
          }}
        />
      </BottomTab.Navigator>
    );
  };

  const RootNavigation = () => {
    return (
      <Stack.Navigator
        initialRouteName={SCREEN.REGISTRATION}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name={SCREEN.REGISTRATION}
          component={RegistrationScreen}
          options={{ title: `${SCREEN.REGISTRATION}` }}
        />
        <Stack.Screen
          name={SCREEN.LOGIN}
          component={LoginScreen}
          options={{ title: `${SCREEN.LOGIN}` }}
        />
        <Stack.Screen
          name={SCREEN.HOME}
          component={isAuthenticated ? TabNavigation : LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  return RootNavigation();
};

export default memo(AppNavigator);
