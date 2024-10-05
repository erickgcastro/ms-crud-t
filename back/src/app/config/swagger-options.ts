const swaggerOptions = {
  openapi: "3.0.0",
  info: {
    title: "MS-CRUD-T Doc",
    version: "1.0.0",
    description:
      "Esta API fornece operações básicas de gerenciamento de documentos, incluindo a criação, leitura, atualização e exclusão (CRUD). Ela permite que os usuários se autentiquem usando JSON Web Tokens (JWT) para garantir que apenas usuários autorizados possam acessar e modificar os documentos. A documentação inclui detalhes sobre as rotas disponíveis, os dados esperados e as respostas.",
  },
  servers: [
    {
      url: "http://localhost:" + (process.env.PORT || 5000) + "/api",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    "/auth/signin": {
      post: {
        summary: "Autenticação de usuário",
        description:
          "Esta rota realiza a autenticação de um usuário existente no sistema com base no email e senha. Se as credenciais estiverem corretas, retorna um token de acesso (JWT). O token é válido por 1 hora.",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    example: "example@email.com",
                    description: "Endereço de email válido do usuário cadastrado.",
                  },
                  password: {
                    type: "string",
                    example: "senha123",
                    description: "Senha do usuário. Deve ter no mínimo 3 caracteres.",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Autenticação bem-sucedida. Retorna um token de acesso JWT.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    access_token: {
                      type: "string",
                      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                      description: "Token de acesso JWT válido por 1 hora.",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description:
              "Erro de validação no corpo da requisição ou credenciais inválidas (email ou senha incorretos).",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    errorMessage: {
                      type: "string",
                      example: "Invalid email or password",
                      description: "Mensagem de erro descrevendo o problema.",
                    },
                    statusCode: {
                      type: "integer",
                      example: 400,
                      description: "Código de status HTTP.",
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Erro interno do servidor.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error_code: {
                      type: "string",
                      example: "INTER_SERVER_ERROR",
                      description: "Código de erro do servidor.",
                    },
                    error_description: {
                      type: "string",
                      example: "An unexpected error occurred",
                      description: "Descrição do erro interno.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/users": {
      post: {
        summary: "Criação de um novo usuário",
        description:
          "Esta rota cria um novo usuário no sistema e retorna um token de acesso (JWT). Para criar o usuário, os campos 'name', 'email' e 'password' são obrigatórios. A senha deve ter pelo menos 3 caracteres e o email deve ser válido.",
        tags: ["Usuários"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    example: "Example Silva Santos",
                    description:
                      "Nome completo do usuário. Deve ter no mínimo 3 caracteres.",
                  },
                  email: {
                    type: "string",
                    example: "example@email.com",
                    description: "Endereço de email válido.",
                  },
                  password: {
                    type: "string",
                    example: "senha123",
                    description: "Senha do usuário. Deve ter no mínimo 3 caracteres.",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description:
              "Usuário criado com sucesso. Retorna um token de acesso JWT válido por 1 hora.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    access_token: {
                      type: "string",
                      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                      description: "Token de acesso JWT para autenticação.",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Erro de validação no corpo da requisição ou email inválido.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    errorMessage: {
                      type: "string",
                      example: "Invalid email",
                      description: "Mensagem de erro descrevendo o problema.",
                    },
                    statusCode: {
                      type: "integer",
                      example: 400,
                      description: "Código de status HTTP.",
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Erro interno do servidor.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error_code: {
                      type: "string",
                      example: "INTER_SERVER_ERROR",
                      description: "Código de erro do servidor.",
                    },
                    error_description: {
                      type: "string",
                      example: "An unexpected error occurred",
                      description: "Descrição do erro interno.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      put: {
        summary: "Atualiza os dados do usuário autenticado",
        description:
          "Esta rota permite atualizar o nome ou email do usuário autenticado. O token de acesso (JWT) deve ser enviado no cabeçalho `Authorization` como um Bearer token. Se o email informado já estiver sendo usado por outra conta, retorna um erro.",
        tags: ["Usuários"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    example: "João Silva",
                    description: "Nome do usuário, opcional, com no mínimo 3 caracteres.",
                  },
                  email: {
                    type: "string",
                    example: "joao.silva@email.com",
                    description: "Endereço de email válido, opcional.",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Usuário atualizado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "OK",
                      description: "Confirmação de que a atualização foi bem-sucedida.",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description:
              "Erro de validação no corpo da requisição ou email já utilizado por outra conta.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    errorMessage: {
                      type: "string",
                      example: "Invalid email",
                      description: "Mensagem de erro descrevendo o problema com o email.",
                    },
                    statusCode: {
                      type: "integer",
                      example: 400,
                      description: "Código de status HTTP.",
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Token inválido ou ausente.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    errorMessage: {
                      type: "string",
                      example: "Invalid token",
                      description: "Mensagem de erro descrevendo o problema com o token.",
                    },
                    statusCode: {
                      type: "integer",
                      example: 401,
                      description: "Código de status HTTP.",
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Erro interno do servidor.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error_code: {
                      type: "string",
                      example: "INTER_SERVER_ERROR",
                      description: "Código de erro do servidor.",
                    },
                    error_description: {
                      type: "string",
                      example: "An unexpected error occurred",
                      description: "Descrição do erro interno.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Deleta o usuário autenticado",
        description:
          "Esta rota permite deletar a conta do usuário autenticado. O token de acesso (JWT) deve ser enviado no cabeçalho `Authorization` como um Bearer token. Se o token for inválido, retorna um erro.",
        tags: ["Usuários"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Usuário deletado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "OK",
                      description: "Confirmação de que a deleção foi bem-sucedida.",
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Token inválido ou ausente.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    errorMessage: {
                      type: "string",
                      example: "Invalid token",
                      description: "Mensagem de erro descrevendo o problema com o token.",
                    },
                    statusCode: {
                      type: "integer",
                      example: 401,
                      description: "Código de status HTTP.",
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Erro interno do servidor.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error_code: {
                      type: "string",
                      example: "INTER_SERVER_ERROR",
                      description: "Código de erro do servidor.",
                    },
                    error_description: {
                      type: "string",
                      example: "An unexpected error occurred",
                      description: "Descrição do erro interno.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/users/me": {
      get: {
        summary: "Busca os dados do usuário autenticado",
        description:
          "Esta rota permite buscar as informações do usuário com base no token de acesso (JWT). O token deve ser enviado no cabeçalho `Authorization` como um Bearer token.",
        tags: ["Usuários"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Retorna os dados do usuário autenticado.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      example: "123e4567-e89b-12d3-a456-426614174000",
                      description: "ID do usuário.",
                    },
                    name: {
                      type: "string",
                      example: "Example Silva Santos",
                      description: "Nome completo do usuário.",
                    },
                    email: {
                      type: "string",
                      example: "example@email.com",
                      description: "Endereço de email do usuário.",
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Token inválido ou ausente. O usuário não foi autenticado.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    errorMessage: {
                      type: "string",
                      example: "Invalid token",
                      description: "Mensagem de erro descrevendo o problema com o token.",
                    },
                    statusCode: {
                      type: "integer",
                      example: 401,
                      description: "Código de status HTTP.",
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Erro interno do servidor.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error_code: {
                      type: "string",
                      example: "INTER_SERVER_ERROR",
                      description: "Código de erro do servidor.",
                    },
                    error_description: {
                      type: "string",
                      example: "An unexpected error occurred",
                      description: "Descrição do erro interno.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/users/documents": {
      post: {
        summary: "Cria um novo documento",
        description:
          "Esta rota permite criar um novo documento associado ao usuário autenticado. O token de acesso (JWT) deve ser enviado no cabeçalho `Authorization` como um Bearer token. Se o token for inválido, retorna um erro.",
        tags: ["Documentos"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    example: "Documento Importante",
                    description: "Nome do documento, com no mínimo 3 caracteres.",
                  },
                  status: {
                    type: "boolean",
                    example: true,
                    description: "Status do documento (ativo ou inativo).",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Documento criado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      example: "1234567890",
                      description: "ID do documento criado.",
                    },
                    name: {
                      type: "string",
                      example: "Documento Importante",
                      description: "Nome do documento.",
                    },
                    status: {
                      type: "boolean",
                      example: true,
                      description: "Status do documento.",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Erro de validação no corpo da requisição.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    errorMessage: {
                      type: "string",
                      example: "Invalid body",
                      description:
                        "Mensagem de erro descrevendo o problema com o corpo da requisição.",
                    },
                    statusCode: {
                      type: "integer",
                      example: 400,
                      description: "Código de status HTTP.",
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Token inválido ou ausente.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    errorMessage: {
                      type: "string",
                      example: "Invalid token",
                      description: "Mensagem de erro descrevendo o problema com o token.",
                    },
                    statusCode: {
                      type: "integer",
                      example: 401,
                      description: "Código de status HTTP.",
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Erro interno do servidor.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error_code: {
                      type: "string",
                      example: "INTER_SERVER_ERROR",
                      description: "Código de erro do servidor.",
                    },
                    error_description: {
                      type: "string",
                      example: "An unexpected error occurred",
                      description: "Descrição do erro interno.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      get: {
        summary: "Lista documentos do usuário autenticado",
        description:
          "Esta rota permite listar os documentos associados ao usuário autenticado. O token de acesso (JWT) deve ser enviado no cabeçalho `Authorization` como um Bearer token. Se o token for inválido, retorna um erro. É possível usar os parâmetros de consulta `page` e `limit` para paginar os resultados.",
        tags: ["Documentos"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "page",
            in: "query",
            required: false,
            description: "Número da página que deseja retornar.",
            schema: {
              type: "integer",
              example: 1,
            },
          },
          {
            name: "limit",
            in: "query",
            required: false,
            description: "Número máximo de documentos a serem retornados por página.",
            schema: {
              type: "integer",
              example: 10,
            },
          },
        ],
        responses: {
          "200": {
            description: "Lista de documentos do usuário autenticado.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        example: "1234567890",
                        description: "ID do documento.",
                      },
                      name: {
                        type: "string",
                        example: "Documento Importante",
                        description: "Nome do documento.",
                      },
                      status: {
                        type: "boolean",
                        example: true,
                        description: "Status do documento (ativo ou inativo).",
                      },
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Erro de validação nos parâmetros de consulta.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    errorMessage: {
                      type: "string",
                      example: "Invalid queries",
                      description:
                        "Mensagem de erro descrevendo o problema com os parâmetros de consulta.",
                    },
                    statusCode: {
                      type: "integer",
                      example: 400,
                      description: "Código de status HTTP.",
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Token inválido ou ausente.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    errorMessage: {
                      type: "string",
                      example: "Invalid token",
                      description: "Mensagem de erro descrevendo o problema com o token.",
                    },
                    statusCode: {
                      type: "integer",
                      example: 401,
                      description: "Código de status HTTP.",
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Erro interno do servidor.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error_code: {
                      type: "string",
                      example: "INTER_SERVER_ERROR",
                      description: "Código de erro do servidor.",
                    },
                    error_description: {
                      type: "string",
                      example: "An unexpected error occurred",
                      description: "Descrição do erro interno.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/users/documents/{id}": {
      put: {
        summary: "Atualiza um documento",
        description:
          "Esta rota permite atualizar um documento associado ao usuário autenticado. O token de acesso (JWT) deve ser enviado no cabeçalho `Authorization` como um Bearer token. Se o token for inválido ou o documento não for encontrado, retorna um erro.",
        tags: ["Documentos"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID do documento a ser atualizado.",
            schema: {
              type: "string",
              example: "1234567890",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    example: "Documento Atualizado",
                    description: "Nome do documento, com no mínimo 3 caracteres.",
                  },
                  status: {
                    type: "boolean",
                    example: false,
                    description: "Status do documento (ativo ou inativo).",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Documento atualizado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "OK",
                      description:
                        "Mensagem indicando que a atualização foi bem-sucedida.",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Erro de validação no corpo da requisição.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    errorMessage: {
                      type: "string",
                      example: "Invalid body",
                      description:
                        "Mensagem de erro descrevendo o problema com o corpo da requisição.",
                    },
                    statusCode: {
                      type: "integer",
                      example: 400,
                      description: "Código de status HTTP.",
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Token inválido ou ausente.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    errorMessage: {
                      type: "string",
                      example: "Invalid token",
                      description: "Mensagem de erro descrevendo o problema com o token.",
                    },
                    statusCode: {
                      type: "integer",
                      example: 401,
                      description: "Código de status HTTP.",
                    },
                  },
                },
              },
            },
          },
          "404": {
            description: "Documento não encontrado.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    errorMessage: {
                      type: "string",
                      example: "Document not found",
                      description:
                        "Mensagem de erro indicando que o documento especificado não foi encontrado.",
                    },
                    statusCode: {
                      type: "integer",
                      example: 404,
                      description: "Código de status HTTP.",
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Erro interno do servidor.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error_code: {
                      type: "string",
                      example: "INTER_SERVER_ERROR",
                      description: "Código de erro do servidor.",
                    },
                    error_description: {
                      type: "string",
                      example: "An unexpected error occurred",
                      description: "Descrição do erro interno.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Exclui um documento",
        description:
          "Esta rota permite excluir um documento associado ao usuário autenticado. O token de acesso (JWT) deve ser enviado no cabeçalho `Authorization` como um Bearer token. Se o token for inválido ou o documento não for encontrado, retorna um erro.",
        tags: ["Documentos"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID do documento a ser excluído.",
            schema: {
              type: "string",
              example: "1234567890",
            },
          },
        ],
        responses: {
          "200": {
            description: "Documento excluído com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "OK",
                      description: "Mensagem indicando que a exclusão foi bem-sucedida.",
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Token inválido ou ausente.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    errorMessage: {
                      type: "string",
                      example: "Invalid token",
                      description: "Mensagem de erro descrevendo o problema com o token.",
                    },
                    statusCode: {
                      type: "integer",
                      example: 401,
                      description: "Código de status HTTP.",
                    },
                  },
                },
              },
            },
          },
          "404": {
            description: "Documento não encontrado.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    errorMessage: {
                      type: "string",
                      example: "Document not found",
                      description:
                        "Mensagem de erro indicando que o documento especificado não foi encontrado.",
                    },
                    statusCode: {
                      type: "integer",
                      example: 404,
                      description: "Código de status HTTP.",
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Erro interno do servidor.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error_code: {
                      type: "string",
                      example: "INTER_SERVER_ERROR",
                      description: "Código de erro do servidor.",
                    },
                    error_description: {
                      type: "string",
                      example: "An unexpected error occurred",
                      description: "Descrição do erro interno.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}

export default swaggerOptions
