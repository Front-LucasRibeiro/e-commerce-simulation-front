<template>
  <div class="carousel-container">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(banner, index) in banners" :key="index">
          <img :src="banner.image" :alt="banner.alt" class="banner-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import 'swiper/swiper-bundle.css';
import Swiper from 'swiper';
import banner1 from '@/assets/banner1.jpg';
import banner2 from '@/assets/banner2.jpg';
import { Autoplay } from 'swiper/modules';

Swiper.use([Autoplay]);

export default {
  data() {
    return {
      banners: [
        { image: banner1, alt: 'Banner 1' },
        { image: banner2, alt: 'Banner 2' },
      ],
      swiper: null as Swiper | null,
    };
  },
  mounted() {
    this.swiper = new Swiper('.swiper-container', {
      loop: true,
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
      },
      slidesPerView: 1,
      spaceBetween: 10,
    });
  },
};
</script>

<style scoped>
.carousel-container {
  width: 100%;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: auto;
}
</style>
