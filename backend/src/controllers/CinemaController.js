const CinemaService = require("../services/CinemaService");

class CinemaController {
  constructor() {
    this.cinemaService = new CinemaService();
  }

  listarFilmes = async (req, res) => {
    try {
      const filmes = await this.cinemaService.listarFilmes();
      res.json({ filmes });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  listarSessoes = async (req, res) => {
    try {
      const { filmeId } = req.params;
      const { data } = req.query;

      const resultado = await this.cinemaService.listarSessoes(filmeId, data);
      res.json(resultado);
    } catch (error) {
      if (error.message === "Filme não encontrado") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };

  visualizarAssentos = async (req, res) => {
    try {
      const { sessaoId } = req.params;

      const resultado = await this.cinemaService.visualizarAssentos(sessaoId);
      res.json(resultado);
    } catch (error) {
      if (error.message === "Sessão não encontrada") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };

  reservarAssento = async (req, res) => {
    try {
      const { sessaoId } = req.params;
      const { assento_id } = req.body;

      const reserva = await this.cinemaService.reservarAssento(
        sessaoId,
        assento_id
      );

      res.status(201).json({
        reserva: {
          id: reserva.id,
          sessao_id: reserva.sessao_id,
          assento_id: reserva.assento_id,
          assento: {
            numero: reserva.numero,
            fileira: reserva.fileira,
          },
          data_reserva: reserva.data_reserva,
          status: reserva.status,
        },
      });
    } catch (error) {
      if (
        error.message.includes("já reservado") ||
        error.message.includes("indisponível")
      ) {
        res.status(409).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  };
}

module.exports = CinemaController;
