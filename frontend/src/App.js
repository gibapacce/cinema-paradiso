/**
 * 🎬 Cinema Reservas - Componente Principal
 * 
 * Este é o componente raiz da aplicação React que gerencia o estado global
 * e controla a navegação entre as diferentes telas do sistema de reservas.
 * 
 * @author Gilberto Filho
 * @version 1.0.0
 */

import React, { useState } from "react";
import ListaFilmes from "./components/ListaFilmes";
import ListaSessoes from "./components/ListaSessoes";
import LayoutAssentos from "./components/LayoutAssentos";
import "./App.css";

/**
 * Componente App - Componente principal da aplicação
 * Gerencia o estado global e a navegação entre telas
 */
function App() {
  // Estados para controlar a navegação e dados selecionados
  
  /**
   * Estado que controla qual tela está sendo exibida
   * Valores possíveis: "filmes", "sessoes", "assentos"
   */
  const [etapaAtual, setEtapaAtual] = useState("filmes");
  
  /**
   * Estado que armazena o filme selecionado pelo usuário
   * Contém todos os dados do filme (id, nome, genero, duracao)
   */
  const [filmeSelecionado, setFilmeSelecionado] = useState(null);
  
  /**
   * Estado que armazena a sessão selecionada pelo usuário
   * Contém todos os dados da sessão (id, sala, data, horario)
   */
  const [sessaoSelecionada, setSessaoSelecionada] = useState(null);

  /**
   * Função chamada quando o usuário seleciona um filme
   * Atualiza o estado do filme selecionado e navega para a tela de sessões
   * 
   * @param {Object} filme - Dados do filme selecionado
   */
  const selecionarFilme = (filme) => {
    setFilmeSelecionado(filme);        // Armazena o filme selecionado
    setEtapaAtual("sessoes");          // Navega para a tela de sessões
  };

  /**
   * Função chamada quando o usuário seleciona uma sessão
   * Atualiza o estado da sessão selecionada e navega para a tela de assentos
   * 
   * @param {Object} sessao - Dados da sessão selecionada
   */
  const selecionarSessao = (sessao) => {
    setSessaoSelecionada(sessao);      // Armazena a sessão selecionada
    setEtapaAtual("assentos");         // Navega para a tela de assentos
  };

  /**
   * Função para voltar da tela de sessões para a tela de filmes
   * Limpa o filme selecionado e retorna à tela inicial
   */
  const voltarParaFilmes = () => {
    setFilmeSelecionado(null);         // Limpa o filme selecionado
    setEtapaAtual("filmes");           // Volta para a tela de filmes
  };

  /**
   * Função para voltar da tela de assentos para a tela de sessões
   * Limpa a sessão selecionada e retorna à tela de sessões
   */
  const voltarParaSessoes = () => {
    setSessaoSelecionada(null);        // Limpa a sessão selecionada
    setEtapaAtual("sessoes");          // Volta para a tela de sessões
  };

  return (
    <div className="App">
      {/* Cabeçalho da aplicação */}
      <header className="App-header">
        <h1>🎬 Cinema Reservas</h1>
      </header>

      {/* Conteúdo principal - renderização condicional baseada na etapa atual */}
      <main>
        {/* Tela 1: Lista de Filmes */}
        {etapaAtual === "filmes" && (
          <ListaFilmes onFilmeSelecionado={selecionarFilme} />
        )}

        {/* Tela 2: Lista de Sessões (só exibe se um filme foi selecionado) */}
        {etapaAtual === "sessoes" && filmeSelecionado && (
          <ListaSessoes
            filme={filmeSelecionado}
            onSessaoSelecionada={selecionarSessao}
            onVoltar={voltarParaFilmes}
          />
        )}

        {/* Tela 3: Layout de Assentos (só exibe se uma sessão foi selecionada) */}
        {etapaAtual === "assentos" && sessaoSelecionada && (
          <LayoutAssentos
            sessao={sessaoSelecionada}
            onVoltar={voltarParaSessoes}
          />
        )}
      </main>
    </div>
  );
}

export default App;
