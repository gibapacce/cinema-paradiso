/**
 * 🎬 Cinema Reservas - Componente ListaFilmes
 * 
 * Este componente exibe a lista de filmes em cartaz e permite ao usuário
 * selecionar um filme para ver suas sessões disponíveis.
 * 
 * @author Gilberto Filho
 * @version 1.0.0
 */

import React, { useState, useEffect } from "react";
import { cinemaApi } from "../services/api";

/**
 * Componente ListaFilmes
 * Exibe grid responsivo de filmes com informações detalhadas
 * 
 * @param {Object} props - Propriedades do componente
 * @param {Function} props.onFilmeSelecionado - Callback chamado quando um filme é selecionado
 */
function ListaFilmes({ onFilmeSelecionado }) {
  // Estados para gerenciar dados e loading
  
  /**
   * Estado que armazena a lista de filmes carregada da API
   * Array de objetos com dados dos filmes (id, nome, genero, duracao)
   */
  const [filmes, setFilmes] = useState([]);
  
  /**
   * Estado que controla se os dados estão sendo carregados
   * Usado para exibir loading state na interface
   */
  const [loading, setLoading] = useState(true);

  /**
   * Hook useEffect que executa quando o componente é montado
   * Carrega a lista de filmes automaticamente
   */
  useEffect(() => {
    carregarFilmes();
  }, []); // Array vazio significa que só executa uma vez na montagem

  /**
   * Função assíncrona que carrega a lista de filmes da API
   * Atualiza os estados de loading e filmes
   */
  const carregarFilmes = async () => {
    try {
      // Faz requisição para a API buscar filmes
      const response = await cinemaApi.listarFilmes();
      
      // Atualiza o estado com os filmes recebidos
      setFilmes(response.data.filmes);
    } catch (error) {
      // Em caso de erro, loga no console para debugging
      console.error("Erro ao carregar filmes:", error);
    } finally {
      // Sempre desativa o loading, independente de sucesso ou erro
      setLoading(false);
    }
  };

  // Renderiza loading state enquanto carrega os dados
  if (loading) return <div>Carregando filmes...</div>;

  return (
    <div className="lista-filmes">
      {/* Título da seção */}
      <h2>Filmes em Cartaz</h2>
      
      {/* Grid responsivo de filmes */}
      <div className="filmes-grid">
        {/* Mapeia cada filme para um card clicável */}
        {filmes.map((filme) => (
          <div
            key={filme.id}                    // Chave única para o React
            className="filme-card"            // Classe CSS para estilização
            onClick={() => onFilmeSelecionado(filme)} // Callback quando clicado
          >
            {/* Título do filme */}
            <h3>{filme.nome}</h3>
            
            {/* Informações do filme */}
            <p>Gênero: {filme.genero}</p>
            <p>Duração: {filme.duracao} min</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaFilmes; 