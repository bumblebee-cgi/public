# Bee Chat LLM (React Native)

Aplicativo mobile simples em React Native que inicia com um login via ChatGPT (Google) e, após autenticação, abre um chat direto com o modelo (usando as credenciais do Codex CLI).

## Instalação e execução
1. Instale o Expo CLI globalmente (se ainda não tiver):
   ```bash
   npm install -g expo-cli
   ```
2. No diretório do app, rode:
   ```bash
   npm install
   npm run start
   ```
3. Use o Expo Go no celular ou emulador para abrir o QR Code exibido.

## Autenticação (Codex CLI + Google)
- Rode `npx codex auth login --provider google` para obter seu token Codex. Ele será usado para autorizar chamadas ao LLM.
- No código, substitua os `YOUR_*_CLIENT_ID` em `src/screens/LoginScreen.js` pelos IDs OAuth do seu projeto Google Cloud.
- Ao fazer login com o botão “Entrar com ChatGPT”, o token de acesso é armazenado via `expo-secure-store`.
- O token também pode ser exportado manualmente se precisar reutilizar em backend próprio.

## Chat com LLM
- O chat consome `https://api.openai.com/v1/chat/completions` usando o token armazenado.
- Os prints de resposta ficam no histórico e também mostram mensagens de erro caso falhe.
- O componente `MessageBubble` cuida das bolhas do usuário e da Bee.

## Implantação
- Quando estiver pronto, copie a pasta inteira para o repositório público (`https://github.com/bumblebee-cgi/public`) sob `app/react-native-chat/`.
- Configure o `app.config.js` se quiser publicar via Expo Application Services (EAS) ou execute `expo build`/`eas build`.

## Próximos passos
- Substituir o endpoint por um backend que encapsula o Codex CLI e evita expor diretamente a chave.
- Adicionar suporte a anexos (imagens, arquivos) e histórico persistido.
- Criar uma versão web (React Native Web ou Next.js) para facilitar o acesso desktop.
