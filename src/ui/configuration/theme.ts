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

const theme = createTheme({
  colors: {
    screenBackground: palette.white,
    cardPrimaryBackground: palette.purpleLight,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    smallPhone: 0,
    phone: 475,
  },
  textVariants: {
    title: {
      fontFamily: 'Inter-Bold',
      fontSize: 40,
      color: palette.black,
    },
    body: {
      fontFamily: 'Inter-Regular',
      color: palette.black,
    },
  },
});

export type Theme = typeof theme;

// Adittional themes
export const darkTheme: Theme = {
  ...theme,
  colors: {
    screenBackground: palette.black,
    cardPrimaryBackground: palette.purpleLight,
  },
  textVariants: {
    ...theme.textVariants,
    title: {
      ...theme.textVariants.title,
      color: palette.greenDark,
    },
  },
};

export default theme;
