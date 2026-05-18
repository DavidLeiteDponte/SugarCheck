import { StyleSheet, View } from "react-native"; // Cambiamos Host/Card por View
import { ThemedView } from "@/components/themed-view";
import TextInputSystem from "@/components/input";
import { H1 } from "@/components/ui/h1";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";

export default function LoginScreen() {
  const colorScheme = useColorScheme() ?? "light";
  return (
    <ThemedView style={styles.mainContainer}>
      {/* Sustituimos la Columna y los Cards por Views con estilo */}
      <View style={styles.column}>
        {/* Simulación de Elevated Card */}
        <View style={[styles.card, styles.elevated]}>
          <H1 style={{ color: Colors[colorScheme].tint, marginBottom: 20}}>Inicio session</H1>
          <TextInputSystem></TextInputSystem>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 20,
  },
  column: {
    gap: 12, // Esto hace lo mismo que "spacedBy"
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  elevated: {
    // Sombra para Android
    elevation: 4,
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  outlined: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "transparent",
  },
});
