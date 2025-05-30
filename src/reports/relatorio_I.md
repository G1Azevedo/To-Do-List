
# Relatório de Desenvolvimento

Esse relatório apresenta uma visão geral das principais etapas envolvidas no desenvolvimento da aplicação *To-Do List*, no qual irei tentar abordar a modelagem de entidades, estruturação dos dados, design das interfaces e implementação da navegação, conforme solicitado na tarefa.

---

## 1. Modelagem das Entidades

Ao observar outros sistemas semelhantes, para atender aos casos de uso esperados em um sistema de lista de tarefas com autenticação, consegui identificar  e modeladar duas entidades principais:

### Usuário
Embora não exista um modelo explícito para a entidade "Usuário", ela acaba representada pelas funcionalidades e campos utilizados nas telas de **LoginScreen.tsx** e **CadastroScreen.tsx**. Os casos de uso incluem login e cadastro.

### Tarefa
A entidade "Tarefa" é o foco da aplicação. Ela está formalmente definida na classe `Tarefa`, sendo usada nos casos de criação e manipulação de tarefas.

---

## 2. Estrutura de Dados e Dados Simulados

### Campos de Dados

#### Usuário
- `nome`: Nome completo do usuário (Cadastro).
- `email`: Utilizado para login e cadastro.
- `senha`: Usada para autenticação.
- `confirmarSenha`: Valida a digitação correta da senha (Cadastro).

#### Tarefa
- `titulo`: Nome da tarefa.
- `descricao`: Descrição mais detalhada sobre a tarefa desempenhada.
- `prazo`: Data em que o usuário estipula para cumprir o que designou.

### Dados Simulados (Mock)
Para facilitar o desenvolvimento e testes iniciais, utilizei alguns dados fictícios:

- Na tela **LoginScreen.tsx**, as credenciais aceitas são:
  - Email: `gabriel@gmail.com`
  - Senha: `gabriel123`
- As telas de **Cadastro** e **Tarefas** simulam ações como salvamento e cadastro por meio de logs no console e mensagens de sucesso, porém ainda não há salvamento algum de fato.

---

## 3. Design das Telas

A interface foi pensada para ser clara, funcional e com visual consistente, visto que a aplicação que escolhi é de fato simples, porém de grande importância na organização pessoal e profissional do usuário que a utilizar. A estilização foi feita com `StyleSheet` do React Native em cada tela.

### LoginScreen.tsx
- Título em destaque.
- Formulário com campos de email e senha.
- Fundo suave (`#E6F3FF`) nos campos de entrada.
- Botão **"Entrar"**, link para cadastro e área para mensagens de erro.

### CadastroScreen.tsx
- Segue a estrutura do login.
- Formulário para nome, email, senha e confirmação de senha.
- Botão **"Cadastrar"**, link para voltar ao login, e mensagens de sucesso/erro.

### TarefasScreen.tsx
- Título **"Lista de Tarefas"**.
- Formulário para adicionar novas tarefas com os campos de título, descrição e prazo.
- Botão **"Salvar Tarefa"** e um botão **"Sair"** fixado na parte inferior.

### Detalhes Visuais Comuns
- Campos com bordas, preenchimento e rótulos claros.
- Paleta de cores centrada em tons de azul (para destaques) e cores neutras para fundos e textos, assim como foi definido no briefing.

---

## 4. Implementação das Telas e Navegação

### Telas

#### LoginScreen.tsx
- Captura os dados inseridos pelo usuário.
- Valida o login com dados mockados.
- Em caso de sucesso, redireciona para a tela de tarefas. Caso contrário, alega que o usuário está incorreto ou não cadastrado.
- Permite navegação para a tela de cadastro.

#### CadastroScreen.tsx
- Gerencia os dados de cadastro com validações básicas.
- Exibe mensagens de erro ou sucesso.
- Permite voltar à tela de login.

#### TarefasScreen.tsx
- Permite criar e salvar novas tarefas.
- A ação de "Sair" redireciona o usuário ao login e limpa a pilha de navegação, impedindo o retorno com o botão "voltar".

### Navegação

A navegação é controlada pelo arquivo **AppNavigator.tsx**, que utiliza `createNativeStackNavigator` da biblioteca `@react-navigation/native-stack`.

- Rotas definidas:
  - **Login** (inicial, sem cabeçalho)
  - **Cadastro** (com título "Crie sua Conta")
  - **Tarefas** (com título "Minhas Tarefas")

O arquivo **App.tsx** encapsula o `AppNavigator` dentro de um `NavigationContainer`, essencial para o funcionamento da navegação.

A tipagem das rotas e seus parâmetros (`RootStackParamList`) também é definida em **AppNavigator.tsx**, garantindo **segurança de tipo** nas telas.
