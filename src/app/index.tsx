import * as Device from 'expo-device';
import { Platform, Pressable, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIcon } from '@/components/animated-icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useRouter } from 'expo-router';
import { useState } from 'react';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const router = useRouter();
  const theme = useTheme();

  function handleLogin() {
    if (!usuario || !contraseña) {
      alert('Por favor, ingresa tu usuario y contraseña.');
      return;
    }
    // Aquí puedes agregar la lógica de autenticación, por ejemplo, verificar el usuario y la contraseña
    if (usuario === 'admin' && contraseña === '1234') {
      router.push('/explore'); // Redirige a la pantalla de exploración si el inicio de sesión es exitoso
    }
  }
const inputColores = { color: theme.text, backgroundColor: theme.background };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
             Adoptame
          </ThemedText>
        </ThemedView>

        <ThemedText type="code" style={styles.code}>
          Rescate y adopción de mascotas
        </ThemedText>

        <ThemedView type="backgroundElement" style={styles.stepContainer}>
          <TextInput
            placeholder="Usuario"
            value={usuario}
            onChangeText={setUsuario}
            style={[styles.input, inputColores]}
            placeholderTextColor={theme.textSecondary}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            placeholder="Contraseña"
            value={contraseña}
            onChangeText={setContraseña}
            style={[styles.input, inputColores]}
            placeholderTextColor={theme.textSecondary}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
          <Pressable
            onPress={handleLogin}
            style={({ pressed }) => [styles.botonPrimario, pressed && styles.presionado]}>
            <ThemedText style={styles.textoBotonPrimario}>Iniciar sesión</ThemedText>
          </Pressable>

          <Pressable
            onPress={() => router.push('/register')}
            style={({ pressed }) => [styles.botonSecundario, pressed && styles.presionado]}>
            <ThemedText style={styles.textoBotonSecundario}>Registrarse</ThemedText>
          </Pressable>
        </ThemedView>

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 32,
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
    form: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    padding: Spacing.four,
    borderRadius: Spacing.four,
  },
  input: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + Spacing.one,
    borderRadius: Spacing.two,
    fontSize: 16,
  },
  botonPrimario: {
    backgroundColor: '#6919d9',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    alignItems: 'center',
  },
  textoBotonPrimario: {
    color: '#ffffff',
    fontWeight: 700,
  },
  botonSecundario: {
    borderWidth: 2,
    borderColor: '#6919d9',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    alignItems: 'center',
  },
  textoBotonSecundario: {
    color: '#6919d9',
    fontWeight: 700,
  },
  presionado: {
    opacity: 0.7,
  },
});
