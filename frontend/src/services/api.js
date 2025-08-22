/**
 * 🎬 Cinema Reservas - Serviço de API
 * 
 * Este arquivo configura e exporta as funções para comunicação com a API
 * do backend. Utiliza Axios para fazer requisições HTTP e centraliza
 * todas as chamadas da API em um local.
 * 
 * @author Gilberto Filho
 * @version 1.0.0
 */

import axios from "axios";

/**
 * Configuração base do Axios
 * Cria uma instância do Axios com configurações padrão para todas as requisições
 */
const api = axios.create({
  // URL base da API - aponta para o servidor backend
  baseURL: "http://localhost:3001/api",
  
  // Timeout padrão de 10 segundos para requisições
  timeout: 10000,
  
  // Headers padrão para todas as requisições
  headers: {
    'Content-Type': 'application/json',
  }
});

/**
 * Objeto que contém todas as funções da API do cinema
 * Cada função faz uma requisição específica para um endpoint
 */
export const cinemaApi = {
  /**
   * Lista todos os filmes ativos em cartaz
   * 
   * @returns {Promise} Promise que resolve com os dados dos filmes
   * 
   * Endpoint: GET /api/filmes
   * Resposta: { filmes: [...] }
   */
  listarFilmes: () => api.get("/filmes"),

  /**
   * Lista todas as sessões disponíveis para um filme específico
   * 
   * @param {number} filmeId - ID do filme
   * @param {string} data - Data específica (opcional)
   * @returns {Promise} Promise que resolve com filme e sessões
   * 
   * Endpoint: GET /api/filmes/{filmeId}/sessoes?data={data}
   * Resposta: { filme: {...}, sessoes: [...] }
   */
  listarSessoes: (filmeId, data) => {
    // Se uma data foi fornecida, inclui como parâmetro de query
    const params = data ? { data } : {};
    
    // Faz requisição GET com parâmetros opcionais
    return api.get(`/filmes/${filmeId}/sessoes`, { params });
  },

  /**
   * Visualiza o layout de assentos de uma sessão específica
   * 
   * @param {number} sessaoId - ID da sessão
   * @returns {Promise} Promise que resolve com dados da sessão e layout
   * 
   * Endpoint: GET /api/sessoes/{sessaoId}/assentos
   * Resposta: { sessao: {...}, layout: {...} }
   */
  visualizarAssentos: (sessaoId) => api.get(`/sessoes/${sessaoId}/assentos`),

  /**
   * Reserva um assento específico para uma sessão
   * 
   * @param {number} sessaoId - ID da sessão
   * @param {number} assentoId - ID do assento
   * @returns {Promise} Promise que resolve com dados da reserva criada
   * 
   * Endpoint: POST /api/sessoes/{sessaoId}/reservas
   * Body: { assento_id: number }
   * Resposta: { reserva: {...} }
   */
  reservarAssento: (sessaoId, assentoId) =>
    api.post(`/sessoes/${sessaoId}/reservas`, { assento_id: assentoId }),
};

/**
 * Interceptor para requisições - loga todas as requisições para debugging
 */
api.interceptors.request.use(
  (config) => {
    console.log(`🌐 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Interceptor para respostas - loga todas as respostas para debugging
 */
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

// Exporta a instância do Axios para uso direto se necessário
export default api; 