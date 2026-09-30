import { StyleSheet } from 'react-native';

import { DogCard, type Dog } from '@/components/dog-card';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type DogListProps = {
  dogs: Dog[];
  solicitudes: string[]; // nombres de los perros ya solicitados
  onAdopt: (dog: Dog) => void;
};

// Se muestra cuando la consulta terminó bien: recibe los datos ya listos y los dibuja.
export function DogList({ dogs, solicitudes, onAdopt }: DogListProps) {
  if (dogs.length === 0) {
    return (
      <ThemedText themeColor="textSecondary" style={styles.empty}>
        No hay perros para mostrar.
      </ThemedText>
    );
  }

  return (
    <>
      {dogs.map((dog) => (
        <DogCard
          key={dog.name}
          dog={dog}
          solicitado={solicitudes.includes(dog.name)}
          onAdopt={onAdopt}
        />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  empty: {
    textAlign: 'center',
    paddingVertical: Spacing.six,
  },
});
