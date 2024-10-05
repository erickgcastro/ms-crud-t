# Gerenciamento de Documentos

Este projeto é uma API para gerenciamento de documentos, desenvolvida em TypeScript com Express. A API permite realizar operações como criar, ler, atualizar e excluir documentos, enquanto assegura que apenas usuários autenticados possam acessar as funcionalidades. Para simular um banco de dados, foi utilizado o SQLite, uma solução leve que oferece a estrutura de um banco de dados real, melhorando a organização e a persistência dos dados em comparação ao uso de objetos ou arrays em memória.

Após a inicialização do projeto, a documentação da API poderá ser acessada em:

```bash
http://localhost:5000/api-docs
```

## Executando o Projeto Localmente

Para executar o projeto localmente em sua máquina, serão mostradas duas formas de inicializar o projeto: uma com Docker e outra sem. É recomendado usar o Docker, pois proporciona um ambiente mais rápido e isolado para a execução da aplicação.

### Pré-requisitos

- Ter o Docker em sua máquina antes de prosseguir. (pré-requisito para quem deseja usar a opção com Docker)
- Certifique-se de ter as portas 3000 e 5000 livres em sua máquina antes de prosseguir.

### Iniciando com Docker

1. Clone o repositório do projeto para o seu ambiente de desenvolvimento:

   ```bash
   git clone https://github.com/erickgcastro/payment-api.git
   ```

2. Navegue até o diretório raiz do projeto;

3. Inicie o projeto usando o Docker Compose:

   ```bash
   docker compose up
   ```

   Isso iniciará os contêineres necessários para executar o frontend e o backend do projeto;

4. Após o processo de inicialização ser concluído, você poderá acessar a plataforma em seu navegador web através do seguinte endereço:

   ```bash
   http://localhost:3000
   ```

### Iniciando sem Docker

1. Clone o repositório do projeto para o seu ambiente de desenvolvimento:

   ```bash
   git clone https://github.com/erickgcastro/payment-api.git
   ```

2. Navegue até o diretório do backend;

3. Inicie o backend:

   ```bash
   npm run start:local
   ```

4. Navegue até o diretório do frontend;

5. Inicie o frontend:

   ```bash
   npm run start:local
   ```

   Isso iniciará os serviços necessários para executar o projeto;

6. Após o processo de inicialização ser concluído, você poderá acessar a plataforma em seu navegador web através do seguinte endereço:

   ```bash
   http://localhost:3000
   ```
