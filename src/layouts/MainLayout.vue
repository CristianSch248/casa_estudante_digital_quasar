<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title> Casa do Estudante Digital </q-toolbar-title>

        <div class="q-pa-md" v-if="Usuario">
          <q-item>
            <q-btn :to="{ path: '/user/' }">
              <q-item-section>
                <q-item-label>{{ Usuario.nome }}</q-item-label>
                <q-item-label caption>
                  <q-badge class="q-ml-sm">{{
                    getUserType(Usuario.tipo)
                  }}</q-badge>
                </q-item-label>
              </q-item-section>
            </q-btn>
          </q-item>
        </div>

        <div class="q-pa-md" v-if="Usuario">
          <q-btn flat label="Apartamentos" :to="{ path: '/user' }" />
          <q-btn flat label="Patrimônios" :to="{ path: '/user' }" />
          <q-btn flat label="Vistorias" :to="{ path: '/user' }" />
          <q-btn flat label="Alocar Alunos" :to="{ path: '/user' }" />
          <q-btn flat label="Usuários" :to="{ path: '/controle/usuarios' }" />
        </div>

        <q-btn flat color="negative" label="Sair" :to="{ path: '/' }" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { fetchUserData } from "../services/UsuarioService";

export default {
  name: "MainLayout",
  data() {
    return {
      Usuario: null,
    };
  },
  async created() {
    await this.getUserData();
  },
  methods: {
    async getUserData() {
      try {
        const userData = await fetchUserData();
        console.log("User data fetched:", userData); // Adicionando log para verificar os dados
        this.Usuario = userData;
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    },
    getUserType(type) {
      switch (type) {
        case 1:
          return "Aluno";
        case 2:
          return "PRAE";
        case 3:
          return "Manutenção";
        default:
          return "";
      }
    },
  },
};
</script>

<style scoped>
/* Adicione aqui estilos personalizados se necessário */
</style>
