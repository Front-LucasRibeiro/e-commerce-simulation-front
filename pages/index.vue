<template>
  <div>
    <BannerCarousel />
    <Shelfs @add-to-cart="addToCart" />
    <Minicart :cartItems="cartItems" :isOpen="isMinicartOpen" @minicart-closed="closeMinicart" />
  </div>
</template>

<script lang="ts">
import BannerCarousel from '@/components/BannerCarousel.vue';
import Shelfs from '@/components/Shelfs.vue';
import Minicart from '@/components/Minicart.vue';

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

export default {
  name: 'IndexPage',
  components: {
    BannerCarousel,
    Shelfs,
    Minicart,
  },
  data() {
    return {
      cartItems: [] as CartItem[],
      isMinicartOpen: false,
    };
  },
  methods: {
    addToCart(product: CartItem) {
      const existingProduct = this.cartItems.find(item => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }

      this.isMinicartOpen = true;
    },
    closeMinicart() {
      this.isMinicartOpen = false;
    },
  },
};
</script>
