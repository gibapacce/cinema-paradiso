const BaseRepository = require("./BaseRepository");
const db = require("../config/database");

class AssentoRepository extends BaseRepository {
  constructor() {
    super("assento");
  }

  async findBySessao(sessaoId) {
    try {
      const query = `
        SELECT 
          a.*,
          CASE 
            WHEN r.id IS NULL THEN 'livre'
            ELSE 'ocupado'
          END as status
        FROM assento a
        LEFT JOIN reserva r ON a.id = r.assento_id AND r.sessao_id = ?
        WHERE a.sala_id = (SELECT sala_id FROM sessao WHERE id = ?)
        ORDER BY a.fileira, CAST(a.numero AS UNSIGNED)
      `;

      const [rows] = await db.execute(query, [sessaoId, sessaoId]);
      return rows;
    } catch (error) {
      console.log("Erro ao buscar assentos no banco, usando dados mockados:", error.message);
      // Dados mockados para teste - 5 fileiras (A-E) com 10 assentos cada
      const assentos = [];
      const fileiras = ['A', 'B', 'C', 'D', 'E'];
      
      fileiras.forEach((fileira, fileiraIndex) => {
        for (let numero = 1; numero <= 10; numero++) {
          assentos.push({
            id: assentos.length + 1,
            numero: numero.toString(),
            fileira: fileira,
            status: Math.random() > 0.3 ? 'livre' : 'ocupado', // 70% livres, 30% ocupados
            disponivel: true
          });
        }
      });
      
      return assentos;
    }
  }
}

module.exports = AssentoRepository;
