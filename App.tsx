import 'reflect-metadata';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationScreens} from '@ui/configuration/navigation';
import {Login, Register, Camera, Profile} from '@ui/screens';
import theme from '@ui/configuration/theme';
import {ThemeProvider} from '@shopify/restyle';

const Stack = createNativeStackNavigator<NavigationScreens>();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'profile'}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name={'register'} component={Register} />
          <Stack.Screen name={'camera'} component={Camera} />
          <Stack.Screen name={'profile'} component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
