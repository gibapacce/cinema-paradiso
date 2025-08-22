const express = require("express");
const CinemaController = require("../controllers/CinemaController");

const router = express.Router();
const cinemaController = new CinemaController();

router.get("/filmes", cinemaController.listarFilmes);
router.get("/filmes/:filmeId/sessoes", cinemaController.listarSessoes);
router.get("/sessoes/:sessaoId/assentos", cinemaController.visualizarAssentos);
router.post("/sessoes/:sessaoId/reservas", cinemaController.reservarAssento);

module.exports = router;
