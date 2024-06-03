<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title>
        <h3>Casa do Estudante Digital</h3>
      </q-toolbar-title>
      <q-space></q-space>
      <div class="navbar-menu-user">
        <div class="user-info" v-if="Usuario">
          <h4>
            <router-link to="/user" class="nav-link">{{
              Usuario ? Usuario.nome : "Aluno"
            }}</router-link>
          </h4>
          <q-chip v-if="Usuario" class="q-mt-sm q-ml-sm">
            <template v-if="Usuario.tipo === 1"> Aluno </template>
            <template v-if="Usuario.tipo === 2"> PRAE </template>
            <template v-if="Usuario.tipo === 3"> Manutenção </template>
          </q-chip>
        </div>
      </div>
      <div class="navbar-menu" v-if="Usuario">
        <q-btn flat label="Apartamentos" to="/user" class="nav-link" />
        <q-btn flat label="Patrimônios" to="/user" class="nav-link" />
        <q-btn flat label="Vistorias" to="/user" class="nav-link" />
        <q-btn flat label="Alocar Alunos" to="/user" class="nav-link" />
        <q-btn flat label="Usuários" to="/controle/usuarios" class="nav-link" />
      </div>
      <q-btn flat label="Sair" to="/" class="nav-link" />
    </q-toolbar>
  </q-header>
</template>

<script>
import { fetchUserData } from "../services/UsuarioService";

export default {
  name: "AppNavbar",
  data() {
    return {
      Usuario: null,
    };
  },
  async mounted() {
    await this.getUserData();
  },
  methods: {
    async getUserData() {
      const userData = await fetchUserData();
      this.Usuario = userData;
    },
  },
};
</script>

<style scoped>
.navbar-menu-user {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
}

.q-chip {
  background-color: #ffffff;
  border-radius: 15px;
  padding: 5px 10px;
}

.q-toolbar-title h3 {
  margin: 0;
}
</style>
