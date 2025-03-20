import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CustomerScreen from '../screens/customerScreen';
import { useAppDispatch } from '../redux/store';
import { actions } from '../redux/rootReducer';
import { useNavigation } from '@react-navigation/native';
import { Button, IconButton, MD3Colors, Checkbox, PaperProvider, MD2Colors } from 'react-native-paper';

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
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const handleLogout = async () => {
    await dispatch(actions.auth.logoutPending())
    navigation.navigate('Login')
  }
  return (
    <>
      {isAuthenticated ? (
        <BottomTab.Navigator>
          <BottomTab.Screen name="Profile" component={ProfileScreen} options={{
            title: 'Profile', headerRight: () => (
              <Button icon="account" mode="contained" onPress={handleLogout}>
                Logout
              </Button>
            ),
          }} />
          <BottomTab.Screen name="Customer" component={CustomerScreen} options={{
            title: 'Customer', headerRight: () => (
              <Button icon="account" mode="contained" onPress={handleLogout}>
                Logout
              </Button>
            ),
          }} />
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