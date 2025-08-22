import React, { useState, useEffect } from "react";
import { cinemaApi } from "../services/api";

function ListaSessoes({ filme, onSessaoSelecionada, onVoltar }) {
    const [sessoes, setSessoes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarSessoes();
    }, [filme.id]);

    const carregarSessoes = async () => {
        try {
            const response = await cinemaApi.listarSessoes(filme.id);
            setSessoes(response.data.sessoes);
        } catch (error) {
            console.error("Erro ao carregar sessões:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Carregando sessões...</div>;

    return (
        <div className="lista-sessoes">
            <button onClick={onVoltar}>← Voltar aos Filmes</button>
            <h2>Sessões - {filme.nome}</h2>

            <div className="sessoes-grid">
                {sessoes.map((sessao) => (
                    <div
                        key={sessao.id}
                        className="sessao-card"
                        onClick={() => onSessaoSelecionada(sessao)}
                    >
                        <h4>{sessao.sala_nome}</h4>
                        <p>Data: {new Date(sessao.data).toLocaleDateString("pt-BR")}</p>
                        <p>Horário: {sessao.horario}</p>
                        <p>Capacidade: {sessao.capacidade} lugares</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListaSessoes; 