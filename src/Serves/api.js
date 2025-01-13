  
  import axios from 'axios';

  // URL base do backend
  const backendUrl = 'http://192.168.9.250:5001';
  
  const api = axios.create({
    baseURL: backendUrl, // Define a URL base para todas as requisições
  });
  
  // Interceptor de requisições
  api.interceptors.request.use(
    (config) => {
      // Pode adicionar cabeçalhos aqui, como tokens de autenticação, se necessário
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Interceptor de respostas
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        // Se o erro é gerado com uma resposta do servidor (ex: 404, 500)
        console.error('Resposta de erro:', error.response.status);
      } else {
        // Se o erro é gerado na requisição (ex: rede offline)
        console.error('Erro de rede:', error.message);
      }
      return Promise.reject(error);
    }
  );
  
  export default api;