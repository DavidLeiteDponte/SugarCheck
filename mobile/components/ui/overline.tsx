import { ThemedText, ThemedTextProps } from "../themed-text";

export function Overline({ children, style, ...props }: ThemedTextProps) {

  return (
    <ThemedText
      type="title"
      style={[
        {
          fontWeight: 200,
          fontSize: 12,
        },
        style, // Permitimos que estilos externos también apliquen
      ]}
      {...props}
    >
      {children}
    </ThemedText>
  );
}
