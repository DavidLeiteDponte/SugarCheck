import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Card({ children, style }: CardProps) {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <View 
      style={[
        styles.card, 
        { 
          backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : '#FFFFFF',
          // Sombra dinámica según el tema
          shadowColor: colorScheme === 'dark' ? '#000' : '#000',
        },
        styles.elevated, 
        style
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    marginVertical: 8,
  },
  elevated: {
    // Sombra para Android
    elevation: 4,
    // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
});