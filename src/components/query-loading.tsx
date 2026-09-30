import { ActivityIndicator, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type QueryLoadingProps = {
  message?: string;
};

// Se muestra mientras una consulta de TanStack Query está esperando la respuesta.
export function QueryLoading({ message = 'Cargando...' }: QueryLoadingProps) {
  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      <ActivityIndicator size="large" color={theme.text} />
      <ThemedText themeColor="textSecondary">{message}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.six,
  },
});
