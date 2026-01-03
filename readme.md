src/
├── @types/          # Tipagens globais do Express
├── config/          # Configurações (Knex, Env vars)
├── controllers/     # Recebe req/res e chama o service
├── database/        # Arquivos do Knex
│   ├── migrations/  # Criação das tabelas
│   └── seeds/       # Dados iniciais (ex: categorias padrão)
├── middlewares/     # Autenticação (JWT) e validação de dados
├── routes/          # Definição dos endpoints
├── services/        # A LÓGICA BRUTA (cálculos, regras de negócio)
└── server.ts        # Ponto de entrada
