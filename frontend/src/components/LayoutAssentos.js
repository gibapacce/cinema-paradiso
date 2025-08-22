import React, { useState, useEffect } from "react";
import { cinemaApi } from "../services/api";

function LayoutAssentos({ sessao, onVoltar }) {
    const [layout, setLayout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reservando, setReservando] = useState(false);

    useEffect(() => {
        carregarLayout();
    }, [sessao.id]);

    const carregarLayout = async () => {
        try {
            const response = await cinemaApi.visualizarAssentos(sessao.id);
            setLayout(response.data.layout);
        } catch (error) {
            console.error("Erro ao carregar layout:", error);
        } finally {
            setLoading(false);
        }
    };

    const reservarAssento = async (assento) => {
        if (assento.status !== "livre" || reservando) return;

        const confirma = window.confirm(
            `Confirma reserva do assento ${assento.fileira}${assento.numero}?`
        );

        if (!confirma) return;

        setReservando(true);
        try {
            await cinemaApi.reservarAssento(sessao.id, assento.id);
            alert(
                `Assento ${assento.fileira}${assento.numero} reservado com sucesso!`
            );
            carregarLayout(); // Recarregar para atualizar status
        } catch (error) {
            if (error.response?.status === 409) {
                alert("Assento já foi reservado por outro cliente!");
                carregarLayout(); // Recarregar para atualizar status
            } else {
                alert("Erro ao reservar assento. Tente novamente.");
            }
        } finally {
            setReservando(false);
        }
    };

    const organizarAssentosPorFileira = () => {
        if (!layout) return {};

        const fileiras = {};
        layout.assentos.forEach((assento) => {
            if (!fileiras[assento.fileira]) {
                fileiras[assento.fileira] = [];
            }
            fileiras[assento.fileira].push(assento);
        });

        // Ordenar assentos por número dentro de cada fileira
        Object.keys(fileiras).forEach((fileira) => {
            fileiras[fileira].sort((a, b) => parseInt(a.numero) - parseInt(b.numero));
        });

        return fileiras;
    };

    if (loading) return <div>Carregando layout da sala...</div>;

    const fileiras = organizarAssentosPorFileira();

    return (
        <div className="layout-assentos">
            <button onClick={onVoltar}>← Voltar às Sessões</button>

            <div className="info-sessao">
                <h2>Escolha seu Assento</h2>
                <p>Filme: {sessao.filme_nome}</p>
                <p>Sala: {sessao.sala_nome}</p>
                <p>Data: {new Date(sessao.data).toLocaleDateString("pt-BR")}</p>
                <p>Horário: {sessao.horario}</p>
            </div>

            <div className="legenda">
                <span className="assento livre">🟢 Livre</span>
                <span className="assento ocupado">🔴 Ocupado</span>
                <span className="assento manutencao">⚫ Manutenção</span>
            </div>

            <div className="tela">TELA</div>

            <div className="sala">
                {layout.fileiras.map((fileira) => (
                    <div key={fileira} className="fileira">
                        <span className="label-fileira">{fileira}</span>
                        <div className="assentos-fileira">
                            {fileiras[fileira].map((assento) => (
                                <button
                                    key={assento.id}
                                    className={`assento ${assento.status} ${!assento.disponivel ? "manutencao" : ""
                                        }`}
                                    onClick={() => reservarAssento(assento)}
                                    disabled={
                                        assento.status !== "livre" ||
                                        !assento.disponivel ||
                                        reservando
                                    }
                                    title={`${assento.fileira}${assento.numero} - ${assento.status}`}
                                >
                                    {assento.numero}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LayoutAssentos; 