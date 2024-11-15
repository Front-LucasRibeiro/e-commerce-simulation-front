<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <Footer />
    <Minicart :cartItems="cartItems" :isOpen="isMinicartOpen" @minicart-closed="closeMinicart" />
  </v-app>
</template>

<script lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Minicart from '@/components/Minicart.vue'; // Importando o Minicart
import { cartService } from '~/services/cartService'; // Importando o serviço

export default {
  components: {
    Header,
    Footer,
    Minicart,
  },
  data() {
    return {
      cartItems: [],
      isMinicartOpen: false,
      localCartItems: [] as any[],
    };
  },
  async mounted() {
    // await this.loadCart();
  },
  methods: {
    async loadCart() {
      const userId = 1; // Defina o ID do usuário
      try {
        const cart = await cartService.getCart(1);
        console.log('Cart Data header:', cart); // Verifique o que está sendo retornado

        if (Array.isArray(cart) && cart.length > 0 && Array.isArray(cart[0].items)) {
          this.localCartItems = cart[0].items.map((item: any) => ({
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            image: item.product.image,
            quantity: item.quantity,
          }));
        } else {
          console.error('Cart items are not defined or not an array');
          this.localCartItems = [];
        }
      } catch (error) {
        console.error('Erro ao carregar o carrinho header:', error);
      }
    },

    openMinicart() {
      this.isMinicartOpen = true;
    },
    closeMinicart() {
      this.isMinicartOpen = false;
    }
  }
}
</script>

<style scoped>
/* Estilos gerais da página */
</style>
