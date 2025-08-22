/**
 * 🎬 Cinema Reservas - Serviço Principal
 * 
 * Este arquivo contém a lógica de negócio do sistema de reservas de cinema.
 * O serviço coordena as operações entre os controladores e os repositórios,
 * implementando as regras de negócio da aplicação.
 * 
 * @author Gilberto Filho
 * @version 1.0.0
 */

// Importa os repositórios para acesso aos dados
const FilmeRepository = require("../repositories/FilmeRepository");
const SessaoRepository = require("../repositories/SessaoRepository");
const AssentoRepository = require("../repositories/AssentoRepository");
const ReservaRepository = require("../repositories/ReservaRespository");

/**
 * Classe CinemaService
 * Contém toda a lógica de negócio da aplicação
 */
class CinemaService {
  constructor() {
    // Inicializa os repositórios para acesso aos dados
    this.filmeRepo = new FilmeRepository();
    this.sessaoRepo = new SessaoRepository();
    this.assentoRepo = new AssentoRepository();
    this.reservaRepo = new ReservaRepository();
  }

  /**
   * Busca todos os filmes ativos em cartaz
   * 
   * @returns {Array} Array com todos os filmes ativos
   * @throws {Error} Erro se não conseguir buscar os filmes
   */
  async listarFilmes() {
    // Chama o repositório para buscar filmes ativos
    return await this.filmeRepo.findAtivos();
  }

  /**
   * Busca todas as sessões disponíveis para um filme específico
   * 
   * @param {number} filmeId - ID do filme
   * @param {string} data - Data específica (opcional)
   * @returns {Object} Objeto contendo o filme e suas sessões
   * @throws {Error} Erro se o filme não for encontrado
   */
  async listarSessoes(filmeId, data) {
    // Primeiro, verifica se o filme existe
    const filme = await this.filmeRepo.findById(filmeId);
    if (!filme) {
      throw new Error("Filme não encontrado");
    }

    // Busca as sessões do filme
    const sessoes = await this.sessaoRepo.findByFilme(filmeId, data);

    // Retorna o filme junto com suas sessões
    return { filme, sessoes };
  }

  /**
   * Visualiza o layout completo de assentos de uma sessão
   * 
   * @param {number} sessaoId - ID da sessão
   * @returns {Object} Objeto contendo dados da sessão e layout de assentos
   * @throws {Error} Erro se a sessão não for encontrada
   */
  async visualizarAssentos(sessaoId) {
    // Primeiro, verifica se a sessão existe
    const sessao = await this.sessaoRepo.findById(sessaoId);
    if (!sessao) {
      throw new Error("Sessão não encontrada");
    }

    // Busca todos os assentos da sessão
    const assentos = await this.assentoRepo.findBySessao(sessaoId);

    // Organiza os assentos por fileira para facilitar a visualização
    const fileiras = {};
    assentos.forEach((assento) => {
      // Se a fileira não existe, cria um array vazio
      if (!fileiras[assento.fileira]) {
        fileiras[assento.fileira] = [];
      }
      // Adiciona o assento à sua fileira
      fileiras[assento.fileira].push(assento);
    });

    // Retorna os dados organizados
    return {
      sessao,
      layout: {
        // Lista ordenada de fileiras (A, B, C, D, E)
        fileiras: Object.keys(fileiras).sort(),
        // Número de assentos por fileira (baseado na primeira fileira)
        assentos_por_fileira: fileiras[Object.keys(fileiras)[0]]?.length || 0,
        // Lista completa de assentos
        assentos,
      },
    };
  }

  /**
   * Reserva um assento específico para uma sessão
   * 
   * @param {number} sessaoId - ID da sessão
   * @param {number} assentoId - ID do assento
   * @returns {Object} Dados da reserva criada
   * @throws {Error} Erro se o assento não estiver disponível ou já estiver reservado
   */
  async reservarAssento(sessaoId, assentoId) {
    // Chama o repositório para criar a reserva com transação
    // A transação garante que não haverá conflitos se múltiplos usuários
    // tentarem reservar o mesmo assento simultaneamente
    return await this.reservaRepo.createWithTransaction(sessaoId, assentoId);
  }
}

module.exports = CinemaService;
