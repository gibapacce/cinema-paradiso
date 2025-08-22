/**
 * 🎬 Cinema Reservas - Controlador Principal
 * 
 * Este arquivo contém os controladores que gerenciam as requisições HTTP
 * da API do sistema de reservas de cinema. Cada método corresponde a um
 * endpoint específico da API.
 * 
 * @author Gilberto Filho
 * @version 1.0.0
 */

const CinemaService = require("../services/CinemaService");

/**
 * Classe CinemaController
 * Responsável por receber requisições HTTP e coordenar as respostas
 */
class CinemaController {
  constructor() {
    // Instancia o serviço que contém a lógica de negócio
    this.cinemaService = new CinemaService();
  }

  /**
   * Lista todos os filmes ativos em cartaz
   * 
   * @param {Object} req - Objeto de requisição Express
   * @param {Object} res - Objeto de resposta Express
   * @returns {Object} JSON com array de filmes
   * 
   * Endpoint: GET /api/filmes
   */
  listarFilmes = async (req, res) => {
    try {
      // Chama o serviço para buscar filmes ativos
      const filmes = await this.cinemaService.listarFilmes();

      // Retorna os filmes em formato JSON
      res.json({ filmes });
    } catch (error) {
      // Em caso de erro, retorna status 500 com mensagem de erro
      res.status(500).json({ error: error.message });
    }
  };

  /**
   * Lista todas as sessões disponíveis para um filme específico
   * 
   * @param {Object} req - Objeto de requisição Express
   * @param {Object} res - Objeto de resposta Express
   * @returns {Object} JSON com filme e suas sessões
   * 
   * Endpoint: GET /api/filmes/:filmeId/sessoes
   */
  listarSessoes = async (req, res) => {
    try {
      // Extrai o ID do filme dos parâmetros da URL
      const { filmeId } = req.params;

      // Extrai a data dos query parameters (opcional)
      const { data } = req.query;

      // Chama o serviço para buscar sessões do filme
      const resultado = await this.cinemaService.listarSessoes(filmeId, data);

      // Retorna o resultado em formato JSON
      res.json(resultado);
    } catch (error) {
      // Tratamento específico para filme não encontrado
      if (error.message === "Filme não encontrado") {
        res.status(404).json({ error: error.message });
      } else {
        // Outros erros retornam status 500
        res.status(500).json({ error: error.message });
      }
    }
  };

  /**
   * Visualiza o layout de assentos de uma sessão específica
   * 
   * @param {Object} req - Objeto de requisição Express
   * @param {Object} res - Objeto de resposta Express
   * @returns {Object} JSON com sessão e layout de assentos
   * 
   * Endpoint: GET /api/sessoes/:sessaoId/assentos
   */
  visualizarAssentos = async (req, res) => {
    try {
      // Extrai o ID da sessão dos parâmetros da URL
      const { sessaoId } = req.params;

      // Chama o serviço para buscar dados da sessão e layout de assentos
      const resultado = await this.cinemaService.visualizarAssentos(sessaoId);

      // Retorna o resultado em formato JSON
      res.json(resultado);
    } catch (error) {
      // Tratamento específico para sessão não encontrada
      if (error.message === "Sessão não encontrada") {
        res.status(404).json({ error: error.message });
      } else {
        // Outros erros retornam status 500
        res.status(500).json({ error: error.message });
      }
    }
  };

  /**
   * Reserva um assento específico para uma sessão
   * 
   * @param {Object} req - Objeto de requisição Express
   * @param {Object} res - Objeto de resposta Express
   * @returns {Object} JSON com dados da reserva criada
   * 
   * Endpoint: POST /api/sessoes/:sessaoId/reservas
   */
  reservarAssento = async (req, res) => {
    try {
      // Extrai o ID da sessão dos parâmetros da URL
      const { sessaoId } = req.params;

      // Extrai o ID do assento do corpo da requisição
      const { assento_id } = req.body;

      // Chama o serviço para criar a reserva
      const reserva = await this.cinemaService.reservarAssento(
        sessaoId,
        assento_id
      );

      // Retorna status 201 (Created) com os dados da reserva
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
      // Tratamento específico para conflitos de reserva
      if (
        error.message.includes("já reservado") ||
        error.message.includes("indisponível")
      ) {
        // Status 409 (Conflict) para assentos já reservados
        res.status(409).json({ error: error.message });
      } else {
        // Outros erros retornam status 400 (Bad Request)
        res.status(400).json({ error: error.message });
      }
    }
  };
}

module.exports = CinemaController;
