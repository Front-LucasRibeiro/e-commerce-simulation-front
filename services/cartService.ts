const API_URL = 'http://localhost:3333/api/cart';

interface Item {
  productId: number;
  quantity: number;
}

interface CreateCartResponse {
  id: number;
  userId: number;
  totalPrice: number;
  status: string;
  items: Item[];
}

export const cartService = {
  async getCart(userId: number): Promise<CreateCartResponse | null> {
    const response = await fetch(`${API_URL}/${userId}/items`);

    if (!response.ok) {
      return null;
    }

    return await response.json();
  },

  async updateItemsToCart(cartId: number, productId: number, quantity: number): Promise<CreateCartResponse> {
    const response = await fetch(`${API_URL}/${cartId}/item`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity }), // Certifique-se de que `productId` e `quantity` são números
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar item no carrinho: ' + response.statusText);
    }

    return await response.json();
  },

  async createCart(userId: number, items: Item[]): Promise<CreateCartResponse> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        items,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar carrinho: ' + response.statusText);
    }

    return await response.json();
  },

  async addItemsToCart(cartId: number, items: Item[]): Promise<CreateCartResponse> {
    const response = await fetch(`${API_URL}/${cartId}/items`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });

    if (!response.ok) {
      throw new Error('Erro ao adicionar itens ao carrinho: ' + response.statusText);
    }

    return await response.json();
  },
};
