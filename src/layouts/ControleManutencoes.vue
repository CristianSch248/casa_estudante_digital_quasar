<template>
  <q-page class="container">
    <q-card class="q-pa-md q-shadow-2">
      <q-card-section>
        <div class="q-gutter-md row align-items-center">
          <div class="col text-start">
            <div class="text-h6">Controle de Manutenção</div>
          </div>
          <div class="col text-start">
            <q-select
              v-model="statusManutencao"
              label="Status da Manutenção"
              outlined
              required
              :options="status"
              emit-value
              @input="handleStatusChange"
            />
          </div>
          <div class="col text-end">
            <q-btn
              label="Nova Manutenção"
              outline
              color="primary"
              @click="deleteInfos(), (showNewManutencaoModal = true)"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md q-shadow-2 q-mt-md">
      <q-table
        :rows="Manutencoes"
        :columns="columns"
        row-key="id"
        flat
        :loading="loading"
      >
        <template v-slot:body-cell-options="props">
          <q-td :props="props">
            <q-btn
              label="Editar"
              outline
              color="primary"
              class="q-mr-sm"
              @click="
                selectManutencao(props.row.id), (showNewManutencaoModal = true)
              "
            />
            <q-btn
              label="Detalhes"
              outline
              color="positive"
              class="q-mr-sm"
              @click="selectManutencao(props.row.id), (toolbar = true)"
            />
            <q-btn
              label="Apagar"
              outline
              color="negative"
              @click="apagarManutencao(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <q-dialog v-model="showNewManutencaoModal">
      <q-card class="custom-card">
        <q-card-section>
          <div class="text-h6">Informações da solicitação</div>
        </q-card-section>
        <q-card-section>
          <q-form class="manutencao-form">
            <q-row>
              <q-col cols="12" md="6">
                <q-input
                  v-model="Manutencao.caso"
                  type="text"
                  label="caso"
                  outlined
                />
              </q-col>
            </q-row>
            <q-row>
              <q-col cols="12" md="6">
                <q-input
                  v-model="Manutencao.dt_manutencao"
                  type="date"
                  label="Data da Manutenção"
                  outlined
                />
              </q-col>
            </q-row>
            <q-row>
              <q-col cols="12" md="6">
                <q-input
                  v-model="Manutencao.hora_manutencao"
                  type="time"
                  label="Hora da Manutenção"
                  outlined
                />
              </q-col>
            </q-row>
            <div class="form-actions q-pt-md">
              <q-btn
                v-if="!Manutencao.id"
                label="Salvar"
                color="positive"
                @click="novaManutencao"
              />
              <q-btn
                v-if="Manutencao.id"
                label="Editar"
                color="primary"
                @click="atualizarManutencao"
              />
              <q-btn
                label="Cancelar"
                flat
                color="negative"
                @click="closeModal"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="toolbar">
      <q-card class="custom-card">
        <q-toolbar class="toolbar">
          <q-toolbar-title>Detalhes da Manutenção</q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section class="q-pt-none">
          <q-form class="manutencao-form">
            <q-row>
              <q-col cols="12" md="6">
                <q-input
                  v-model="Manutencao.caso"
                  type="text"
                  label="Problema a ser resolvido"
                  outlined
                  disable
                />
              </q-col>
              <q-col cols="12" md="6">
                <q-input
                  v-model="Manutencao.dt_manutencao"
                  type="date"
                  label="Data da Manutenção"
                  outlined
                  disable
                />
              </q-col>
              <q-col cols="12" md="6">
                <q-input
                  v-model="Manutencao.hora_manutencao"
                  type="time"
                  label="Hora da Manutenção"
                  outlined
                  disable
                />
              </q-col>
            </q-row>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import {
  novaManutencao,
  buscarManutencoes,
  buscarManutencao,
  apagarManutencao,
  atualizarManutencao,
} from "../services/ManutencoesService";
import { Notify } from "quasar";

export default {
  name: "ControleManutencoes",
  data() {
    return {
      Manutencoes: [],
      loading: false,
      columns: [
        {
          name: "caso",
          label: "Caso",
          align: "left",
          field: "caso",
        },
        {
          name: "dt_manutencao",
          label: "Data",
          align: "left",
          field: "dt_manutencao",
        },
        {
          name: "hora_manutencao",
          label: "Hora",
          align: "left",
          field: "hora_manutencao",
        },
        { name: "options", label: "Opções", align: "left", field: "options" },
      ],
      Manutencao: {
        id: null,
        caso: null,
        dt_manutencao: null,
        hora_manutencao: null,
      },
      status: [
        { label: "Selecione", value: null },
        { label: "Ativo", value: 1 },
        { label: "Finalizadas", value: 2 },
        { label: "Cancelada", value: 3 },
      ],
      statusManutencao: null,
      showNewManutencaoModal: false,
      toolbar: false,
    };
  },
  async created() {
    await this.getManutencoes();
  },
  methods: {
    handleStatusChange(value) {
      this.statusManutencao = value;
      this.getManutencoes();
    },
    async getManutencoes() {
      this.loading = true;
      try {
        const Manutencoes = await buscarManutencoes();
        this.Manutencoes = Manutencoes;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async novaManutencao() {
      this.loading = true;
      try {
        const response = await novaManutencao(this.Manutencao);
        Notify.create({
          type: "positive",
          message: response.data,
        });
        await this.getManutencoes();
        this.closeModal();
      } catch (error) {
        Notify.create({
          type: "negative",
          message: error.response.data,
        });
      } finally {
        this.loading = false;
      }
    },
    async atualizarManutencao() {
      this.loading = true;
      try {
        const response = await atualizarManutencao(this.Manutencao);
        Notify.create({
          type: "positive",
          message: response,
        });
        await this.getManutencoes();
        this.closeModal();
      } catch (error) {
        Notify.create({
          type: "negative",
          message: error.response.data,
        });
      } finally {
        this.loading = false;
      }
    },
    closeModal() {
      this.showNewManutencaoModal = false;
      this.deleteInfos();
    },
    deleteInfos() {
      this.Manutencao = {
        id: null,
        caso: null,
        dt_manutencao: null,
        hora_manutencao: null,
      };
    },
    selectManutencao(id) {
      for (let fix of this.Manutencoes) {
        if (fix.id === id) {
          this.Manutencao = fix;
        }
      }
    },
    async apagarManutencao(id) {
      this.loading = true;
      try {
        const response = await apagarManutencao(id);
        Notify.create({
          type: "positive",
          message: response,
        });
        await this.getManutencoes();
      } catch (error) {
        Notify.create({
          type: "negative",
          message: error.response.data,
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.custom-card {
  width: 700px;
  max-width: 80vw;
}
.toolbar {
  background-color: #1976d2;
  color: white;
}
.manutencao-form {
  padding: 20px;
}
.form-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.q-mt-md {
  margin-top: 16px;
}
</style>
