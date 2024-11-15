<template>
  <v-footer class="footer-wrap">
    <v-container class="footer-content">
      <v-row>
        <v-col cols="12" md="4">
          <h4 class="black--text title-item">Institucional</h4>
          <v-list class="list-wrap">
            <v-list-item class="list" v-for="item in institutionalLinks" :key="item.text">
              <nuxt-link class="link-item" :to="item.link">{{ item.text }}</nuxt-link>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" md="4">
          <h4 class="black--text title-item">Atendimento</h4>
          <br>
          <p class="black--text"><strong>E-mail:</strong>
            <a class="link-item" href="mailto:contato@contato.com.br">contato@contato.com.br</a>
          </p>
          <p class="black--text"><strong>WhatsApp:</strong>
            <a class="link-item" href="https://wa.me/5511964914546">(11) 96491-4546</a>
          </p>
          <p class="black--text">Segunda a Sexta - 09:00h às 18:00h</p>
          <p class="black--text">Sábado - 09:00h às 13:00h</p>
        </v-col>

        <v-col cols="12" md="4">
          <img class="created-by" src="../assets/logo.png" alt="Logo" />
        </v-col>
      </v-row>
    </v-container>
    <div class="px-4 py-2 text-center black copy-wrap">
      &copy; - {{ new Date().getFullYear() }} — <strong>Lucas Maranho</strong>
    </div>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Footer',
  data() {
    return {
      institutionalLinks: [
        { text: 'Quem Somos', link: '/quem-somos' },
        { text: 'Política de Privacidade', link: '/politica-de-privacidade' },
        { text: 'Trocas e Devoluções', link: '/trocas-e-devolucoes' },
        { text: 'Prazos e Envios', link: '/prazos-e-envios' },
        { text: 'Minha Conta', link: '/minha-conta' },
      ],
    };
  },
});
</script>

<style scoped lang="scss">
.footer-wrap {
  background-color: #ddd;
  padding: 0;

  .copy-wrap {
    width: 100%;
    color: #fff;
  }

  .footer-content {
    padding: 32px 14px;
  }

  .created-by {
    width: 180px;
  }

  .title-item {
    font-size: 19px;
  }

  .list-wrap {
    background-color: unset;
  }

  a.link-item {
    color: #111;
    text-decoration: none;

    &:hover {
      color: #1976d2;
    }
  }

  .list {
    background-color: #ddd;
    padding: 0;
    margin: 4px 0;
  }
}
</style>
