<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <AppNavbar />
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import AppNavbar from "../components/AppNavbar.vue";

export default {
  name: "AppLayout",
  components: {
    AppNavbar,
  },
};
</script>

<style scoped>
/* Adicione estilos específicos do layout aqui, se necessário */
</style>
