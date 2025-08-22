import React, { useState, useEffect } from "react";
import { cinemaApi } from "../services/api";

function ListaFilmes({ onFilmeSelecionado }) {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarFilmes();
    }, []);

    const carregarFilmes = async () => {
        try {
            const response = await cinemaApi.listarFilmes();
            setFilmes(response.data.filmes);
        } catch (error) {
            console.error("Erro ao carregar filmes:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Carregando filmes...</div>;

    return (
        <div className="lista-filmes">
            <h2>Filmes em Cartaz</h2>
            <div className="filmes-grid">
                {filmes.map((filme) => (
                    <div
                        key={filme.id}
                        className="filme-card"
                        onClick={() => onFilmeSelecionado(filme)}
                    >
                        <h3>{filme.nome}</h3>
                        <p>Gênero: {filme.genero}</p>
                        <p>Duração: {filme.duracao} min</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListaFilmes; 