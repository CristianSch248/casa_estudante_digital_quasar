<template>
  <q-page class="container">
    <div class="col q-pa-md q-shadow-2">
      <q-card>
        <q-card-section>
          <div class="text-h4">Editar Dados de Usuário</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="handleSubmit" class="q-gutter-md">
            <q-input v-model="usuario.nome" label="Nome" filled required />
            <q-input
              v-model="usuario.email"
              label="Email"
              type="email"
              filled
              required
            />
            <q-input
              v-model="usuario.senha"
              label="Senha"
              type="password"
              filled
              disable="false"
            />
            <q-btn
              label="Alterar Senha"
              color="secondary"
              @click="showPasswordModal = true"
              class="q-mt-sm"
            />
            <q-input
              v-model="usuario.telefone"
              label="Telefone"
              type="tel"
              filled
              required
            />
            <div class="form-actions">
              <q-btn type="submit" label="Salvar" color="positive" />
              <q-btn label="Cancelar" color="negative" @click="handleCancel" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>

    <div class="col q-pa-md q-shadow-2">
      <q-card>
        <q-card-section>
          <div class="text-h4">Crachá do Usuário</div>
        </q-card-section>
        <q-card-section>
          <div class="badge q-mt-md q-pa-md q-gutter-md">
            <q-img src="../assets/user2.png" class="user-image" />
            <p>{{ usuario.nome }}</p>
            <p v-if="usuario.tipo === 1">Aluno</p>
            <p v-if="usuario.tipo === 2">PRAE</p>
            <p v-if="usuario.tipo === 3">Manutenção</p>
            <p>{{ usuario.telefone }}</p>
            <q-img v-if="qrCodeUrl" :src="qrCodeUrl" class="qr-code" />
          </div>
        </q-card-section>
      </q-card>
    </div>

    <q-dialog v-model="showPasswordModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alterar Senha</div>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="newPassword"
            label="Nova Senha"
            type="password"
            filled
            required
          />
          <q-input
            v-model="ConfirmNewPassword"
            label="Nova Senha"
            type="password"
            filled
            required
          />
          <div class="form-actions">
            <q-btn label="Salvar" color="positive" @click="updatePassword" />
            <q-btn label="Cancelar" color="negative" @click="closeModal" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import QRCode from "qrcode";
import { fetchUserData, getUser } from "../services/UsuarioService";

export default {
  name: "UserEdit",
  data() {
    return {
      idUsuario: null,
      usuario: {
        id: null,
        nome: null,
        email: null,
        senha: null,
        tipo: null,
        telefone: null,
      },
      qrCodeUrl: null,
      showPasswordModal: false,
      newPassword: null,
      ConfirmNewPassword: null,
    };
  },
  watch: {
    usuario: {
      handler() {
        this.generateQRCode();
      },
      deep: true,
    },
  },
  async created() {
    this.idUsuario = this.$route.params.id;
    if (this.idUsuario) await this.getUser();
    else await this.getUserData();
  },
  methods: {
    async getUserData() {
      const userData = await fetchUserData();
      this.usuario = userData;
    },
    async getUser() {
      const userData = await getUser(this.idUsuario);
      this.usuario = userData;
    },
    async generateQRCode() {
      const userDataString = JSON.stringify(this.usuario);
      try {
        this.qrCodeUrl = await QRCode.toDataURL(userDataString);
      } catch (error) {
        console.error(error);
      }
    },
    closeModal() {
      this.showPasswordModal = false;
      this.newPassword = "";
    },
    updatePassword() {
      if (this.newPassword !== this.ConfirmNewPassword) {
        alert("As senha não conferem");
      }

      this.closeModal();
    },
    handleSubmit() {},
    handleCancel() {
      this.$router.push({ name: "ControleUsuarios" });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  gap: 20px;
}

.col {
  flex: 1;
}

.badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #000;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.badge p {
  margin: 5px 0;
  color: #000;
}

.badge .user-image {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}

.badge .qr-code {
  width: 100px;
  height: 100px;
  margin-top: 10px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
}
</style>
