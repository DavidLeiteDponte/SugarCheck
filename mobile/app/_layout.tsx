import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useEffect } from 'react';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Simula carga de fuentes o autenticación (como hace Meta)
    prepareApp();
  }, []);

  const prepareApp = async () => {
    try {
      // Aquí puedes cargar tus fuentes de FontAwesome o datos de NestJS
      await new Promise(resolve => setTimeout(resolve, 2000)); 
    } catch (e) {
      console.warn(e);
    } finally {
      // Oculta el splash con una transición suave
      await SplashScreen.hideAsync();
    }
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
