<template>
  <div>
    <BannerCarousel />
    <Shelfs @add-to-cart="addToCart" />
    <Minicart :cartItems="cartItems" :isOpen="isMinicartOpen" @minicart-closed="closeMinicart" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import Shelfs from '@/components/Shelfs.vue';
import Minicart from '@/components/Minicart.vue';
import BannerCarousel from '@/components/BannerCarousel.vue';
import { cartService } from '~/services/cartService';

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

export default defineComponent({
  name: 'IndexPage',
  components: {
    BannerCarousel,
    Shelfs,
    Minicart,
  },
  data() {
    return {
      cartItems: [] as CartItem[],  // Lista de itens no carrinho
      isMinicartOpen: false,         // Controla a exibição do minicart
      userId: 1,                    // Defina o ID do usuário (isso deve ser dinâmico em um sistema real)
    };
  },
  async mounted() {
    // await this.loadCart(); // Carregar o carrinho ao montar o componente
  },
  methods: {
    async loadCart() {
      try {
        const cart: any = await cartService.getCart(1);
        console.log('cart', cart)
        if (cart) {
          this.cartItems = cart.map((item: any) => ({
            id: item.items.map((item: any) => item.product.id).join(', '),
            name: item.items.map((item: any) => item.product.name).join(', '), // Mapear o nome conforme necessário
            price: item.items.map((item: any) => item.product.price).join(', '), // Mapear o preço conforme necessário
            image: item.items.map((item: any) => item.product.image).join(', '), // Mapear a imagem conforme necessário
            quantity: item.items.map((item: any) => item.quantity).join(', '),
          }));
        }
      } catch (error) {
        console.error('Erro ao carregar o carrinho:', error);
      }
    },

    async addToCart(product: CartItem) {
      const existingProduct = this.cartItems.find(item => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }

      this.openMinicart();  // Abrir o minicart após adicionar um item

      // Atualizar carrinho na API
      await this.updateCartInApi();
    },

    openMinicart() {
      this.isMinicartOpen = true;
    },

    closeMinicart() {
      this.isMinicartOpen = false;
    },

    async updateCartInApi() {
      try {
        let cart = await cartService.getCart(this.userId);

        if (!cart) {
          // Cria um carrinho novo se não existir
          cart = await cartService.createCart(this.userId, this.cartItems.map(item => ({
            productId: item.id,
            quantity: item.quantity,
          })));
        } else {
          // Atualiza os itens no carrinho existente
          await cartService.addItemsToCart(cart.id, this.cartItems.map(item => ({
            productId: item.id,
            quantity: item.quantity,
          })));
        }

        console.log('Carrinho atualizado no banco:', cart);
      } catch (error) {
        console.error('Erro ao atualizar o carrinho no banco:', error);
      }
    },
  },
});
</script>

<style scoped>
/* Estilos gerais da página */
</style>
