import { ThemedText, ThemedTextProps } from "../themed-text";

export function Subtitle2({ children, style, ...props }: ThemedTextProps) {

  return (
    <ThemedText
      type="title"
      style={[
        {
          fontWeight: 600,
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
