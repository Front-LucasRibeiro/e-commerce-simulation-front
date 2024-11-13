declare module 'vue-styled-components' {
  import { VueConstructor } from 'vue';

  export default function styled<T extends VueConstructor>(component: T, styles: any): T;
}
