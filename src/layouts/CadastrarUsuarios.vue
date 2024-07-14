<template>
  <q-page class="container">
    <q-card class="q-pa-md q-shadow-2">
      <q-card-section>
        <div class="text-h4">Cadastrar Novo Usuário</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="Salvar" class="q-gutter-md">
          <q-input
            v-model="usuario.nome"
            label="Nome"
            type="text"
            outlined
            required
            placeholder="José Silva"
          />
          <q-input
            v-model="usuario.email"
            label="Email"
            type="email"
            outlined
            required
            placeholder="silvajose@gmail.com"
          />
          <q-input
            v-model="usuario.senha"
            label="Senha"
            type="password"
            outlined
            required
            placeholder="**********"
          />
          <q-input
            v-model="confirmSenha"
            label="Confirme a Senha"
            type="password"
            outlined
            required
            placeholder="**********"
          />
          <q-input
            v-model="usuario.telefone"
            label="Telefone"
            type="tel"
            outlined
            required
            placeholder="xx000000000"
          />
          <q-select
            v-model="usuario.tipo"
            label="Tipo"
            outlined
            required
            :options="tiposUsuario"
            emit-value
          />
          <div class="form-actions">
            <q-btn label="Salvar" type="submit" outline color="positive" />
            <q-btn
              label="Cancelar"
              type="button"
              outline
              color="negative"
              @click="Cancelar"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { novoUsuario } from "../services/UsuarioService";
import { Notify } from "quasar";

export default {
  name: "CadastrarUsuarios",
  data() {
    return {
      usuario: {
        nome: null,
        email: null,
        senha: null,
        tipo: null,
        telefone: null,
      },

      confirmSenha: null,
      tiposUsuario: [
        { label: "Selecione", value: null },
        { label: "PRAE", value: 2 },
        { label: "Manutenção", value: 3 },
      ],
    };
  },
  methods: {
    async Salvar() {
      if (this.usuario.senha !== this.confirmSenha) {
        console.log("As senhas não conferem");
        return;
      }

      try {
        const response = await novoUsuario(this.usuario);
        if (response.status === 200) {
          this.$router.push({ path: "/controle/usuarios" });
          this.resetUsuario();
        }
        Notify.create({
          type: "positive",
          message: response.data,
        });
      } catch (error) {
        Notify.create({
          type: "negative",
          message: error.response.data,
        });
      }
    },
    Cancelar() {
      this.resetUsuario();
      this.$router.push({ path: "/controle/usuarios" });
    },
    resetUsuario() {
      this.usuario = {
        nome: null,
        email: null,
        senha: null,
        tipo: null,
        telefone: null,
      };
      this.confirmSenha = null;
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
  min-height: 50vh;
}

.q-card {
  max-width: 500px;
  width: 100%;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
}
</style>
