import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { StackNavigationProp } from "@react-navigation/stack";
import { SCREEN } from "./enum";

export type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
};

export type RootBottomTabParamList = {
  Profile: undefined;
  Customer: undefined;
};

export type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  SCREEN.REGISTRATION | SCREEN.LOGIN
>;

export type TabNavigationProp = BottomTabNavigationProp<
  RootBottomTabParamList,
  SCREEN.PROFILE | SCREEN.CUSTOMER
>;

export type RootNavigationProp = RootStackParamList | RootBottomTabParamList;
export type AppScreenNavigatorProps = ScreenNavigationProp | TabNavigationProp;
