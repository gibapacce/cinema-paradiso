/**
 * 🎬 Cinema Reservas - Repositório de Filmes
 * 
 * Este arquivo contém a camada de acesso a dados para a entidade Filme.
 * Responsável por todas as operações de banco de dados relacionadas aos filmes,
 * incluindo fallback para dados mockados quando o banco não está disponível.
 * 
 * @author Gilberto Filho
 * @version 1.0.0
 */

const BaseRepository = require("./BaseRepository");
const db = require("../config/database");

/**
 * Classe FilmeRepository
 * Herda de BaseRepository e implementa métodos específicos para filmes
 */
class FilmeRepository extends BaseRepository {
  constructor() {
    // Chama o construtor da classe pai com o nome da tabela
    super("filme");
  }

  /**
   * Busca um filme específico pelo ID
   * 
   * @param {number} id - ID do filme
   * @returns {Object|null} Dados do filme ou null se não encontrado
   */
  async findById(id) {
    try {
      // Tenta buscar no banco de dados
      const [rows] = await db.execute(
        "SELECT * FROM filme WHERE id = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      // Se houver erro no banco, usa dados mockados
      console.log("Erro ao buscar filme no banco, usando dados mockados:", error.message);
      
      // Dados mockados para teste - filmes de exemplo
      const filmes = [
        {
          id: 1,
          nome: "Avatar: O Caminho da Água",
          genero: "Ficção Científica",
          duracao: 192,
          ativo: true
        },
        {
          id: 2,
          nome: "Top Gun: Maverick",
          genero: "Ação",
          duracao: 131,
          ativo: true
        },
        {
          id: 3,
          nome: "Homem-Aranha",
          genero: "Ação",
          duracao: 148,
          ativo: true
        }
      ];
      
      // Retorna o filme com o ID solicitado ou o primeiro filme como fallback
      return filmes.find(filme => filme.id === parseInt(id)) || filmes[0];
    }
  }

  /**
   * Busca todos os filmes ativos em cartaz
   * 
   * @returns {Array} Array com todos os filmes ativos
   */
  async findAtivos() {
    try {
      // Tenta buscar filmes ativos no banco de dados
      const [rows] = await db.execute(
        "SELECT * FROM filme WHERE ativo = true"
      );
      return rows;
    } catch (error) {
      // Se houver erro no banco, usa dados mockados
      console.log("Erro ao buscar filmes no banco, usando dados mockados:", error.message);
      
      // Dados mockados para teste - filmes ativos
      return [
        {
          id: 1,
          nome: "Avatar: O Caminho da Água",
          genero: "Ficção Científica",
          duracao: 192,
          ativo: true
        },
        {
          id: 2,
          nome: "Top Gun: Maverick",
          genero: "Ação",
          duracao: 131,
          ativo: true
        },
        {
          id: 3,
          nome: "Homem-Aranha",
          genero: "Ação",
          duracao: 148,
          ativo: true
        }
      ];
    }
  }
}

module.exports = FilmeRepository;
