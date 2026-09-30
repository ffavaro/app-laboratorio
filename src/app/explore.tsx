import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DogList } from '@/components/dog-list';
import { QueryError } from '@/components/query-error';
import { QueryLoading } from '@/components/query-loading';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useDogs } from '@/hooks/use-dogs';
import { useTheme } from '@/hooks/use-theme';
import { useAdoptionStore, type FiltroTamano } from '@/store/adoption-store';

const FILTROS: FiltroTamano[] = ['Todos', 'Pequeño', 'Mediano', 'Grande'];

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

  // TanStack Query: datos del backend + en qué estado está el llamado.
  const { data: perros, isPending, isError, error, refetch } = useDogs();

  // Zustand: estado del cliente. Cada selector lee un solo valor, así el componente
  // sólo se vuelve a dibujar cuando ese valor cambia.
  const filtroTamano = useAdoptionStore((state) => state.filtroTamano);
  const setFiltroTamano = useAdoptionStore((state) => state.setFiltroTamano);
  const solicitudes = useAdoptionStore((state) => state.solicitudes);
  const alternarSolicitud = useAdoptionStore((state) => state.alternarSolicitud);

  // Los tres estados posibles de la consulta: cargando, error o datos listos.
  function renderContenido() {
    if (isPending) {
      return <QueryLoading message="Buscando perritos..." />;
    }
    if (isError) {
      return <QueryError error={error} onRetry={refetch} />;
    }

    const perrosFiltrados =
      filtroTamano === 'Todos' ? perros : perros.filter((perro) => perro.size === filtroTamano);

    return (
      <DogList
        dogs={perrosFiltrados}
        solicitudes={solicitudes}
        onAdopt={(dog) => alternarSolicitud(dog.name)}
      />
    );
  }

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="smallBold">Solicitudes de adopción: {solicitudes.length}</ThemedText>

          <ThemedView style={styles.filtros}>
            {FILTROS.map((filtro) => {
              const activo = filtro === filtroTamano;
              return (
                <Pressable key={filtro} onPress={() => setFiltroTamano(filtro)}>
                  <ThemedView
                    type={activo ? 'backgroundSelected' : 'backgroundElement'}
                    style={styles.filtro}>
                    <ThemedText type={activo ? 'smallBold' : 'small'}>{filtro}</ThemedText>
                  </ThemedView>
                </Pressable>
              );
            })}
          </ThemedView>
        </ThemedView>

        {renderContenido()}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.three,
  },
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  filtro: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.five,
  },
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
