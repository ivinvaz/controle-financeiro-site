# Controle Financeiro

Aplicação web de controle financeiro pessoal, focada no gerenciamento de receitas, despesas e metas financeiras. O sistema conta com gráficos para análise visual dos dados e permite acompanhar o progresso de metas definidas pelo usuário.

## Visão Geral

A aplicação permite que o usuário:

- Registre receitas e despesas de forma organizada;
- Visualize gráficos de análise financeira;
- Crie e acompanhe metas financeiras, com progresso visual até o objetivo ser atingido;
- Tenha uma visão consolidada da sua saúde financeira ao longo do tempo.

O backend expõe uma API REST que centraliza toda a lógica de autenticação, persistência e regras de negócio, enquanto o frontend consome essa API para exibir os dados de forma interativa.

## Tecnologias Utilizadas

### Backend

- **Node.js** com **Express** — servidor HTTP e definição de rotas;
- **MongoDB** com **Mongoose** — banco de dados e modelagem de schemas;
- **JWT (jsonwebtoken)** — autenticação e validação de sessões;
- **bcrypt** — hash seguro de senhas;
- **Swagger (swagger-ui-express + yamljs)** — documentação interativa da API;
- **Morgan** — logging de requisições HTTP;
- **Cookie-parser** — manipulação de cookies;
- **Dotenv** — carregamento de variáveis de ambiente;
- **Jest** + **Supertest** — testes automatizados;
- **Nodemon** — hot-reload em ambiente de desenvolvimento.

### Frontend

- **React 19** — biblioteca para construção da interface;
- **Vite** — build tool e dev server;
- **React Router DOM** — roteamento entre páginas;
- **React Hook Form** — gerenciamento de formulários;
- **Axios** — chamadas HTTP para a API do backend;
- **Chart.js** + **react-chartjs-2** — gráficos de análise financeira;
- **Tailwind CSS** — estilização utilitária;
- **Lucide React** — ícones;
- **ESLint** — padronização e qualidade de código.

### Infraestrutura

- **Docker** e **Docker Compose** — orquestração dos containers (frontend, backend e banco de dados);
- **MongoDB 8** — imagem oficial utilizada no container do banco de dados.

## Como Configurar o Projeto

### Pré-requisitos

- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados na máquina.

### 1. Clonar o repositório

```bash
git clone https://github.com/ivinvaz/controle-financeiro-site.git
cd controle-financeiro-site
```

### 2. Criar o arquivo `.env`

Na raiz do projeto, existe um arquivo `.env.example` com todas as variáveis necessárias. Copie-o para um novo arquivo `.env`:

```bash
cp .env.example .env
```

### 3. Preencher as variáveis de ambiente

Abra o arquivo `.env` e ajuste os valores indicados entre `<>`:

```env
# Nome do usuário ROOT do banco de dados
MONGO_INITDB_ROOT_USERNAME=<username>

# Senha do usuário ROOT do banco de dados
MONGO_INITDB_ROOT_PASSWORD=<password>

# URL para conexão do banco de dados
# Substitua <username>, <password> e <nome_do_seu_banco> pelos valores escolhidos acima
DATABASE_URL=mongodb://<username>:<password>@db:27017/<nome_do_seu_banco>?authSource=admin

# Segredo utilizado para validar conexões com o JWT
# Recomenda-se gerar um valor aleatório e seguro, por exemplo com:
# node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=<your_jwt_secret_key>

# Porta em que o backend será exposto
PORT=8000

# URL do backend usada pelo proxy do Vite em desenvolvimento
# Deve apontar para o nome do serviço backend dentro da rede do Docker Compose
VITE_BACKEND_URL=http://backend:8000

# Base URL usada pelas chamadas Axios no frontend
# Em desenvolvimento, mantenha "/api" para usar o proxy configurado no vite.config.js
VITE_API_BASE_URL=/api
```

> **Observação:** o nome do banco de dados (`<nome_do_seu_banco>`) pode ser qualquer valor de sua escolha. O MongoDB cria o banco automaticamente na primeira escrita de dados, não havendo necessidade de criá-lo manualmente.

### 4. Construir e iniciar os containers

Com o `.env` preenchido, suba a aplicação com:

```bash
docker compose up --build
```

Esse comando vai:

- Criar o container do **MongoDB** (`mongodb`), com volume persistente para os dados;
- Buildar e iniciar o container do **backend** (`backend-node`), expondo a porta `8000`;
- Buildar e iniciar o container do **frontend** (`frontend-node`), expondo a porta `5173`.

Para rodar em segundo plano (sem travar o terminal):

```bash
docker compose up --build -d
```

### 5. Acessar a aplicação

| Serviço | URL |
|---|---|
| Frontend (interface web) | http://localhost:5173 |
| Backend (API) | http://localhost:8000/api |
| Documentação da API (Swagger) | http://localhost:8000/api-docs |

### Comandos úteis

```bash
# Parar os containers
docker compose down

# Parar os containers e remover o volume do banco (apaga os dados!)
docker compose down -v

# Ver logs de todos os serviços
docker compose logs -f

# Ver logs de um serviço específico
docker compose logs -f backend

# Reconstruir um serviço específico após alterar dependências
docker compose up --build backend
```

## Documentação da API

A documentação completa e interativa de todas as rotas da API está disponível via Swagger, após os containers estarem em execução:

➡️ **http://localhost:8000/api-docs**

Nela é possível visualizar todos os endpoints disponíveis, seus parâmetros, corpos de requisição esperados e testar as chamadas diretamente pelo navegador.

## Estrutura de Containers

| Container | Serviço | Porta | Descrição |
|---|---|---|---|
| `mongodb` | `db` | 27017 | Banco de dados MongoDB |
| `backend-node` | `backend` | 8000 | API REST em Node.js/Express |
| `frontend-node` | `frontend` | 5173 | Interface React servida pelo Vite |

Os três serviços compartilham a mesma rede interna do Docker Compose, permitindo que se comuniquem entre si pelo nome do serviço (`db`, `backend`, `frontend`), sem necessidade de configuração de rede adicional.
