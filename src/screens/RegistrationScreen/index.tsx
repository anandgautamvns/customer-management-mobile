import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';

import { Formik } from 'formik';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { registrationPending } from '../../redux/auth/reducer';
import { actions, selectors } from '../../redux/rootReducer';
import { RootStackParamList } from '../../navigation/AppNavigator';

import { FormItem } from './type';
import { displayErrorMessage } from '../../dataService/error';

type RegistrationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Registration'>;

type Props = {
  navigation: RegistrationScreenNavigationProp;
};

const RegistrationScreen: React.FC<Props> = (props) => {
  const { navigation } = props;
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector(selectors.selectAuth)
  const [formItem, setFormItem] = useState<FormItem>({ username: '', email: '', first_name: '', last_name: '', password: '', confirm_password: '' })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      {error && <Text style={styles.displayErrorText}>{displayErrorMessage(error) ?? ''}</Text>}
      <Formik
        initialValues={{ username: '', email: '', first_name: '', last_name: '', password: '', confirm_password: '' }}
        onSubmit={async (values) => {
          await dispatch(actions.auth.registrationPending(values));
          navigation.navigate('Login')
        }}
        validate={(values) => {
          setFormItem(values)
          const errors = {} as FormItem;
          if (!values.username) {
            errors.username = 'Username is required';
          }
          if (!values.email) {
            errors.email = 'Email is required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Password is required';
          }
          if (!values.confirm_password) {
            errors.confirm_password = 'Password is required';
          } else if (values.confirm_password !== values.password) {
            errors.confirm_password = 'Passwords do not match.';
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

            <TextInput
              placeholder="Password"
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TextInput
              placeholder="Confirm password"
              style={styles.input}
              onChangeText={handleChange('confirm_password')}
              onBlur={handleBlur('confirm_password')}
              value={values.confirm_password}
              secureTextEntry
            />
            {errors.confirm_password && touched.confirm_password && (
              <Text style={styles.errorText}>{errors.confirm_password}</Text>
            )}

            {loading ? <ActivityIndicator /> : <Button title="Register" onPress={() => handleSubmit()} />}
            <View style={styles.button}>
              <Button title="Already have an account? Login" onPress={() => navigation.navigate('Login')} />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
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
  button: { marginTop: 15, marginBottom: 15 },
});

export default RegistrationScreen;