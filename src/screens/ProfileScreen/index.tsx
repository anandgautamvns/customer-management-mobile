import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';

import { Formik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { actions, selectors } from '../../redux/rootReducer';
import { FormItem } from '../RegistrationScreen/type';
import { displayErrorMessage } from '../../dataService/error';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

type RegistrationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type Props = {
  navigation: RegistrationScreenNavigationProp;
};

const ProfileScreen: React.FC<Props> = (props) => {
  const { navigation } = props
  const dispatch = useAppDispatch()
  const { loading, error, user } = useAppSelector(selectors.selectAuth);
  const [isEdit, setEdit] = useState<boolean>(false)
  const [formItem, setFormItem] = useState<Pick<FormItem, 'username' | 'email' | 'first_name' | 'last_name'>>({
    username: user?.username ?? '',
    email: user?.email ?? '',
    first_name: user?.first_name ?? '',
    last_name: user?.last_name ?? '',
  })

  console.log('profile', { loading, error, user })

  useEffect(() => {
    dispatch(actions.auth.getProfilePending())
  }, [])

  useEffect(() => {
    if (user) {
      setFormItem((pre) => ({
        ...pre,
        username: user?.username ?? '',
        email: user?.email ?? '',
        first_name: user?.first_name ?? '',
        last_name: user?.last_name ?? '',
      }))
    }
  }, [user])

  const handleLogout = async () => {
    await dispatch(actions.auth.logoutPending())
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.detailsContainer}>
        {isEdit ? <View>
          {error && <Text style={styles.displayErrorText}>{displayErrorMessage(error) ?? ''}</Text>}
          <Formik
            initialValues={{ username: formItem.username, email: formItem.email, first_name: formItem.first_name, last_name: formItem.last_name }}
            onSubmit={async (values) => {
              await dispatch(actions.auth.updateProfileRequest(values));
              dispatch(actions.auth.getProfilePending())
              setEdit(false)
            }}
            validate={(values) => {
              setFormItem(values)
              const errors = {} as Pick<FormItem, 'username' | 'email' | 'first_name' | 'last_name'>;
              if (!values.username) {
                errors.username = 'Username is required';
              }
              if (!values.email) {
                errors.email = 'Email is required';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.containerForm}>
                <TextInput
                  placeholder="Username"
                  style={styles.input}
                  value={values.username}
                  onBlur={handleBlur('username')}
                  onChangeText={handleChange('username')}
                  autoCapitalize="none"
                />
                {errors.username && touched.username && (
                  <Text style={styles.errorText}>{errors.username}</Text>
                )}

                <TextInput
                  placeholder="Email"
                  style={styles.input}
                  value={values.email}
                  onBlur={handleBlur('email')}
                  onChangeText={handleChange('email')}
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
                  onBlur={handleBlur('first_name')}
                  onChangeText={handleChange('first_name')}
                  autoCapitalize="none"
                />
                {errors.first_name && touched.first_name && (
                  <Text style={styles.errorText}>{errors.first_name}</Text>
                )}

                <TextInput
                  placeholder="Last Name"
                  style={styles.input}
                  value={values.last_name}
                  onBlur={handleBlur('last_name')}
                  onChangeText={handleChange('last_name')}
                  autoCapitalize="none"
                />
                {errors.last_name && touched.last_name && (
                  <Text style={styles.errorText}>{errors.last_name}</Text>
                )}

                {loading ? <ActivityIndicator /> : <Button title="Update Profile" onPress={() => handleSubmit()} />}
              </View>
            )}
          </Formik>
        </View> : <View>
          <View>
            <Text>Username:</Text>
            <Text>{formItem.username}</Text>
          </View>
          <View>
            <Text>Email:</Text>
            <Text>{formItem.email}</Text>
          </View>
          <View>
            <Text>First Name:</Text>
            <Text>{formItem.first_name}</Text>
          </View>
          <View>
            <Text>Last Name:</Text>
            <Text>{formItem.last_name}</Text>
          </View>
          <View style={styles.button}>
            <Button title="Update Profile" onPress={() => setEdit(true)} />
          </View>
        </View>}
      </View>
      <View style={styles.button}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

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

export default ProfileScreen;