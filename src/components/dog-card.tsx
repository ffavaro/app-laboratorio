import { Image, type ImageProps } from 'expo-image';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useState } from 'react';

// 1. Definimos el "contrato" del componente: qué datos necesita recibir (props).
//    `ImageProps['source']` acepta una URL ('https://...') o una imagen local (require(...)).
export type Dog = {
  name: string;
  image: ImageProps['source'];
  weight: number; // en kg
  color: string;
  breed: string;
  size: 'Pequeño' | 'Mediano' | 'Grande';
  edad: number; // en años
  parents?: {
    mother: ImageProps['source'];
    father: ImageProps['source'];
  };
  sexo: 'Macho' | 'Hembra';
  vacunado?: boolean;
  castrado?: boolean;
  aptoParaNiños?: boolean;
  aptoParaOtrosPerros?: boolean;
  estado?: 'Disponible' | 'Adoptado' | 'En proceso';
  estadoSalud?: 'Sano' | 'Enfermo' | 'Recuperándose';
};

type DogCardProps = {
  dog: Dog;
  onAdopt: (dog: Dog) => void; // función que se ejecuta al tocar el botón
  solicitado?: boolean; // true si el usuario ya pidió adoptar a este perro
};

// 2. El componente recibe las props y devuelve la interfaz (JSX).
export function DogCard({ dog, onAdopt, solicitado = false }: DogCardProps) {
  
  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      {/* Foto principal */}
      <Image source={dog.image} style={styles.image} contentFit="cover" />

      <View style={styles.content}>
        <ThemedText type="subtitle">{dog.name}</ThemedText>

        {/* Datos del perro */}
        <InfoRow label="Raza" value={dog.breed} />
        <InfoRow label="Peso" value={`${dog.weight} kg`} />
        <InfoRow label="Color" value={dog.color} />
        <InfoRow label="Tamaño" value={dog.size} />
        <InfoRow label="Edad" value={formatEdad(dog.edad)} />
        <InfoRow label="Sexo" value={dog.sexo} />

        {/* Fotos de los padres: sólo si se conocen */}
        {dog.parents && (
          <>
            <ThemedText type="smallBold" style={styles.parentsTitle}>
              Padres
            </ThemedText>
            <View style={styles.parents}>
              <ParentPhoto label="Mamá" source={dog.parents.mother} />
              <ParentPhoto label="Papá" source={dog.parents.father} />
            </View>
          </>
        )}

        {/* Botón: Pressable nos da el estado `pressed` para dar feedback visual */}
        <Pressable
          onPress={() => onAdopt(dog)}
          style={({ pressed }) => [dog.size === 'Pequeño' ? styles.button : (dog.size === 'Mediano' ? styles.buttonSizeMedium : styles.buttonSizeLarge), pressed && styles.buttonPressed]}>
          <ThemedText style={styles.buttonText}>
            {solicitado ? 'Solicitud enviada ✓' : 'Adoptame'}
          </ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

// Muestra meses si es cachorro (menos de 1 año) y usa singular/plural correctamente.
function formatEdad(edad: number) {
  if (edad < 1) {
    const meses = Math.round(edad * 12);
    return `${meses} ${meses === 1 ? 'mes' : 'meses'}`;
  }
  return `${edad} ${edad === 1 ? 'año' : 'años'}`;
}

// 3. Sub-componentes pequeños para no repetir código.
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
      <ThemedText type="small">{value}</ThemedText>
    </View>
  );
}

function ParentPhoto({ label, source }: { label: string; source: ImageProps['source'] }) {
  const [ abierta, setAbierta ] = useState(false);
  return (
  <>
  <Pressable onPress={() => setAbierta(!abierta)}>
    <Image source={source} style={styles.parentImage} contentFit="cover" />
     <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
  </Pressable>
  <Modal
    visible={abierta}
    onRequestClose={() => setAbierta(false)}
    transparent={true}
    animationType="fade"
  >
    <Pressable onPress={() => setAbierta(false)} style={styles.modalFondo}>
      <Image source={source} style={styles.modalImagen} contentFit="cover" />
      <ThemedText type="small" themeColor="textSecondary" style={styles.modalTexto}>
        {label}
      </ThemedText>
    </Pressable>
  </Modal>
  </>
  );
}

// 4. Estilos: StyleSheet.create es la forma recomendada de definirlos en React Native.
const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.three,
    overflow: 'hidden', // hace que la imagen respete las esquinas redondeadas
    marginBottom: Spacing.four,
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: Spacing.three,
  },
  content: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  parentsTitle: {
    marginTop: Spacing.two,
  },
  parents: {
    flexDirection: 'row',
    gap: Spacing.four,
  },
  parent: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  parentImage: {
    width: 64,
    height: 64,
    borderRadius: 32, // la mitad del ancho => círculo
  },
  button: {
    marginTop: Spacing.three,
    backgroundColor: '#6919d9',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 700,
  },
  buttonSizeMedium: {
    marginTop: Spacing.three,
    backgroundColor: '#2516cc',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    alignItems: 'center',
  },
  buttonSizeLarge: {
    marginTop: Spacing.three,
    backgroundColor: '#16a8cc',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    alignItems: 'center',
  },
  buttonPressedMedium: {
    opacity: 0.7,
  },
  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // negro casi opaco
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.three,
  },
  modalImagen: {
    width: '100%',
    height: '70%',
  },
  modalTexto: {
    color: '#ffffff',
    marginTop: Spacing.three,
  },
});
