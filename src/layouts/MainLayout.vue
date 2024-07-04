<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          <q-btn @click="goToHome()">
            <q-item-section>
              <q-item-label>Casa do Estudante Digital</q-item-label>
            </q-item-section>
          </q-btn>
        </q-toolbar-title>

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
          <q-btn
            v-if="Usuario.tipo === 2"
            flat
            label="Apartamentos"
            :to="{ path: '/controle/apartamentos' }"
          />
          <q-btn
            v-if="Usuario.tipo === 2"
            flat
            label="Patrimônios"
            :to="{ path: '/controle/patrimonios' }"
          />
          <q-btn
            v-if="Usuario.tipo === 1"
            flat
            label="Meu apartamento"
            :to="{ path: '/user' }"
          />
          <q-btn
            v-if="Usuario.tipo === 1"
            flat
            label="Vistorias"
            :to="{ path: '/controle/vistorias' }"
          />
          <q-btn
            v-if="Usuario.tipo === 2"
            flat
            label="Buscar Vistorias"
            :to="{ path: '/user' }"
          />
          <q-btn
            v-if="Usuario.tipo === 1"
            flat
            label="Manutenções"
            :to="{ path: '/user' }"
          />
          <q-btn
            v-if="Usuario.tipo === 3"
            flat
            label="Buscar Manutenções"
            :to="{ path: '/user' }"
          />
          <q-btn
            v-if="Usuario.tipo === 1"
            flat
            label="Vagas"
            :to="{ path: '/user' }"
          />
          <q-btn
            v-if="Usuario.tipo === 2"
            flat
            label="Alocar Alunos"
            :to="{ path: '/alocar/aluno' }"
          />
          <q-btn
            v-if="Usuario.tipo === 2"
            flat
            label="Usuários"
            :to="{ path: '/controle/usuarios' }"
          />
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
    goToHome() {
      this.$router.push({ name: "AppDashboard" });
    },
  },
};
</script>

<style scoped>
/* Adicione aqui estilos personalizados se necessário */
</style>
