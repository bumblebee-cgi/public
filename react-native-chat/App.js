import { SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import LoginScreen from './src/screens/LoginScreen';
import ChatScreen from './src/screens/ChatScreen';
import { APP_STORAGE_TOKEN_KEY } from './src/constants/storage';

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const token = await SecureStore.getItemAsync(APP_STORAGE_TOKEN_KEY);
      if (token) {
        setSession({
          token,
          user: { name: 'Usuário Bee', email: 'user@bee.com' }
        });
      }
      setLoading(false);
    };
    bootstrap();
  }, []);

  const handleLogin = async ({ token, user }) => {
    await SecureStore.setItemAsync(APP_STORAGE_TOKEN_KEY, token);
    setSession({ token, user });
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync(APP_STORAGE_TOKEN_KEY);
    setSession(null);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {!session ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <ChatScreen session={session} onLogout={handleLogout} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05070E'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#05070E'
  }
});
