# 💪 Golden Fit — Seu Personal Trainer com Inteligência Artificial

> App fitness com IA, feito sob medida para os meus treinos e os da minha esposa — desenvolvido do zero com apoio da Google Gemini.

---

## 🖼️ Galeria de Telas

| Tela Inicial | Cadastro de Perfil | Execução do Exercício |
|--------------|--------------------|------------------------|
| ![Tela Inicial](https://i.postimg.cc/pLXgCvvZ/Screenshot_2025-08-03-19-09-30-705_com.goldenfit.app.jpg) | ![Cadastro](https://i.postimg.cc/KjJ03XCp/Screenshot_2025-08-03-18-55-49-318_com.goldenfit.app.jpg) | ![Execução](https://i.postimg.cc/65hkC3kq/Screenshot_2025-08-03-19-10-03-513_com.goldenfit.app.jpg) |

| Conclusão de Treino | Tela de Perfil |
|----------------------|----------------|
| ![Conclusão](https://i.postimg.cc/xTQ5GPQy/Screenshot_2025-08-03-19-10-13-595_com.goldenfit.app.jpg) | ![Perfil](https://i.postimg.cc/nrbJSmzf/Screenshot_2025-08-03-18-51-58-976_com.goldenfit.app.jpg) |

---

## ✨ Funcionalidades

- 🎯 **Perfil Personalizado:** Nome, gênero, idade, altura, peso e objetivo (ganho de massa, perda de gordura etc.)
- 📅 **Planos de Treino Estruturados:** Rotinas divididas por dias e gênero, com exercícios detalhados
- ⏱️ **Execução em Tempo Real:** Timer de descanso, marcação de séries, registro de carga
- 📈 **Progresso Visual:** 
  - Gráficos interativos por exercício
  - Recordes pessoais (PRs) salvos automaticamente
  - Estatísticas de treino, calorias e IMC
- 🤖 **Golden Coach (IA com Google Gemini):**
  - Desafios semanais personalizados
  - Feedback motivacional pós-treino
- 💧 **Rastreamento de Hidratação:** Controle visual e interativo da ingestão de água
- 📱 **Design Mobile-First:** Interface responsiva e fluida
- 📦 **Pronto para Publicação no Android (Capacitor)**

---

## 🛠️ Tecnologias

- **React + TypeScript** — Frontend moderno e tipado
- **Vite** — Build rápido e leve
- **Tailwind CSS** — Estilo responsivo e utilitário
- **Google Gemini API** — Geração de textos e desafios por IA
- **Recharts** — Gráficos de evolução
- **Capacitor** — Geração de app nativo para Android

---

## ⚙️ Como Rodar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão 18+)
- npm ou yarn

### Passos

```bash
# 1. Clone o projeto
git clone https://github.com/IsaqueCodeX/Golden-Fit-app.git
cd Golden-Fit-app

# 2. Instale as dependências
npm install

# 3. Configure sua chave da API Gemini
echo "VITE_API_KEY=SUA_CHAVE_DE_API" > .env.local

# 4. Rode o projeto
npm run dev
```

> O app estará acessível em `http://localhost:5173`.

---

## 📲 Compilar para Android com Capacitor

```bash
# Adicione a plataforma Android
npx cap add android

# Compile e sincronize com o projeto nativo
npm run cap:sync

# Abra no Android Studio
npx cap open android
```

---

## 👤 Sobre o Desenvolvedor

**Isaque Santos**  
Estudante de Análise e Desenvolvimento de Sistemas apaixonado por tecnologia, inteligência artificial e o mundo fitness.

- GitHub: [@IsaqueCodeX](https://github.com/IsaqueCodeX)
- LinkedIn: [linkedin.com/in/isaque-santos-720b8b15a](https://www.linkedin.com/in/isaque-santos-720b8b15a)
- Email: isaque.v.l@gmail.com

---

## ⭐ Contribuições

Este projeto é um estudo pessoal, mas sugestões, issues ou feedbacks são sempre bem-vindos!

---

## 📜 Licença

Este repositório está sob a licença MIT.
