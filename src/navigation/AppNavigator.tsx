import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

type AppNavigatorProps = {
  isAuthenticated: boolean;
};

const AppNavigator: React.FC<AppNavigatorProps> = ({ isAuthenticated }) => {
  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
      ) : (
        <>
          <Stack.Screen name="Registration" component={RegistrationScreen} options={{ title: 'Register' }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;