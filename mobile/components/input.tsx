import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme'; // Asegúrate de usar el hook correcto para móvil/web
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const TextInputSystem = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const [text, onChangeText] = React.useState('Usuario');

  // Definimos los colores dinámicos basados en el tema
  const dynamicStyles = {
    backgroundColor: Colors[colorScheme].background, // O la propiedad que tengas en tu constants/theme
    color: Colors[colorScheme].text,
    borderColor: Colors[colorScheme].tint,
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <TextInput
          style={[styles.input, dynamicStyles]} // Combinamos estilos fijos con dinámicos
          onChangeText={onChangeText}
          value={text}
          placeholderTextColor={colorScheme === 'dark' ? '#ccc' : '#666'}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    margin: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8, // Un toque más moderno
    fontSize: 20
  },
});

export default TextInputSystem;