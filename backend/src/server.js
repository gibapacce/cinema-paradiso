const express = require("express");
const cors = require("cors");
require("dotenv").config();

const cinemaRoutes = require("./routes/cinema");

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api", cinemaRoutes);

// Middleware de erro
app.use((error, req, res, next) => {
  console.error("Erro:", error);
  res.status(500).json({ error: "Erro interno do servidor" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
