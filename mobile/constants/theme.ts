/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#7AAFD7';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    backgroundNavBar: '#AFCFE7',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    backgroundNavBar: '#314656',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** Asegúrate de que el nombre coincida exactamente con el nombre del archivo instalado */
    sans: 'Montserrat-Regular',
    serif: 'Montserrat-SemiBold', // Montserrat no es serif, pero aplicamos una variante para mantener la jerarquía
    rounded: 'Montserrat-Medium',
    mono: 'Montserrat-Light',
  },
  default: {
    /** En Android se usa el nombre del archivo sin extensión */
    sans: 'Montserrat-Regular',
    serif: 'Montserrat-SemiBold',
    rounded: 'Montserrat-Medium',
    mono: 'Montserrat-Light',
  },
  web: {
    /** En Web añadimos fallbacks por si la fuente no carga */
    sans: "'Montserrat', system-ui, -apple-system, sans-serif",
    serif: "'Montserrat', Georgia, serif",
    rounded: "'Montserrat', sans-serif",
    mono: "'Montserrat', monospace",
  },
});
