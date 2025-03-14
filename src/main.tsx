import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { useAppDispatch, useAppSelector } from './redux/store';
import { actions, selectors } from './redux/rootReducer';

const Main = () => {
  const dispatch = useAppDispatch()
  const { token } = useAppSelector(selectors.selectAuth)

  useEffect(() => {
    dispatch(actions.auth.checkAuthPending());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <AppNavigator isAuthenticated={!!token} />
    </NavigationContainer>
  );
};

export default Main