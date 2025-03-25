import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import {
  ActivityIndicator,
  Button,
  Checkbox,
  IconButton,
  MD2Colors,
  MD3Colors,
  Searchbar,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ScrollView } from "react-native-gesture-handler";
import CustomCard from "../../components/Card";
import ListComponent from "../../components/ListComponent";
import {
  deleteAllCustomerAction,
  deleteCustomerAction,
  getCustomerByIdAction,
  getCustomersAction,
} from "../../dataService/customerApi";
import {
  CustomerEntity,
  CustomerRequest,
} from "../../redux-toolkit/customer/type";
import { selectors } from "../../redux-toolkit/rootReducer";
import { useAppDispatch, useAppSelector } from "../../redux-toolkit/store";
import { defaultCustomerRequest } from "./constant";
import CreateCustomer from "./createCustomer";

interface Props {}

const CustomerScreen: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { loading, error, data, customerInfo } = useAppSelector(
    selectors.selectCustomer
  );

  const [visible, setVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const [customerPayload, setCustomerPayload] = useState<CustomerRequest>(
    defaultCustomerRequest
  );
  const customerData = data.results;
  const customerCount = data.count;
  const fetchCustomer = () => {
    const payload: CustomerRequest = {
      ...customerPayload,
    };
    dispatch(getCustomersAction(payload));
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  useEffect(() => {
    if (refresh) {
      fetchCustomer();
    }
  }, [refresh]);

  useEffect(() => {
    fetchCustomer();
  }, [customerPayload.search]);

  const handleSearch = (value: string) => {
    setCustomerPayload((pre) => ({ ...pre, search: value }));
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 100), []);

  const handleDelete = (item: CustomerEntity) => {
    dispatch(deleteCustomerAction({ id: item.id }))
      .then(() => {
        fetchCustomer();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderContent = (item: CustomerEntity) => (
    <CustomCard
      title={
        <Text
          style={styles.heading}
        >{`${item.first_name} ${item.last_name}`}</Text>
      }
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
              onPress={() => {
                dispatch(getCustomerByIdAction({ id: item.id }))
                  .then(() => {
                    setVisible(true);
                    setIsEdit(true);
                  })
                  .catch((error) => {
                    setVisible(false);
                    setIsEdit(false);
                  });
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
            {Platform.OS === "android" ? (
              <Checkbox.Android
                status={item.is_employee ? "checked" : "unchecked"}
              />
            ) : (
              <Checkbox.IOS
                status={item.is_employee ? "checked" : "unchecked"}
              />
            )}
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
          <ActivityIndicator
            animating={true}
            size="large"
            color={MD2Colors.red800}
          />
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
            <Button
              style={styles.creatButton}
              icon="account"
              mode="contained"
              onPress={() => {
                setVisible(true);
                setIsEdit(false);
              }}
            >
              Create
            </Button>
            <Button
              style={styles.creatButton}
              icon="account"
              mode="contained"
              onPress={async () => {
                dispatch(deleteAllCustomerAction())
                  .then(() => {
                    fetchCustomer();
                  })
                  .catch((error) => {
                    fetchCustomer();
                  });
              }}
            >
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
      <CreateCustomer
        visible={visible}
        setVisible={setVisible}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        setRefresh={setRefresh}
      />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    margin: 10,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  searchBar: {
    width: "60%",
  },
  creatButton: {
    width: "20%",
  },
  contentContainer: {
    padding: 10,
  },
  heading: {
    textAlign: "center",
  },
  contentWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  titleText: {
    fontWeight: "500",
  },
  button: { marginTop: 5, marginBottom: 5 },
});

export default CustomerScreen;
