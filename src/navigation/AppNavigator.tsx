import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CustomerScreen from '../screens/customerScreen';

export type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
};

export type RootBottomTabParamList = {
  Profile: undefined;
  Customer: undefined
};

const Stack = createStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<RootBottomTabParamList>();

type AppNavigatorProps = {
  isAuthenticated: boolean;
};

const AppNavigator: React.FC<AppNavigatorProps> = ({ isAuthenticated }) => {
  return (
    <>
      {isAuthenticated ? (
        <BottomTab.Navigator>
          <BottomTab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
          <BottomTab.Screen name="Customer" component={CustomerScreen} options={{ title: 'Customer' }} />
        </BottomTab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Registration" component={RegistrationScreen} options={{ title: 'Register' }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        </Stack.Navigator>
      )}
    </>
  );
};

export default AppNavigator;