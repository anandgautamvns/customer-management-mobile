import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from "react-native"

import { displayErrorMessage } from '../../dataService/error';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootBottomTabParamList } from '../../navigation/AppNavigator';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { actions, selectors } from '../../redux/rootReducer';
import { CustomerRequest } from '../../redux/customer/type';

type RegistrationScreenNavigationProp = BottomTabNavigationProp<RootBottomTabParamList, 'Customer'>;

type Props = {
  navigation: RegistrationScreenNavigationProp;
};

const CustomerScreen: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const { loading, error, data, customerInfo } = useAppSelector(selectors.selectCustomer);

  useEffect(() => {
    const payload: CustomerRequest = {
      search: '',
      ordering: '',
      page: 1,
      page_size: 100,
    }
    dispatch(actions.customer.getCustomerPending(payload))
  }, [])

  return (
    <View>
      <Text> Profile</Text>
    </View>
  )

}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  detailsContainer: { flex: 1, justifyContent: 'center', padding: 20 },
  displayErrorText: {
    color: 'red',
    marginBottom: 10,
    padding: 16,
    textAlign: 'center'
  },
  containerForm: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: { marginTop: 5, marginBottom: 5 },
});

export default CustomerScreen;