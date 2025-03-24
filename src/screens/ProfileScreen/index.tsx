import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Formik } from "formik";
import { Button } from "react-native-paper";
import CustomCard from "../../components/Card";
import {
  getProfileAction,
  updateProfileAction,
} from "../../dataService/authApi";
import { displayErrorMessage } from "../../dataService/error";
import { selectors } from "../../redux-toolkit/rootReducer";
import { useAppDispatch, useAppSelector } from "../../redux-toolkit/store";
import { FormItem } from "../RegistrationScreen/type";

interface Props {}
const ProfileScreen: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { loading, error, user } = useAppSelector(selectors.selectAuth);
  const [isEdit, setEdit] = useState<boolean>(false);
  const [formItem, setFormItem] = useState<
    Pick<FormItem, "username" | "email" | "first_name" | "last_name">
  >({
    username: user?.username ?? "",
    email: user?.email ?? "",
    first_name: user?.first_name ?? "",
    last_name: user?.last_name ?? "",
  });

  useEffect(() => {
    dispatch(getProfileAction());
  }, []);

  useEffect(() => {
    if (user) {
      setFormItem((pre) => ({
        ...pre,
        username: user?.username ?? "",
        email: user?.email ?? "",
        first_name: user?.first_name ?? "",
        last_name: user?.last_name ?? "",
      }));
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        {isEdit ? (
          <View>
            <Text style={styles.displayErrorText}>
              {error ? displayErrorMessage(error) : ""}
            </Text>
            <Formik
              initialValues={{
                username: formItem.username,
                email: formItem.email,
                first_name: formItem.first_name,
                last_name: formItem.last_name,
              }}
              onSubmit={async (values) => {
                dispatch(updateProfileAction(values))
                  .then(async (response) => {
                    await dispatch(getProfileAction());
                    setEdit(false);
                  })
                  .catch((error) => {
                    console.log("error", error);
                  });
              }}
              validate={(values) => {
                setFormItem(values);
                const errors = {} as Pick<
                  FormItem,
                  "username" | "email" | "first_name" | "last_name"
                >;
                if (!values.username) {
                  errors.username = "Username is required";
                }
                if (!values.email) {
                  errors.email = "Email is required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
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
                    placeholder="Username"
                    style={styles.input}
                    value={values.username}
                    onBlur={handleBlur("username")}
                    onChangeText={handleChange("username")}
                    autoCapitalize="none"
                  />
                  {errors.username && touched.username && (
                    <Text style={styles.errorText}>{errors.username}</Text>
                  )}

                  <TextInput
                    placeholder="Email"
                    style={styles.input}
                    value={values.email}
                    onBlur={handleBlur("email")}
                    onChangeText={handleChange("email")}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}

                  <TextInput
                    placeholder="First Name"
                    style={styles.input}
                    value={values.first_name}
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
                    value={values.last_name}
                    onBlur={handleBlur("last_name")}
                    onChangeText={handleChange("last_name")}
                    autoCapitalize="none"
                  />
                  {errors.last_name && touched.last_name && (
                    <Text style={styles.errorText}>{errors.last_name}</Text>
                  )}

                  {loading ? (
                    <ActivityIndicator />
                  ) : (
                    <Button onPress={() => handleSubmit()}>
                      Update Profile
                    </Button>
                  )}
                </View>
              )}
            </Formik>
          </View>
        ) : (
          <>
            <CustomCard
              title={<Text style={styles.heading}>{formItem.username}</Text>}
              content={
                <View style={styles.contentContainer}>
                  <View style={styles.contentWrapper}>
                    <Text style={styles.titleText}>Username:</Text>
                    <Text>{formItem.username}</Text>
                    <Text style={styles.titleText}>Email:</Text>
                    <Text>{formItem.email}</Text>
                  </View>
                  <View style={styles.contentWrapper}>
                    <Text style={styles.titleText}>First Name:</Text>
                    <Text>{formItem.first_name}</Text>
                    <Text style={styles.titleText}>Last Name:</Text>
                    <Text>{formItem.last_name}</Text>
                  </View>
                  <View style={styles.contentWrapper}>
                    <Button
                      icon="account"
                      mode="contained"
                      onPress={() => setEdit(true)}
                    >
                      Update Profile
                    </Button>
                  </View>
                </View>
              }
              showFooter={false}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center', width: '80%' },
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
  creatButton: {
    width: '20%'
  },
});

export default ProfileScreen;