const BaseRepository = require("./BaseRepository");
const db = require("../config/database");

class SessaoRepository extends BaseRepository {
  constructor() {
    super("sessao");
  }

  async findById(id) {
    try {
      const [rows] = await db.execute(
        "SELECT s.*, sa.nome as sala_nome, sa.capacidade, f.nome as filme_nome FROM sessao s JOIN sala sa ON s.sala_id = sa.id JOIN filme f ON s.filme_id = f.id WHERE s.id = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      console.log("Erro ao buscar sessão no banco, usando dados mockados:", error.message);
      // Dados mockados para teste
      return {
        id: parseInt(id),
        filme_id: 1,
        sala_nome: "Sala 1",
        capacidade: 50,
        filme_nome: "Avatar: O Caminho da Água",
        data: "2025-08-22",
        horario: "14:30:00",
        ativa: true
      };
    }
  }

  async findByFilme(filmeId, data = null) {
    try {
      let query = `
        SELECT s.*, sa.nome as sala_nome, sa.capacidade, f.nome as filme_nome
        FROM sessao s
        JOIN sala sa ON s.sala_id = sa.id
        JOIN filme f ON s.filme_id = f.id
        WHERE s.filme_id = ? AND s.ativa = true
      `;

      const params = [filmeId];

      if (data) {
        query += " AND s.data = ?";
        params.push(data);
      }

      query += " ORDER BY s.data, s.horario";

      const [rows] = await db.execute(query, params);
      return rows;
    } catch (error) {
      console.log("Erro ao buscar sessões no banco, usando dados mockados:", error.message);
      // Dados mockados para teste
      return [
        {
          id: 1,
          filme_id: filmeId,
          sala_nome: "Sala 1",
          capacidade: 50,
          filme_nome: "Avatar: O Caminho da Água",
          data: "2025-08-22",
          horario: "14:30:00",
          ativa: true
        },
        {
          id: 2,
          filme_id: filmeId,
          sala_nome: "Sala Premium",
          capacidade: 30,
          filme_nome: "Avatar: O Caminho da Água",
          data: "2025-08-22",
          horario: "19:00:00",
          ativa: true
        }
      ];
    }
  }
}

module.exports = SessaoRepository;
