import { View, Text, StyleSheet } from 'react-native';
import { THEME } from '../constants/theme';

export default function MessageBubble({ message }) {
  const isUser = message.author === 'user';
  return (
    <View style={[styles.bubble, isUser ? styles.userBubble : styles.beeBubble]}>
      <Text style={[styles.text, isUser ? styles.userText : styles.beeText]}>{message.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    marginVertical: 6,
    padding: 14,
    borderRadius: 18,
    maxWidth: '85%'
  },
  userBubble: {
    backgroundColor: '#f5f5f5',
    alignSelf: 'flex-end'
  },
  beeBubble: {
    backgroundColor: 'rgba(125, 101, 255, 0.15)',
    borderColor: '#f06292',
    borderWidth: 1,
    alignSelf: 'flex-start'
  },
  text: {
    fontSize: 15,
    lineHeight: 22
  },
  userText: {
    color: '#05070e'
  },
  beeText: {
    color: '#fff'
  }
});
