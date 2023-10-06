import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {NavigationScreens} from '../../configuration/navigation';
import {Box, FormField, Text} from '../../components';
import {TextInput} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../../configuration/theme';
import {Formik, Field} from 'formik';
import {object, string} from 'yup';

type RegisterProps = {
  navigation: NavigationProp<NavigationScreens>;
};

const validationSchema = object().shape({
  username: string().min(3, 'Too short!!!').required('Required xD'),
  password: string()
    .min(8, 'Pass too short')
    .max(200, 'Pass too long')
    .required('Required xD'),
  email: string().email('Invalid email').required('Email is required'),
});

const Register: React.FC<RegisterProps> = ({navigation}) => {
  const theme = useTheme<Theme>();

  const navigateToLoginScreen = () => {
    const canGoBack: boolean = navigation.canGoBack();
    if (canGoBack) {
      navigation.goBack();
    }
  };

  return (
    <Box
      flex={1}
      justifyContent={'center'}
      alignItems={'center'}
      backgroundColor={'screenBackground'}>
      <Formik
        initialValues={{username: '', email: '', password: ''}}
        validationSchema={validationSchema}
        onSubmit={values => console.log(values)}>
        {({values, handleChange, handleBlur, isSubmitting}) => (
          <Box>
            <Field
              name={'email'}
              placeholder={'placeholder'}
              component={FormField}
            />
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry={true}
            />
            {isSubmitting ? <Text>Hello world</Text> : null}
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
