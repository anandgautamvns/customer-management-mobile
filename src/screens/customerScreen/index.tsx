import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { View, Text, StyleSheet, Platform } from "react-native"
import { debounce } from 'lodash';

import { ActivityIndicator, Searchbar } from 'react-native-paper';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Button, IconButton, MD3Colors, Checkbox, PaperProvider, MD2Colors } from 'react-native-paper';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootBottomTabParamList } from '../../navigation/AppNavigator';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { actions, selectors } from '../../redux/rootReducer';
import { CustomerEntity, CustomerRequest } from '../../redux/customer/type';
import { ScrollView } from 'react-native-gesture-handler';
import { defaultCustomerRequest } from './constant';
import ListComponent from '../../components/ListComponent';
import CustomCard from '../../components/Card';
import CreateCustomer from './createCustomer';

type RegistrationScreenNavigationProp = BottomTabNavigationProp<RootBottomTabParamList, 'Customer'>;

type Props = {
  navigation: RegistrationScreenNavigationProp;
};

const CustomerScreen: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const { loading, error, data, customerInfo } = useAppSelector(selectors.selectCustomer);

  const [visible, setVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false)

  const [customerPayload, setCustomerPayload] = useState<CustomerRequest>(defaultCustomerRequest)
  const customerData = data.results;
  const customerCount = data.count;
  const fetchCustomer = () => {
    const payload: CustomerRequest = {
      ...customerPayload,
    }
    dispatch(actions.customer.getCustomerPending(payload))
  }

  useEffect(() => {
    fetchCustomer()
  }, [])

  useEffect(() => {
    if (refresh) {
      fetchCustomer()
    }
  }, [refresh])

  useEffect(() => {
    fetchCustomer()
  }, [customerPayload.search])

  const handleSearch = (value: string) => {
    setCustomerPayload((pre) => ({ ...pre, search: value }))
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 100), []);

  const handleDelete = async (item: CustomerEntity) => {
    await dispatch(actions.customer.deleteCustomerPending({ id: item.id }));
    setTimeout(() => {
      fetchCustomer()
    }, 500);
  }

  const renderContent = (item: CustomerEntity) => (
    <CustomCard
      title={<Text style={styles.heading}>{`${item.first_name} ${item.last_name}`}</Text>}
      content={
        <View style={styles.contentContainer}>
          <View style={styles.contentWrapper}>
            <IconButton
              icon="delete-circle"
              iconColor={MD3Colors.error50}
              size={20}
              onPress={() => handleDelete(item)}
            />
            <IconButton
              icon="eraser"
              iconColor={MD3Colors.primary50}
              size={20}
              onPress={async () => {
                await dispatch(actions.customer.getCustomerByIdPending({ id: item.id }))
                setVisible(true);
                setIsEdit(true);
              }}
            />
          </View>
          <View style={styles.contentWrapper}>
            <Text style={styles.titleText}>Email:</Text>
            <Text>{item.email}</Text>
            <Text style={styles.titleText}>Phone Number:</Text>
            <Text>{item.phone_number}</Text>
          </View>
          <View style={styles.contentWrapper}>
            <Text style={styles.titleText}>Age:</Text>
            <Text>{item.age}</Text>
            <Text style={styles.titleText}>Date of Birth:</Text>
            <Text>{item.dob}</Text>
          </View>
          <View style={styles.contentWrapper}>
            <Text style={styles.titleText}>Age:</Text>
            <Text>{item.gender}</Text>
            <Text style={styles.titleText}>Employee:</Text>
            {Platform.OS === 'android'
              ? <Checkbox.Android status={item.is_employee ? 'checked' : 'unchecked'} />
              : <Checkbox.IOS status={item.is_employee ? 'checked' : 'unchecked'} />
            }
          </View>
        </View>
      }
      showFooter={false}
    />
  );

  return (
    <SafeAreaProvider>
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator animating={true} size='large' color={MD2Colors.red800} />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.container}>
            <Searchbar
              style={styles.searchBar}
              placeholder="Search"
              onChangeText={debouncedSearch}
              value={customerPayload.search}
            />
            <Button style={styles.creatButton} icon="account" mode="contained" onPress={() => {
              setVisible(true);
              setIsEdit(false);
            }}>
              Create
            </Button>
            <Button style={styles.creatButton} icon="account" mode="contained" onPress={async () => {
              await dispatch(actions.customer.deleteAllCustomerPending())
              setTimeout(() => {
                fetchCustomer()
              }, 500);
            }}>
              DeleteAll
            </Button>
          </View>
          <View style={styles.container}>
            <ListComponent
              data={customerData}
              renderItem={({ item }) => renderContent(item)}
            />
          </View>
        </ScrollView>
      )}
      <CreateCustomer visible={visible} setVisible={setVisible} isEdit={isEdit} setIsEdit={setIsEdit} setRefresh={setRefresh} />
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  containerWrapper: {
    margin: 10
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  searchBar: {
    width: '60%'
  },
  creatButton: {
    width: '20%'
  },
  contentContainer: {
    padding: 10,
  },
  heading: {
    textAlign: 'center'
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  titleText: {
    fontWeight: '500',
  },
  button: { marginTop: 5, marginBottom: 5 },
});

export default CustomerScreen;