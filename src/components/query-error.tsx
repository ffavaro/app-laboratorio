import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

type QueryErrorProps = {
  error: Error;
  onRetry: () => void; // normalmente el `refetch` de la consulta
};

// Se muestra cuando una consulta de TanStack Query falla.
export function QueryError({ error, onRetry }: QueryErrorProps) {
  return (
    <ThemedView type="backgroundElement" style={styles.container}>
      <ThemedText type="smallBold">Algo salió mal</ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.message}>
        {error.message}
      </ThemedText>

      <Pressable
        onPress={onRetry}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
        <ThemedText style={styles.buttonText}>Reintentar</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.four,
    borderRadius: Spacing.three,
  },
  message: {
    textAlign: 'center',
  },
  button: {
    marginTop: Spacing.two,
    backgroundColor: '#6919d9',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.two,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 700,
  },
});
