<template>
  <v-app>
    <Header :cartItems="cartItems" @minicart-open="openMinicart" />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <Footer />
    <Minicart :cartItems="cartItems" :isOpen="isMinicartOpen" @minicart-closed="closeMinicart" />
  </v-app>
</template>

<script>
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
    };
  },
  async mounted() {
    await this.loadCart(); // Carregar o carrinho ao montar o componente
  },
  methods: {
    async loadCart() {
      const userId = 1; // Defina o ID do usuário
      try {
        const cart = await cartService.getCart(userId);
        if (cart) {
          this.cartItems = cart.items.map(item => ({
            id: item.productId,
            name: '', // Mapear o nome conforme necessário
            price: 'R$ 0,00', // Mapear o preço conforme necessário
            image: '', // Mapear a imagem conforme necessário
            quantity: item.quantity,
          }));
        }
      } catch (error) {
        console.error('Erro ao carregar o carrinho:', error);
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
