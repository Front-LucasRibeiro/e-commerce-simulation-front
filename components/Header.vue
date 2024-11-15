<template>
  <header class="wrap-header">
    <v-toolbar-title class="wrap-logo">
      <nuxt-link to="/">
        <img src="~/assets/logo.png" alt="E-commerce" class="logo" />
      </nuxt-link>
    </v-toolbar-title>

    <div class="search-field">
      <input type="text" placeholder="Pesquisar...">
      <button>🔍</button>
    </div>

    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text class="white--text" v-on="on">Masculino</v-btn>
      </template>
      <v-list class="drop-menu">
        <v-list-item>
          <nuxt-link to="/produto">Calças</nuxt-link>
        </v-list-item>
        <v-list-item>
          <nuxt-link to="/produto">Camisas</nuxt-link>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text class="white--text" v-on="on">Feminino</v-btn>
      </template>
      <v-list class="drop-menu">
        <v-list-item>
          <nuxt-link to="/usuario">Calças</nuxt-link>
        </v-list-item>
        <v-list-item>
          <nuxt-link to="/usuario">Camisas</nuxt-link>
        </v-list-item>
        <v-list-item>
          <nuxt-link to="/usuario">Bolsas</nuxt-link>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn text class="ml-4 white--text">Minha Conta</v-btn>

    <div class="count-cart ml-4" @click="openMinicart">
      <v-avatar>
        <span class="icon">🛒</span>
      </v-avatar>
      <span class="qtd-items">{{ cartItems.length }}</span>
    </div>

    <transition name="fade">
      <Minicart :cartItems="cartItems" :isOpen="isMinicartOpen" @minicart-closed="closeMinicart" />
    </transition>
  </header>
</template>

<script lang="ts">
import Minicart from '@/components/Minicart.vue';
import { PropType } from 'vue';

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

export default {
  components: {
    Minicart
  },
  props: {
    cartItems: {
      type: Array as PropType<CartItem[]>,
      default: () => []
    }
  },
  data() {
    return {
      isMinicartOpen: false,
    };
  },
  methods: {
    openMinicart() {
      this.isMinicartOpen = true; // Abre o minicart
    },
    closeMinicart() {
      this.isMinicartOpen = false; // Fecha o minicart
      this.$emit('minicart-closed'); // Emite o evento de fechamento
    },
  }
};
</script>

<style scoped lang="scss">
.wrap-header {
  display: flex;
  align-items: center;
  gap: 22px;
  background-color: #333;
  padding: 8px 14px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.search-field {
  display: flex;
  align-items: center;
  width: 100%;

  input {
    padding-bottom: 6px;
    color: #fff;
    border: 0;
    border-bottom: 1px solid #fff;
    width: 100%;

    &:focus-visible {
      outline: 0;
    }

    &::placeholder {
      color: #fff;
    }
  }
}

.drop-menu {
  margin-top: 8px;

  >.v-list-item {
    transition: .2s;
    padding: 0;

    &:hover {
      background-color: #dedede;
      transition: .2s;

      >a {
        color: #111;
      }
    }
  }

  a {
    display: inline-block;
    color: #111;
    text-decoration: none;
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.wrap-logo {
  a {
    display: flex;
  }

  .logo {
    width: 72px;
    min-width: 100%;
  }
}

.qtd-items {
  border-radius: 100%;
  background: #111;
  color: #fff;
  width: auto;
  height: 23px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  position: absolute;
  left: -8px;
  top: 3px;
}

.count-cart {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
