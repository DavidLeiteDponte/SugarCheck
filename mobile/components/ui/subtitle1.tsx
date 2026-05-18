import { ThemedText, ThemedTextProps } from "../themed-text";

export function Subtitle({ children, style, ...props }: ThemedTextProps) {

  return (
    <ThemedText
      type="title"
      style={[
        {
          fontWeight: 600,
          fontSize: 15,
        },
        style, // Permitimos que estilos externos también apliquen
      ]}
      {...props}
    >
      {children}
    </ThemedText>
  );
}
