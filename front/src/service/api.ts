  import axios, { AxiosInstance } from 'axios';

  export class ProductService {
    public api: AxiosInstance;  
    public baseURL: string;

    constructor() {
      // this.baseURL = 'http://localhost:3333'
      this.baseURL = 'https://backend-jogosnet.onrender.com'; 
      this.api = axios.create({
        baseURL: this.baseURL,
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*',
        },
      });
    }

    
    async getAllProducts() {  
      try {
        const response = await this.api.get('/products');
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        throw error;
      }
    }

    async getProductByName(nome: string) {
      try {
          const response = await this.api.get(`/products/${nome}`);
          console.log(response.data); 
          return response.data;
      } catch (error) {
          console.error('Erro ao buscar produto pelo nome:', error);
          throw error;
      }
    }


    async saveProduct(productData: FormData) {
      try {
        const response = await this.api.post('/products', productData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.data;
      } catch (error) {
        console.error('Erro ao salvar produto:', error);
        throw error;
      }
    }
    

    async deleteProduct(id: number) {
      try {
        const response = await this.api.delete(`/products/${id}`);
        return response.data;
      } catch (error) {
        console.error('Erro ao deletar produto:', error);
        throw error;
      }
    }

    async updateProduct(id: number, productData: { nome: string; descricao: string; preco: number; genero: string; img: string }) {
      try {
        const response = await this.api.put(`/products/${id}`, productData);
        return response.data;
      } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        throw error;
      }
    }
  }


  export default ProductService;
