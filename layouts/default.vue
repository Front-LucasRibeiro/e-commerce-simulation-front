<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  components: {
    Header
  },
  data() {
    return {
      fixed: false
    };
  }
}
</script>

<style scoped>
/* Estilos adicionais para o layout, se necessário */
img {
  width: 40px;
}
</style>
