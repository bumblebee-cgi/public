import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import MessageBubble from '../components/MessageBubble';
import { THEME } from '../constants/theme';

export default function ChatScreen({ session, onLogout }) {
  const [messages, setMessages] = useState([
    { id: 'init', author: 'bee', text: 'Olá! Estou pronta para conversar com você.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const userMessage = { id: Date.now().toString(), author: 'user', text: inputValue.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'Você é a Bee, diretora de agentes.' },
            { role: 'user', content: userMessage.text }
          ],
          temperature: 0.3,
          max_tokens: 250
        })
      });

      const payload = await response.json();
      const text = payload?.choices?.[0]?.message?.content?.trim();
      const assistantMsg = {
        id: Date.now().toString() + '-assistant',
        author: 'bee',
        text: text || 'Ainda estou pensando...'
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString() + '-error',
          author: 'bee',
          text: 'Não foi possível contatar o modelo. Verifique o token do Codex CLI.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Chat Bee</Text>
          <Text style={styles.subtitle}>{session.user.name}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <MessageBubble message={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <View style={styles.inputWrap}>
        <TextInput
          style={styles.input}
          placeholder="Digite algo para a Bee..."
          placeholderTextColor="#a0a3b9"
          value={inputValue}
          onChangeText={setInputValue}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.sendText}>Enviar</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: THEME.bg
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '700'
  },
  subtitle: {
    color: '#c5c7d0',
    marginTop: 2
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)'
  },
  logoutText: {
    color: '#fff',
    fontWeight: '500'
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginBottom: 16
  },
  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    padding: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: '#fff'
  },
  sendButton: {
    backgroundColor: '#f06292',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 20
  },
  sendText: {
    color: '#fff',
    fontWeight: '600'
  }
});
