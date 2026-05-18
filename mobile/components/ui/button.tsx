import { ThemedText, ThemedTextProps } from "../themed-text";

export function Button({ children, style, ...props }: ThemedTextProps) {

  return (
    <ThemedText
      type="title"
      style={[
        {
          fontWeight: 500,
          fontSize: 14,
        },
        style, // Permitimos que estilos externos también apliquen
      ]}
      {...props}
    >
      {children}
    </ThemedText>
  );
}
