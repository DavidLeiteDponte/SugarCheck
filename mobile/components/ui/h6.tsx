import { ThemedText, ThemedTextProps } from "../themed-text";

export function H6({ children, style, ...props }: ThemedTextProps) {

  return (
    <ThemedText
      type="title"
      style={[
        {
          fontWeight: 700,
          fontSize: 20,
        },
        style, // Permitimos que estilos externos también apliquen
      ]}
      {...props}
    >
      {children}
    </ThemedText>
  );
}
