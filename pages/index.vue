<template>
  <div>
    <BannerCarousel />
    <Shelfs @add-to-cart="addToCart" />
    <Minicart :cartItems="cartItems" :isOpen="isMinicartOpen" @minicart-closed="closeMinicart" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Shelfs from '@/components/Shelfs.vue';
import Minicart from '@/components/Minicart.vue';
import BannerCarousel from '@/components/BannerCarousel.vue';
import { cartService } from '~/services/cartService';
import { mdiConsoleNetwork } from '@mdi/js';

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

  methods: {
    async addToCart(product: CartItem) {
      // Verifica se o produto já existe no carrinho
      const existingProduct = this.cartItems.find(item => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        const newItem = { ...product, quantity: 1 };
        this.cartItems.push(newItem);
      }

      this.openMinicart();

      await this.updateCartInApi();

      await this.refreshCart();
    },

    openMinicart() {
      this.isMinicartOpen = true;
    },

    closeMinicart() {
      this.isMinicartOpen = false;
    },

    async refreshCart() {
      try {
        let cart: any = await cartService.getCart(this.userId);
        console.log('Carrinho atualizado do backend:', cart[0]?.items);

        // Atualiza o estado local do carrinho com os dados mais recentes do backend
        this.cartItems = cart[0]?.items.map((item: any) => ({
          id: item.productId,
          quantity: item.quantity,
          name: item.product.name, // Assumindo que o nome está disponível
          price: item.product.price, // Assumindo que o preço está disponível
          image: item.product.image, // Assumindo que a imagem está disponível
        })) || [];
      } catch (error) {
        console.error('Erro ao atualizar o carrinho do backend:', error);
      }
    },

    async updateCartInApi() {
      try {
        let cart: any = await cartService.getCart(this.userId);
        console.log(cart)

        if (!cart) {
          // Cria um carrinho novo se não existir
          cart = await cartService.createCart(this.userId, this.cartItems.map(item => ({
            productId: Number(item.id),
            quantity: Number(item.quantity),
          })));
        } else {
          // Obtem o ID do carrinho
          const cartId = cart[0].id;
          console.log('else', cartId)

          // Verifique quais itens precisam ser atualizados ou adicionados
          for (const item of this.cartItems) {
            const existingItem = cart[0].items.find((cartItem: any) => cartItem.productId === item.id);

            if (existingItem) {
              // Atualiza a quantidade do item existente
              await cartService.updateItemsToCart(cartId, item.id, item.quantity);
            } else {
              // Adiciona o novo item ao carrinho
              await cartService.addItemsToCart(cartId, [{ productId: item.id, quantity: item.quantity }]);
            }
          }
        }

        console.log('Carrinho atualizado no banco:', cart);
      } catch (error) {
        console.error('Erro ao atualizar o carrinho no banco:', error);
      }
    },
  },
})
</script>

<style scoped>
/* Estilos gerais da página */
</style>
