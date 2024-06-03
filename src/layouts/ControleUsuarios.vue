<template>
  <q-page class="container">
    <q-card class="q-pa-md q-shadow-2">
      <q-card-section>
        <div class="q-gutter-md row align-items-center">
          <div class="col text-start">
            <div class="text-h6">Controle Usuários</div>
          </div>
          <div class="col text-end">
            <q-btn
              label="Novo Usuário"
              outline
              color="primary"
              @click="novoUsuario"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md q-shadow-2">
      <q-table
        :rows="usuarios"
        :columns="columns"
        row-key="id"
        flat
        :loading="loading"
      >
        <template v-slot:body-cell-options="props">
          <q-td :props="props">
            <q-btn
              label="Detalhes"
              outline
              color="primary"
              @click="editarUsuario(props.row.id)"
            />
            <q-btn
              v-if="!props.row.ativo"
              label="Ativar"
              outline
              color="positive"
              @click="ativarUsuario(props.row.id)"
            />
            <q-btn
              v-if="props.row.ativo"
              label="Desativar"
              outline
              color="negative"
              @click="desativarUsuario(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script>
import {
  getAllUsers,
  ativarUser,
  desativarUser,
} from "../services/UsuarioService";

export default {
  name: "ControleUsuarios",
  data() {
    return {
      usuarios: [],
      loading: false,
      columns: [
        { name: "nome", label: "Nome", align: "left", field: "nome" },
        { name: "options", label: "Opções", align: "left", field: "options" },
      ],
    };
  },
  async created() {
    await this.getUsers();
  },
  methods: {
    async getUsers() {
      this.loading = true;
      try {
        const users = await getAllUsers({ tipo: 1 });
        this.usuarios = users;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    novoUsuario() {
      this.$router.push({ path: "/cadastrar/usuarios" });
    },
    editarUsuario(id) {
      this.$router.push({ path: `/user/${id}` });
    },
    async ativarUsuario(id) {
      try {
        await ativarUser(id);
        this.getUsers();
      } catch (error) {
        console.error(error);
      }
    },
    async desativarUsuario(id) {
      try {
        await desativarUser(id);
        this.getUsers();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.q-card {
  width: 80%;
  margin: 20px 0;
}

.row {
  width: 100%;
}

.q-table {
  margin: 0;
}
</style>
