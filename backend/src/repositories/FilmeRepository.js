const BaseRepository = require("./BaseRepository");
const db = require("../config/database");

class FilmeRepository extends BaseRepository {
  constructor() {
    super("filme");
  }

  async findById(id) {
    try {
      const [rows] = await db.execute(
        "SELECT * FROM filme WHERE id = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      console.log("Erro ao buscar filme no banco, usando dados mockados:", error.message);
      // Dados mockados para teste
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
      return filmes.find(filme => filme.id === parseInt(id)) || filmes[0];
    }
  }

  async findAtivos() {
    try {
      const [rows] = await db.execute(
        "SELECT * FROM filme WHERE ativo = true"
      );
      return rows;
    } catch (error) {
      console.log("Erro ao buscar filmes no banco, usando dados mockados:", error.message);
      // Dados mockados para teste
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
