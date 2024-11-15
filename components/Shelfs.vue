<template>
  <div class="swiper-container-shelf">
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(product, index) in products" :key="index">
        <img :src="product.image" :alt="product.alt" class="banner-image" />
        <span class="sku"><strong>sku:</strong>{{ product.skuId }}</span>
        <span>{{ product.name }}</span>
        <span class="price">{{ product.price }}</span>
        <v-btn color="success" class="add-to-cart-btn" @click="$emit('add-to-cart', product)">
          {{ isMobile ? 'adicionar' : 'Adicionar ao carrinho' }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import 'swiper/swiper-bundle.css';
import Swiper from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import mensShirt from '@/assets/camisa-masculina.webp';
import mensPants from '@/assets/calca-masculina.webp';

Swiper.use([Autoplay, Navigation]);

interface Product {
  id: number;
  skuId: number;
  name: string;
  alt: string;
  image: string;
  price: string;
  stock: string;
}

export default {
  data() {
    return {
      products: [
        { id: 1, skuId: 1, name: 'Calça Jeans Masculina', alt: 'Calça Jeans Masculina', image: mensPants, price: 'R$ 78,00', stock: '150' },
        { id: 2, skuId: 2, name: 'Camisa Masculina', alt: 'Camisa Masculina', image: mensShirt, price: 'R$ 88,00', stock: '150' },
        { id: 1, skuId: 1, name: 'Calça Jeans Masculina', alt: 'Calça Jeans Masculina', image: mensPants, price: 'R$ 78,00', stock: '150' },
        { id: 2, skuId: 2, name: 'Camisa Masculina', alt: 'Camisa Masculina', image: mensShirt, price: 'R$ 88,00', stock: '150' },
        { id: 1, skuId: 1, name: 'Calça Jeans Masculina', alt: 'Calça Jeans Masculina', image: mensPants, price: 'R$ 78,00', stock: '150' },
        { id: 2, skuId: 2, name: 'Camisa Masculina', alt: 'Camisa Masculina', image: mensShirt, price: 'R$ 88,00', stock: '150' },
        { id: 2, skuId: 2, name: 'Camisa Masculina', alt: 'Camisa Masculina', image: mensShirt, price: 'R$ 88,00', stock: '150' },
      ] as Product[],
      swiper: null as Swiper | null,
      isMobile: false,
    };
  },
  mounted() {
    this.swiper = new Swiper('.swiper-container-shelf', {
      loop: true,
      slidesPerView: 6,
      spaceBetween: 10,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        280: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        600: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        800: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        1920: {
          slidesPerView: 6,
          spaceBetween: 10,
        },
      },
    });

    this.isMobile = window.innerWidth < 1025;
  },
};
</script>

<style scoped lang="scss">
.swiper-container-shelf {
  width: 100%;
  overflow: hidden;
  position: relative;
  margin: 32px 0;
}

.add-to-cart-btn {
  margin-top: 10px;
  text-transform: none;
  margin: 0 14px 18px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
}

.swiper-wrapper {
  display: flex;
}

.swiper-slide {
  display: flex;
  flex-direction: column;
  max-width: 280px;
  border-radius: 8px;
  border: 1px solid #ccc;

  img {
    height: 280px;
  }

  .sku {
    margin: 12px 0;
  }

  .price {
    font-weight: bold;
    margin-bottom: 22px;
  }

  span {
    padding: 0 14px;
  }
}

.banner-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

/* Estilo para os botões de navegação */
.swiper-button-next,
.swiper-button-prev {
  position: absolute;
  top: 50%;
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-50%);
  z-index: 10;
  height: 62px;
  width: 52px;
}

.swiper-button-next {
  right: 10px;
}

.swiper-button-prev {
  left: 10px;
}
</style>
