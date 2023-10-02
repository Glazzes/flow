import React from 'react';
import {Box, Text} from '../../components';
import {NavigationProp} from '@react-navigation/native';
import {NavigationScreens} from '../../configuration/navigation';
import {Pressable} from 'react-native';

type LoginProps = {
  navigation: NavigationProp<NavigationScreens>;
};

const Login: React.FC<LoginProps> = ({navigation}) => {
  const navigateToAccountRegistration = () => {
    navigation.navigate('accountRegistration');
  };

  return (
    <Box
      flex={1}
      backgroundColor={'screenBackground'}
      justifyContent={'center'}
      alignItems={'center'}>
      <Text variant={'title'}>Welcome to login!!!</Text>
      <Pressable
        accessibilityLabel={
          'Iniciar sesion (abre una ventana en el navegador predeterminado)'
        }>
        <Box
          height={44}
          width={200}
          backgroundColor={'cardPrimaryBackground'}
        />
      </Pressable>
    </Box>
  );
};

export default Login;
