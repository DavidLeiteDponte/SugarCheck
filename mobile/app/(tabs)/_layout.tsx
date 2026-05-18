import { Tabs } from 'expo-router';
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        // --- AÑADE ESTO PARA CAMBIAR EL COLOR ---
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].backgroundNavBar, // Fondo de la barra
          borderTopWidth: 0, // Elimina la línea superior para un look más moderno
          elevation: 0,      // Elimina la sombra en Android
          height: 60,        // Un poco más de altura (opcional)
          paddingBottom: 8,  // Ajuste de iconos
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="historial"
        options={{
          title: 'Historial',
          tabBarIcon: ({ color }) => <FontAwesome size={26} name="history" color={color} />,
        }}
      />
      <Tabs.Screen
        name="agent"
        options={{
          title: 'Agente',
          tabBarIcon: ({ color }) => <FontAwesome size={26} name="android" color={color} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <FontAwesome size={26} name="user-circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'login',
          tabBarIcon: ({ color }) => <FontAwesome size={26} name="lock" color={color} />,
        }}
      />
    </Tabs>
  );
}
