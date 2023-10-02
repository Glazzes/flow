import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationScreens} from './src/ui/configuration/navigation';
import {Login} from './src/ui/screens';
import theme from './src/ui/configuration/theme';
import {ThemeProvider} from '@shopify/restyle';

const Stack = createNativeStackNavigator<NavigationScreens>();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
