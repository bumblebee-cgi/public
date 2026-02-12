import { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ onLogin }) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com',
    iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
    scopes: ['profile', 'email']
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const token = response.authentication?.accessToken;
      const user = {
        name: response.authentication?.idTokenClaims?.name ?? 'Usuário',
        email: response.authentication?.idTokenClaims?.email ?? ''
      };
      if (token) {
        onLogin({ token, user });
      }
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bee Chat LLM</Text>
      <Text style={styles.subtitle}>
        Entre com o ChatGPT (Google) para abrir o chat e conectar com o modelo. A autenticação usa Codex CLI e o token fica guardado seguro.
      </Text>
      <TouchableOpacity
        style={[styles.button, !request && styles.buttonDisabled]}
        onPress={() => promptAsync({ useProxy: true, showInRecents: true })}
        disabled={!request}
      >
        <Text style={styles.buttonText}>Entrar com ChatGPT</Text>
      </TouchableOpacity>
      {!request && <ActivityIndicator style={{ marginTop: 16 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center'
  },
  title: {
    fontSize: 32,
    color: '#fefefe',
    fontWeight: '700',
    marginBottom: 12
  },
  subtitle: {
    color: '#c5c7d0',
    fontSize: 16,
    marginBottom: 32
  },
  button: {
    backgroundColor: '#f06292',
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  },
  buttonDisabled: {
    backgroundColor: '#7a6a7a'
  }
});
