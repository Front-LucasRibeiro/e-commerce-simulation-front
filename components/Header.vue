<template>
  <header class="wrap-header">
    <v-toolbar-title class="wrap-logo">
      <nuxt-link to="/">
        <img src="~/assets/logo.png" alt="E-commerce" class="logo" />
      </nuxt-link>
    </v-toolbar-title>

    <v-text-field append-icon="mdi-magnify" label="Pesquisar..." single-line hide-details
      class="search-field"></v-text-field>

    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">Masculino</v-btn>
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
        <v-btn text v-on="on">Feminino</v-btn>
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

    <v-btn text class="ml-4">Minha Conta</v-btn>

    <div class="count-cart ml-4">
      <v-avatar>
        <span class="icon">🛒</span>
      </v-avatar>
      <span class="qtd-items">0</span>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
});
</script>

<style scoped lang="scss">
.wrap-header {
  display: flex;
  align-items: center;
  gap: 22px;
  background-color: #333;
  padding: 8px 14px;
}

.drop-menu {
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
    color: #fff;
    text-decoration: none;
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.search-field {
  margin: 0;
  padding: 0;
}

.wrap-logo {
  a {
    display: flex;
  }

  .logo {
    width: 72px;
  }
}

.qtd-items {
  border-radius: 100%;
  background: #111;
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
}
</style>
