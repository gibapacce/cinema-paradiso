const FilmeRepository = require("../repositories/FilmeRepository");
const SessaoRepository = require("../repositories/SessaoRepository");
const AssentoRepository = require("../repositories/AssentoRepository");
const ReservaRepository = require("../repositories/ReservaRespository");

class CinemaService {
  constructor() {
    this.filmeRepo = new FilmeRepository();
    this.sessaoRepo = new SessaoRepository();
    this.assentoRepo = new AssentoRepository();
    this.reservaRepo = new ReservaRepository();
  }

  async listarFilmes() {
    return await this.filmeRepo.findAtivos();
  }

  async listarSessoes(filmeId, data) {
    const filme = await this.filmeRepo.findById(filmeId);
    if (!filme) {
      throw new Error("Filme não encontrado");
    }

    const sessoes = await this.sessaoRepo.findByFilme(filmeId, data);
    return { filme, sessoes };
  }

  async visualizarAssentos(sessaoId) {
    const sessao = await this.sessaoRepo.findById(sessaoId);
    if (!sessao) {
      throw new Error("Sessão não encontrada");
    }

    const assentos = await this.assentoRepo.findBySessao(sessaoId);

    const fileiras = {};
    assentos.forEach((assento) => {
      if (!fileiras[assento.fileira]) {
        fileiras[assento.fileira] = [];
      }
      fileiras[assento.fileira].push(assento);
    });
    return {
      sessao,
      layout: {
        fileiras: Object.keys(fileiras).sort(),
        assentos_por_fileira: fileiras[Object.keys(fileiras)[0]]?.length || 0,
        assentos,
      },
    };
  }

  async reservarAssento(sessaoId, assentoId) {
    return await this.reservaRepo.createWithTransaction(sessaoId, assentoId);
  }
}

module.exports = CinemaService;
