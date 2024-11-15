<template>
  <div v-if="isOpen" class="mini-cart" :class="{ active: isOpen }">
    <div class="top">
      <h3>Meu Carrinho</h3>
      <span class="close" @click="closeMinicart">&times;</span>
    </div>
    <div class="wrap-mini-cart">
      <div v-if="cartItems.length === 0" class="empty-cart">
        <p>Seu carrinho está vazio.</p>
      </div>

      <div v-else>
        <ul class="list">
          <li v-for="(item, index) in cartItems" :key="index" class="cart-item">
            <div class="wrap-item-top">
              <img :src="item.image" :alt="item.name" class="item-image" />
              <div class="item-details">
                <p class="name"><strong>{{ item.name }}</strong></p>
                <p><strong>Preço:</strong> {{ item.price }}</p>
              </div>
            </div>
            <div class="item-actions">
              <div class="wrap-input-qtd">
                <button @click="decreaseQuantity(index)">-</button>
                <p class="qtd">{{ item.quantity }}</p>
                <button @click="increaseQuantity(index)">+</button>
              </div>
              <button class="btn-remove" @click="removeItem(index)">
                <svg xmlns="http://www.w3.org/2000/svg" :width="iconSize" :height="iconSize" viewBox="0 0 24 24">
                  <path :d="mdiDelete" />
                </svg>
              </button>
            </div>
          </li>
        </ul>
      </div>

      <div class="cart-total">
        <p>Total: {{ cartTotal }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { mdiDelete } from '@mdi/js';
import { cartService } from '~/services/cartService';

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

export default defineComponent({
  props: {
    cartItems: {
      type: Array as PropType<CartItem[]>,
      required: true,
      default: () => []
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      mdiDelete,
      iconSize: 22,
    };
  },

  computed: {
    cartTotal() {
      // Certifique-se de que cartItems não seja undefined ou null
      if (!this.cartItems || this.cartItems.length === 0) {
        return 0; // Retorna 0 se não houver itens no carrinho
      }

      // Calcula o total do carrinho
      return this.cartItems.reduce((total, item) => {
        // Verifica se o item.price é uma string ou um número
        const price = parseFloat(item.price);
        if (!isNaN(price)) {
          return total + (price * item.quantity);
        }
        return total; // Se o preço não for válido, não adiciona
      }, 0);
    }
  },

  methods: {
    closeMinicart() {
      this.$emit('minicart-closed');
    },

    async increaseQuantity(index: number) {
      this.cartItems[index].quantity++;
      await this.updateCartItem(this.cartItems[index]);
    },

    async decreaseQuantity(index: number) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
        await this.updateCartItem(this.cartItems[index]);
      }
    },

    async updateCartItem(item: CartItem) {
      try {
        const cartId = 3; // Substitua pelo ID real do carrinho
        const productId = Number(item.id); // ID do produto
        const quantity = Number(item.quantity); // Nova quantidade

        // Chama o serviço para atualizar a quantidade do item
        await cartService.updateItemsToCart(cartId, productId, quantity);
      } catch (error) {
        console.error('Erro ao atualizar item no carrinho:', error);
      }
    },

    async removeItem(index: number) {
      const itemToRemove = this.cartItems[index];
      const cartId = 3; // Substitua pelo ID real do carrinho

      try {
        await cartService.removeItemFromCart(cartId, itemToRemove.id); // Chama o serviço para remover o item
        this.cartItems.splice(index, 1); // Remove o item da lista local
      } catch (error) {
        console.error('Erro ao remover item do carrinho:', error);
      }
    },

    formatCurrency(value: number): string {
      return `R$ ${value.toFixed(2).replace('.', ',')}`;
    }
  }
});
</script>

<style scoped lang="scss">
.mini-cart {
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 300px;
  background-color: #fff;
  position: fixed;
  right: -300px;
  top: 0;
  z-index: 1000;
  height: 100%;
  transition: right 0.5s;
  width: 100%;

  &.active {
    right: 0;
  }

  .btn-remove {
    position: absolute;
    right: 0;
    top: 0;
  }

  .list {
    padding-left: 0;
    list-style: none;
    overflow: auto;
    height: 82vh;
  }

  .wrap-item-top {
    display: flex;
  }

  .wrap-input-qtd {
    display: flex;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 110px;
    margin-top: 6px;
    left: 63px;
    position: relative;

    p {
      width: 32px;
      text-align: center;
    }

    button {
      width: 32px;
      font-weight: bold;
      margin: 0;
    }
  }

  .name {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 17px;
  }
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #111;
  background-color: #dedede;
  padding: 12px;
  width: 100%;
  text-align: center;

  .close {
    font-weight: bold;
    font-size: 26px;
    width: 42px;
    text-align: right;
    cursor: pointer;
  }
}

.wrap-mini-cart {
  padding: 20px 6px;
}

h3 {
  margin-top: 0;
}

.empty-cart {
  text-align: center;
}

.cart-item {
  position: relative;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 22px;
  padding: 0 0 18px;

  p {
    margin: 6px;
    font-size: 15px;
  }
}

.item-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
}

.item-details {
  flex-grow: 1;
  padding-right: 34px;
}

.item-actions button {
  margin-right: 5px;
}

.cart-total {
  font-weight: bold;
  text-align: right;
  margin-top: 15px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #111;
  background-color: #dedede;
  padding-top: 18px;
  width: 100%;
  text-align: center;
}
</style>
