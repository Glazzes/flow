import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationScreens} from './src/presentation/configuration/navigation';
import {Login, Register, Camera} from './src/presentation/screens';
import theme from './src/presentation/configuration/theme';
import {ThemeProvider} from '@shopify/restyle';

const Stack = createNativeStackNavigator<NavigationScreens>();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'camera'}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name={'register'} component={Register} />
          <Stack.Screen name={'camera'} component={Camera} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
