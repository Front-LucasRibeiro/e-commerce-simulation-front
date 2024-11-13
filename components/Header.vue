<template>
  <HeaderContainer>
    <Logo>
      <img src="~/assets/logo.png" alt="E-commerce" />
    </Logo>
    <Nav>
      <NavItemWrapper>
        <nuxt-link to="/">Home</nuxt-link>
      </NavItemWrapper>
      <NavItemWrapper>
        <nuxt-link to="/categoria">Categoria</nuxt-link>
      </NavItemWrapper>
      <NavItemWrapper>
        <nuxt-link to="/produto">Produto</nuxt-link>
      </NavItemWrapper>
      <NavItemWrapper>
        <nuxt-link to="/usuario">Usuário</nuxt-link>
      </NavItemWrapper>
    </Nav>
  </HeaderContainer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import styled from 'vue-styled-components';

const HeaderContainer = styled('header')`
  background-color: #dedede;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  color: white;
`;

const Logo = styled('div')`
  display: flex;
  align-items: center;

  img {
    width: 98px;
    height: auto;
  }
`;

const Nav = styled('nav')`
  display: flex;
`;

const NavItemWrapper = styled('div')`
  margin: 0 1rem;
  & a {
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default defineComponent({
  name: 'Header',
  components: {
    HeaderContainer,
    Logo,
    Nav,
    NavItemWrapper,
  },
});
</script>
