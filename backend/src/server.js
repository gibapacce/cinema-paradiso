/**
 * 🎬 Cinema Reservas - Servidor Principal
 * 
 * Este arquivo configura e inicializa o servidor Express.js que gerencia
 * todas as requisições da API do sistema de reservas de cinema.
 * 
 * @author Gilberto Filho
 * @version 1.0.0
 */

// Importações necessárias
const express = require("express");           // Framework web para Node.js
const cors = require("cors");                 // Middleware para permitir requisições cross-origin
require("dotenv").config();                   // Carrega variáveis de ambiente do arquivo .env

// Importa as rotas da aplicação
const cinemaRoutes = require("./routes/cinema");

// Cria uma instância do Express
const app = express();

// Define a porta do servidor (usa variável de ambiente ou padrão 3001)
const PORT = process.env.PORT || 3001;

/**
 * Configuração de Middlewares
 * Middlewares são funções que processam requisições antes de chegarem às rotas
 */

// Middleware CORS - Permite requisições de diferentes origens (frontend)
app.use(cors());

// Middleware JSON - Permite que o servidor processe dados JSON nas requisições
app.use(express.json());

/**
 * Configuração das Rotas
 * Define os endpoints da API
 */

// Prefixa todas as rotas de cinema com '/api'
// Exemplo: /api/filmes, /api/filmes/1/sessoes, etc.
app.use("/api", cinemaRoutes);

/**
 * Middleware de Tratamento de Erros
 * Captura e trata erros que ocorrem durante o processamento das requisições
 */
app.use((error, req, res, next) => {
  // Loga o erro no console para debugging
  console.error("Erro:", error);
  
  // Retorna erro 500 (Internal Server Error) para o cliente
  res.status(500).json({ error: "Erro interno do servidor" });
});

/**
 * Inicialização do Servidor
 * Inicia o servidor na porta especificada
 */
app.listen(PORT, () => {
  console.log(`🎬 Servidor Cinema Reservas rodando na porta ${PORT}`);
  console.log(`📡 API disponível em: http://localhost:${PORT}/api`);
});
