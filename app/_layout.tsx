import React, {useState} from 'react';
import {ThemeProvider} from '@shopify/restyle';
import {darkTheme, theme} from '@ui/configuration/theme';
import {Stack} from 'expo-router';

const _layout: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const currentTheme = isDarkTheme ? darkTheme : theme;

  const toggleTheme = () => {
    setIsDarkTheme(isDark => !isDark);
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name={'index'} />
      </Stack>
    </ThemeProvider>
  );
};

export default _layout;
