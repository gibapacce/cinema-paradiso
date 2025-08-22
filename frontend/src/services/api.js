import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001/api",
});

export const cinemaApi = {
    // Listar filmes
    listarFilmes: () => api.get("/filmes"),

    // Listar sessões de um filme
    listarSessoes: (filmeId, data) => {
        const params = data ? { data } : {};
        return api.get(`/filmes/${filmeId}/sessoes`, { params });
    },

    // Visualizar assentos
    visualizarAssentos: (sessaoId) => api.get(`/sessoes/${sessaoId}/assentos`),

    // Reservar assento
    reservarAssento: (sessaoId, assentoId) =>
        api.post(`/sessoes/${sessaoId}/reservas`, { assento_id: assentoId }),
};

export default api; 