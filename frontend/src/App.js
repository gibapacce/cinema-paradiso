import React, { useState } from "react";
import ListaFilmes from "./components/ListaFilmes";
import ListaSessoes from "./components/ListaSessoes";
import LayoutAssentos from "./components/LayoutAssentos";
import "./App.css";

function App() {
  const [etapaAtual, setEtapaAtual] = useState("filmes");
  const [filmeSelecionado, setFilmeSelecionado] = useState(null);
  const [sessaoSelecionada, setSessaoSelecionada] = useState(null);

  const selecionarFilme = (filme) => {
    setFilmeSelecionado(filme);
    setEtapaAtual("sessoes");
  };

  const selecionarSessao = (sessao) => {
    setSessaoSelecionada(sessao);
    setEtapaAtual("assentos");
  };

  const voltarParaFilmes = () => {
    setFilmeSelecionado(null);
    setEtapaAtual("filmes");
  };

  const voltarParaSessoes = () => {
    setSessaoSelecionada(null);
    setEtapaAtual("sessoes");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎬 Cinema Reservas</h1>
      </header>

      <main>
        {etapaAtual === "filmes" && (
          <ListaFilmes onFilmeSelecionado={selecionarFilme} />
        )}

        {etapaAtual === "sessoes" && filmeSelecionado && (
          <ListaSessoes
            filme={filmeSelecionado}
            onSessaoSelecionada={selecionarSessao}
            onVoltar={voltarParaFilmes}
          />
        )}

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
