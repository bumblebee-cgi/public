# Tarefa do Agente Programador — App React Native de Chat LLM

## Objetivo
Construir um app mobile em React Native que funcione como chat LLM, usando os recursos de autenticação do `codex` CLI (Codex CLI Auth) para validar usuários. O app precisa ser simples, elegante e pronto para ser evoluído para integração com APIs de mensagens.

## Requisitos técnicos
1. **Stack:** React Native (Expo ou bare workflow) com suporte a iOS/Android.
2. **Chat LLM:** componente de chat com bolhas, envio de mensagens e resposta do modelo (pode usar mock ou placeholder inicial). Documentar como conectar com um LLM real (ex.: Codex). Incluir histórico e loader.
3. **Autenticação:** usar `codex auth login` (ou comando equivalente) para obter token, armazenar de forma segura e usar para chamadas ao backend/LLM. Detalhar no README como configurar e renovar o token.
4. **Configuração:** toda a configuração do agente permanece em `programmer-agent/` (admins, tokens, scripts). O código do app deve ser copiado em seguida para o repositório público (`https://github.com/bumblebee-cgi/public`) com instruções de deploy.
5. **Design:** interface limpa, paleta escura com toques de cor #f06292 e gradients suaves. Botões e inputs modernos (Space Grotesk recomendada). Deve ser responsivo e acessível.
6. **Documentação:** criar README dentro da pasta do app explicando como rodar (`yarn install`, `yarn start`, `Codex CLI auth`). Listar futuras integrações.

## Entregáveis
- Pasta `programmer-agent/react-native-app/` com código inicial (que depois é copiado para o repo público) e README explicando o setup e autenticação.
- Apontar quais dependências são necessárias (React Native, Codex CLI, libs de UI). Incluir scripts para rodar em dev.
- Quando o app estiver funcional, mover os arquivos finais para `public/app/` ou equivalente no repositório público.

## Notas de operação
- Assim que o projeto for finalizado, me avisa com o status e link do GitHub Pages ou expo (se houver preview).
- Lembre-se: cada agente executa a tarefa e depois encerra, informando que concluiu.
- Se precisar de texto para onboarding, posso preparar o conteúdo enquanto você desenvolve.
