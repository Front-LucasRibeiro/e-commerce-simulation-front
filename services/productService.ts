import axios from 'axios';

const apiUrl = 'http://localhost:3333/api/products';

export interface Product {
  id: number;
  skuId: number;
  name: string;
  alt: string;
  image: string;
  price: string;
  stock: string;
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Accept': 'application/json', // Garantir que a resposta seja JSON
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw new Error(`Erro ao buscar produtos: ${error instanceof Error ? error.message : 'Desconhecido'}`);
  }
};

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`, {
      headers: {
        'Accept': 'application/json', // Garantir que a resposta seja JSON
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar o produto com ID ${id}:`, error);
    throw new Error(`Erro ao buscar o produto com ID ${id}: ${error instanceof Error ? error.message : 'Desconhecido'}`);
  }
};
