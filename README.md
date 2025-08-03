# Golden Fit: Seu Personal Trainer com Inteligência Artificial 🚀

![Golden Fit Preview](https://i.postimg.cc/3N6qN5sj/image.png)

**Golden Fit** é uma aplicação de fitness completa, projetada para ser um companheiro de treino pessoal no seu bolso. Desenvolvido com um design elegante e responsivo, o app permite que os usuários criem perfis detalhados, sigam planos de treino estruturados, monitorem seu progresso em tempo real e, o mais importante, recebam motivação e desafios personalizados gerados pela IA "Golden Coach".

---

## ✨ Funcionalidades Principais

- **Criação de Perfil Personalizado:** Configure seu nome, gênero, idade, altura, peso e objetivo principal (Ganhar Massa, Perder Gordura, etc.) para uma experiência sob medida.
- **Planos de Treino Estruturados:** Acesso a planos de treino completos para 5 dias, com divisões específicas e exercícios detalhados para os gêneros masculino e feminino.
- **Execução de Treino em Tempo Real:** Uma interface imersiva para acompanhar cada exercício, marcar séries como concluídas, registrar a carga utilizada e usar um timer de descanso integrado.
- **Rastreamento de Progresso e Histórico:**
    - **Gráficos de Evolução:** Visualize seu progresso de carga para cada exercício ao longo do tempo.
    - **Recordes Pessoais (PRs):** O app salva automaticamente seus melhores levantamentos.
    - **Estatísticas Detalhadas:** Acompanhe o total de treinos concluídos, calorias queimadas por semana e seu Índice de Massa Corporal (IMC).
- **Golden Coach (IA com Google Gemini):**
    - **🧠 Desafios da Semana:** Receba desafios semanais curtos e motivadores, gerados pela IA com base no seu perfil e histórico.
    - **🧠 Feedback Pós-Treino:** Após cada treino, a IA gera uma mensagem personalizada, celebrando seu esforço e recordes batidos.
- **Rastreador de Hidratação:** Monitore sua ingestão diária de água com uma interface interativa e visual.
- **Design Responsivo (Mobile-First):** Interface otimizada para uma experiência perfeita em dispositivos móveis.
- **Pronto para Celular com Capacitor:** O projeto está configurado para ser facilmente compilado como um aplicativo nativo para Android.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído com um stack moderno de desenvolvimento frontend:

- **Frontend:** [React](https://reactjs.org/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Ferramenta de Build:** [Vite](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Inteligência Artificial:** [Google Gemini API](https://ai.google.dev/)
- **Gráficos:** [Recharts](https://recharts.org/)
- **Build Nativo (Mobile):** [Capacitor](https://capacitorjs.com/)

---

## 🚀 Como Executar o Projeto

Siga os passos abaixo para rodar o Golden Fit localmente.

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- `npm` ou `yarn`

### Instalação e Configuração

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/IsaqueCodeX/Golden-Fit-app.git
    cd Golden-Fit-app
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure sua Chave de API do Gemini:**
    - Crie um arquivo chamado `.env.local` na raiz do projeto.
    - Dentro dele, adicione sua chave de API do Google Gemini, conforme o exemplo abaixo:
      ```env
      VITE_API_KEY=SUA_CHAVE_DE_API_SECRETA_AQUI
      ```

4.  **Rode o projeto em modo de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O aplicativo estará disponível em `http://localhost:5173`.

### Compilando para Android (com Capacitor)

1.  **Adicione a plataforma Android:**
    ```bash
    npx cap add android
    ```

2.  **Sincronize sua aplicação web com o projeto nativo:**
    - Este comando compila o projeto web e copia os arquivos para a pasta do Android.
    ```bash
    npm run cap:sync
    ```

3.  **Abra o projeto no Android Studio:**
    ```bash
    npx cap open android
    ```
    - Dentro do Android Studio, você pode compilar e rodar o aplicativo em um emulador ou em um dispositivo físico.

---

## 👤 Contato

**Isaque Santos**

- GitHub: [@IsaqueCodeX](https://github.com/IsaqueCodeX)
- LinkedIn: [Seu Perfil no LinkedIn](https://www.linkedin.com/in/seu-usuario/)
- Email: isaque.v.l@gmailcom

Sinta-se à vontade para entrar em contato!
