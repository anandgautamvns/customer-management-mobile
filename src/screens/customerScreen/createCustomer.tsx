import Checkbox from "expo-checkbox";
import { Formik } from "formik";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { ActivityIndicator, Button, MD2Colors } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { SafeAreaView } from "react-native-safe-area-context";
import { createCustomerAction, updateCustomerAction } from "../../dataService/customerApi";
import { displayErrorMessage } from "../../dataService/error";
import { Gender } from "../../redux-toolkit/customer/enum";
import { CustomerEntity } from "../../redux-toolkit/customer/type";
import { actions, selectors } from "../../redux-toolkit/rootReducer";
import { useAppDispatch, useAppSelector } from "../../redux-toolkit/store";
import { defaultCustomerEntity } from "./constant";

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
  setRefresh: (refresh: boolean) => void;
}

const CreateCustomer: React.FC<Props> = (props) => {
  const { visible, setVisible, isEdit, setIsEdit, setRefresh } = props;
  const dispatch = useAppDispatch();
  const { loading, error, data, customerInfo } = useAppSelector(
    selectors.selectCustomer
  );
  const [formItem, setFormItem] = useState<
    Omit<CustomerEntity, "id" | "created_at" | "modified_at">
  >(defaultCustomerEntity);

  useEffect(() => {
    if (!_.isNil(customerInfo)) {
      setFormItem((pre) => ({
        ...pre,
        first_name: customerInfo.first_name ?? "",
        last_name: customerInfo.last_name ?? "",
        // dob: customerInfo.dob ?? '2025-03-20',
        dob: "2025-03-20",
        phone_number: customerInfo.phone_number ?? "",
        age: customerInfo.age ?? 0,
        email: customerInfo.email ?? "",
        gender: customerInfo.gender ?? Gender.MALE,
        is_employee: customerInfo.is_employee ?? false,
      }));
    }
  }, [loading, customerInfo]);

  const handleDismiss = () => {
    setVisible(false);
    setIsEdit(false);
  };

  const handleSave = async (
    values: Omit<CustomerEntity, "id" | "created_at" | "modified_at">
  ) => {
    if (isEdit) {
      if (!_.isNil(customerInfo)) {
        const payload: Omit<CustomerEntity, "created_at" | "modified_at"> = {
          ...formItem,
          ...values,
          id: customerInfo.id,
        };
        dispatch(updateCustomerAction(payload))
          .then(() => {
           setIsEdit(false);
           setVisible(false);
           setRefresh(true);
          })
          .catch((error) => {
            console.log(error);
            setIsEdit(false);
            setVisible(false);
            setRefresh(true);
          });
      }
    } else {
      const payload: Omit<CustomerEntity, "id" | "created_at" | "modified_at"> =
        {
          ...formItem,
          ...values,
        };

      dispatch(createCustomerAction(payload))
        .then(() => {
          setIsEdit(false);
          setVisible(false);
          setRefresh(true);
        })
        .catch((err) => {
          console.log(err);
          setIsEdit(false);
          setVisible(false);
          setRefresh(true);
        });
    }
  };
  console.log("selected", { loading, error, data, customerInfo });
  return (
    <SafeAreaView style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setVisible(false);
        }}
        onDismiss={() => setVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>{`${
              isEdit ? "Update" : "Create"
            } Customer`}</Text>
            <Text style={styles.displayErrorText}>
              {error ? displayErrorMessage(error) : ""}
            </Text>

            {loading ? (
              <View style={styles.container}>
                <ActivityIndicator
                  animating={true}
                  size="large"
                  color={MD2Colors.red800}
                />
              </View>
            ) : (
              <Formik
                initialValues={formItem}
                onSubmit={(values) => handleSave(values)}
                validate={(values) => {
                  const formValue = {
                    ...values,
                    phone_number: `${+91}${values.phone_number}`,
                  };
                  setFormItem(formValue);
                  const errors = {} as CustomerEntity;
                  if (!values.first_name) {
                    errors.first_name = "First Name is required";
                  }
                  if (!values.last_name) {
                    errors.last_name = "Last Name is required";
                  }
                  if (!values.phone_number) {
                    errors.phone_number = "Phone Number is required";
                  }

                  if (!values.email) {
                    errors.email = "Email is required";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Invalid email address";
                  }
                  return errors;
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <View style={styles.containerForm}>
                    <TextInput
                      placeholder="First Name"
                      style={styles.input}
                      value={formItem.first_name}
                      onBlur={handleBlur("first_name")}
                      onChangeText={handleChange("first_name")}
                      autoCapitalize="none"
                    />
                    {errors.first_name && touched.first_name && (
                      <Text style={styles.errorText}>{errors.first_name}</Text>
                    )}

                    <TextInput
                      placeholder="Last Name"
                      style={styles.input}
                      value={formItem.last_name}
                      onBlur={handleBlur("last_name")}
                      onChangeText={handleChange("last_name")}
                      autoCapitalize="none"
                    />
                    {errors.last_name && touched.last_name && (
                      <Text style={styles.errorText}>{errors.last_name}</Text>
                    )}

                    <TextInput
                      placeholder="Email"
                      style={styles.input}
                      value={formItem.email}
                      onBlur={handleBlur("email")}
                      onChangeText={handleChange("email")}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                    {errors.email && touched.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}

                    <TextInput
                      placeholder="Phone Number"
                      style={styles.input}
                      onBlur={handleBlur("phone_number")}
                      onChangeText={handleChange("phone_number")}
                      value={formItem.phone_number}
                      keyboardType="numeric"
                    />
                    {errors.phone_number && touched.phone_number && (
                      <Text style={styles.errorText}>
                        {errors.phone_number}
                      </Text>
                    )}
                    <View style={styles.sectionSelect}>
                      <RNPickerSelect
                        items={Object.entries(Gender).map(([key, value]) => ({
                          label: key,
                          value: value,
                        }))}
                        onValueChange={handleChange("gender")}
                        value={formItem.gender}
                        placeholder={{
                          label: "Select an option...",
                          value: null,
                        }}
                        style={pickerSelectStyles}
                      />
                    </View>
                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>Is Employee</Text>
                      <View style={styles.checkboxContainer}>
                        <Checkbox
                          value={formItem.is_employee}
                          onValueChange={(value) =>
                            setFormItem((pre) => ({
                              ...pre,
                              is_employee: value,
                            }))
                          }
                          color={formItem.is_employee ? "#4630EB" : undefined}
                        />
                      </View>
                    </View>

                    {loading ? (
                      <ActivityIndicator
                        animating={true}
                        color={MD2Colors.red800}
                      />
                    ) : (
                      <Button onPress={() => handleSubmit()}>Save</Button>
                    )}
                  </View>
                )}
              </Formik>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  sectionSelect: {
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  sectionTitle: {
    fontSize: 16,
    marginRight: 20,
  },
  infoText: {
    marginTop: 10,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  container: { flex: 1, justifyContent: "center", padding: 10 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  displayErrorText: {
    color: "red",
    marginBottom: 10,
    padding: 16,
    textAlign: "center",
  },
  containerForm: {
    padding: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  // button: { marginTop: 15, marginBottom: 15 },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    marginTop: 10,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    marginTop: 10,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 10,
  },
});

export default CreateCustomer;
