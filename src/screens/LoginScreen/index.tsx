import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { displayErrorMessage } from '../../dataService/error';
import { actions, selectors } from '../../redux/rootReducer';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { FormItem } from '../RegistrationScreen/type';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = (props) => {
  const { navigation } = props;
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector(selectors.selectAuth)
  const [formItem, setFormItem] = useState<Pick<FormItem, 'username' | 'password'>>({ username: '', password: '' })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {error && <Text style={styles.displayErrorText}>{displayErrorMessage(error) ?? ''}</Text>}
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values) => {
          await dispatch(actions.auth.loginPending(values));
          navigation.navigate('Profile')
        }}
        validate={(values) => {
          setFormItem(values)
          const errors = {} as Pick<FormItem, 'username' | 'password'>;
          if (!values.username) {
            errors.username = 'Username is required';
          }
          if (!values.password) {
            errors.password = 'Password is required';
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

            {loading ? <ActivityIndicator /> : <Button title="Login" onPress={() => handleSubmit()} />}
            <View style={styles.button}>
              <Button title="Don't have an account? Go to Registration" onPress={() => navigation.navigate('Registration')} />
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

export default LoginScreen;