<template>
  <q-layout>
    <q-page-container>
      <q-page class="container">
        <q-card class="q-pa-md q-shadow-2 q-mx-auto" style="max-width: 400px">
          <q-card-section>
            <div class="text-h4">Casa do Estudante Digital</div>
          </q-card-section>
          <q-card-section>
            <q-form @submit="handleLogin">
              <q-input
                filled
                v-model="email"
                label="E-mail"
                type="email"
                :rules="[(val) => !!val || 'O e-mail é obrigatório']"
              />
              <q-input
                filled
                v-model="senha"
                label="Senha"
                type="password"
                :rules="[(val) => !!val || 'A senha é obrigatória']"
                class="q-mt-md"
              />
              <q-btn
                type="submit"
                label="Entrar"
                color="primary"
                class="full-width q-mt-md"
              />
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { login } from "../services/UsuarioService";

export default {
  name: "LoginLayout",
  data() {
    return {
      email: null,
      senha: null,
    };
  },
  methods: {
    async handleLogin() {
      const credentials = {
        email: this.email,
        senha: this.senha,
      };

      try {
        const response = await login(credentials);
        if (response.auth === true) this.$router.push({ name: "AppDashboard" });
      } catch (error) {
        console.log("🚀 ~ login ~ error:", error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background-color: #f4f4f9;
  min-height: 100vh;
}

.full-width {
  width: 100%;
}
</style>
