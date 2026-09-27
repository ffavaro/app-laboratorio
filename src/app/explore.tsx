import { Platform, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Dog, DogCard } from '@/components/dog-card';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function TabTwoScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };
  const theme = useTheme();

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });

  const perros: Dog[] = [
    // Adultos rescatados de la calle: no se conocen sus padres
    {
      name: 'Chispa',
      image: 'https://images.dog.ceo/breeds/mix/xeshabelka_(30).jpg',
      weight: 14,
      color: 'Negro y blanco',
      breed: 'Mestizo',
      size: 'Mediano',
      edad: 2,
      sexo: 'Hembra',
      vacunado: true,
      castrado: true,
      aptoParaNiños: true,
      aptoParaOtrosPerros: true,
      estado: 'Disponible',
      estadoSalud: 'Sano',
    },
    {
      name: 'Canelo',
      image: 'https://images.dog.ceo/breeds/mix/mikey.jpg',
      weight: 13,
      color: 'Canela',
      breed: 'Mestizo',
      size: 'Mediano',
      edad: 1,
      sexo: 'Macho',
      vacunado: true,
      castrado: true,
      aptoParaNiños: true,
      aptoParaOtrosPerros: true,
      estado: 'Disponible',
      estadoSalud: 'Sano',
    },
    {
      name: 'Lola',
      image: 'https://images.dog.ceo/breeds/mix/lunaandbaldur.jpg',
      weight: 16,
      color: 'Beige con hocico negro',
      breed: 'Mestizo',
      size: 'Mediano',
      edad: 3,
      sexo: 'Hembra',
      vacunado: true,
      castrado: true,
      aptoParaNiños: true,
      aptoParaOtrosPerros: true,
      estado: 'En proceso',
      estadoSalud: 'Sano',
    },
    {
      name: 'Rulo',
      image: 'https://images.dog.ceo/breeds/mix/archie_01.jpg',
      weight: 26,
      color: 'Blanco con cara tricolor',
      breed: 'Mestizo',
      size: 'Grande',
      edad: 5,
      sexo: 'Macho',
      vacunado: true,
      castrado: true,
      aptoParaNiños: true,
      aptoParaOtrosPerros: false,
      estado: 'Disponible',
      estadoSalud: 'Sano',
    },
    {
      name: 'Nube',
      image: 'https://images.dog.ceo/breeds/mix/polo.jpg',
      weight: 15,
      color: 'Blanco',
      breed: 'Mestizo',
      size: 'Mediano',
      edad: 2,
      sexo: 'Macho',
      vacunado: true,
      castrado: false,
      aptoParaNiños: true,
      aptoParaOtrosPerros: true,
      estado: 'Disponible',
      estadoSalud: 'Sano',
    },
    {
      name: 'Tití',
      image: 'https://images.dog.ceo/breeds/mix/layla_mix.jpg',
      weight: 7,
      color: 'Crema y blanco',
      breed: 'Mestizo',
      size: 'Pequeño',
      edad: 3,
      sexo: 'Hembra',
      vacunado: true,
      castrado: true,
      aptoParaNiños: false,
      aptoParaOtrosPerros: true,
      estado: 'Disponible',
      estadoSalud: 'Sano',
    },
    {
      name: 'Negrita',
      image: 'https://images.dog.ceo/breeds/mix/annabelle10.jpg',
      weight: 25,
      color: 'Negro',
      breed: 'Mestizo',
      size: 'Grande',
      edad: 4,
      sexo: 'Hembra',
      vacunado: true,
      castrado: true,
      aptoParaNiños: true,
      aptoParaOtrosPerros: true,
      estado: 'Adoptado',
      estadoSalud: 'Sano',
    },
    {
      name: 'Sombra',
      image: 'https://images.dog.ceo/breeds/mix/denver.jpg',
      weight: 28,
      color: 'Negro',
      breed: 'Mestizo',
      size: 'Grande',
      edad: 7,
      sexo: 'Macho',
      vacunado: true,
      castrado: true,
      aptoParaNiños: true,
      aptoParaOtrosPerros: false,
      estado: 'Disponible',
      estadoSalud: 'Recuperándose',
    },
    {
      name: 'Pícaro',
      image: 'https://images.dog.ceo/breeds/mix/eddy.jpg',
      weight: 12,
      color: 'Negro con pecho blanco',
      breed: 'Mestizo',
      size: 'Mediano',
      edad: 1,
      sexo: 'Macho',
      vacunado: false,
      castrado: false,
      aptoParaNiños: true,
      aptoParaOtrosPerros: true,
      estado: 'Disponible',
      estadoSalud: 'Enfermo',
    },
    // Cachorritos: son muy chicos para castrar
    {
      name: 'Manchita',
      image: 'https://images.dog.ceo/breeds/mix/noah01.jpg',
      weight: 6,
      color: 'Crema',
      breed: 'Mestizo',
      size: 'Pequeño',
      edad: 0.25, // 3 meses
      sexo: 'Hembra',
      vacunado: true,
      castrado: false,
      aptoParaNiños: true,
      aptoParaOtrosPerros: true,
      estado: 'Disponible',
      estadoSalud: 'Sano',
      parents: {
        mother: 'https://images.dog.ceo/breeds/mix/carson_1.jpg',
        father: 'https://images.dog.ceo/breeds/mix/photo_2025-11-17_01-07-16.jpg',
      },
    },
    {
      name: 'Bombón',
      image: 'https://images.dog.ceo/breeds/mix/cherry.jpg',
      weight: 5,
      color: 'Negro con pecho blanco',
      breed: 'Mestizo',
      size: 'Pequeño',
      edad: 0.5, // 6 meses
      sexo: 'Hembra',
      vacunado: true,
      castrado: false,
      aptoParaNiños: true,
      aptoParaOtrosPerros: true,
      estado: 'En proceso',
      estadoSalud: 'Sano',
      parents: {
        mother: 'https://images.dog.ceo/breeds/mix/milka3.jpg',
        father: 'https://images.dog.ceo/breeds/mix/tropik.jpg',
      },
    },
    {
      name: 'Oreo',
      image: 'https://images.dog.ceo/breeds/mix/kaiser.jpg',
      weight: 4,
      color: 'Negro y blanco',
      breed: 'Mestizo',
      size: 'Pequeño',
      edad: 0.25, // 3 meses
      sexo: 'Macho',
      vacunado: true,
      castrado: false,
      aptoParaNiños: true,
      aptoParaOtrosPerros: true,
      estado: 'Disponible',
      estadoSalud: 'Sano',
    },
    {
      name: 'Caramelo',
      image: 'https://images.dog.ceo/breeds/mix/toby2.jpg',
      weight: 3,
      color: 'Naranja',
      breed: 'Mestizo',
      size: 'Pequeño',
      edad: 0.33, // 4 meses
      sexo: 'Macho',
      vacunado: false,
      castrado: false,
      aptoParaNiños: true,
      aptoParaOtrosPerros: true,
      estado: 'Disponible',
      estadoSalud: 'Sano',
    },
  ];

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
      <ThemedView style={styles.container}>
        {perros.map((perro) => (
          <DogCard key={perro.name} dog={perro} onAdopt={(dog) => console.log(`Adopted ${dog.name}`)} />
        ))}
        </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
  },
  titleContainer: {
    gap: Spacing.three,
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
  },
  centerText: {
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  linkButton: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.five,
    justifyContent: 'center',
    gap: Spacing.one,
    alignItems: 'center',
  },
  sectionsWrapper: {
    gap: Spacing.five,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
  collapsibleContent: {
    alignItems: 'center',
  },
  imageTutorial: {
    width: '100%',
    aspectRatio: 296 / 171,
    borderRadius: Spacing.three,
    marginTop: Spacing.two,
  },
  imageReact: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
});
