import { StatusBar } from 'expo-status-bar';
import React, { lazy, Suspense } from 'react';
import { Text } from "react-native";
import { Provider } from 'react-redux';
import store from "./src/redux-toolkit/store";

const Main = lazy(() => import('../customer-management-mobile/src/main'))

export default function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<Text>Loading...</Text>}>
        <StatusBar />
        <Main />
      </Suspense>
    </Provider>
  );
}
