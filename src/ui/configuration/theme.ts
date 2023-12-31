import {createTheme} from '@shopify/restyle';

const palette = {
  white: '#FFFFFF',
  black: '#121212',

  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',
};

export const theme = createTheme({
  colors: {
    screenBackground: '#181818',
    cardPrimaryBackground: palette.purpleLight,
    titleColor: palette.black,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    xm: 0,
    sm: 400,
    md: 678,
    l: 1024,
  },
  textVariants: {
    title: {
      fontFamily: 'Inter-Bold',
      fontSize: 40,
    },
    body: {
      fontFamily: 'Inter-Regular',
    },
  },
});

export type Theme = typeof theme;

// Additional themes
export let darkTheme: Theme;
darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    screenBackground: palette.black,
    cardPrimaryBackground: palette.purpleLight,
  },
};
