<template>
  <q-page class="container">
    <q-card class="q-pa-md q-shadow-2">
      <q-card-section>
        <div class="q-gutter-md row align-items-center">
          <div class="col text-start">
            <div class="text-h6">Controle de Vistorias</div>
          </div>
          <div class="col text-start">
            <q-select
              v-model="statusVistoria"
              label="Status da Vistoria"
              outlined
              required
              :options="status"
              emit-value
              @input="handleStatusChange"
            />
          </div>
          <div class="col text-end">
            <q-btn
              label="Nova Vistoria"
              outline
              color="primary"
              @click="deleteInfos(), (showNewVistoriaModal = true)"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md q-shadow-2 q-mt-md">
      <q-table
        :rows="Vistorias"
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
                selectVistoria(props.row.id), (showNewVistoriaModal = true)
              "
            />
            <q-btn
              label="Detalhes"
              outline
              color="positive"
              class="q-mr-sm"
              @click="selectVistoria(props.row.id), (toolbar = true)"
            />
            <q-btn
              label="Apagar"
              outline
              color="negative"
              @click="apagarVistoria(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <q-dialog v-model="showNewVistoriaModal">
      <q-card class="custom-card">
        <q-card-section>
          <div class="text-h6">Cadastrar Nova Vistoria</div>
        </q-card-section>
        <q-card-section>
          <q-form class="vistoria-form">
            <q-row>
              <q-col cols="12" md="6">
                <q-input
                  v-model="Vistoria.dt_vistoria"
                  type="date"
                  label="Data da Vistoria"
                  outlined
                />
              </q-col>
              <q-col cols="12" md="6">
                <q-input
                  v-model="Vistoria.hora_vistoria"
                  type="time"
                  label="Hora da Vistoria"
                  outlined
                />
              </q-col>
            </q-row>
            <div class="form-actions q-pt-md">
              <q-btn
                v-if="!Vistoria.id"
                label="Salvar"
                color="positive"
                @click="novaVistoria"
              />
              <q-btn
                v-if="Vistoria.id"
                label="Editar"
                color="primary"
                @click="editarVistoria"
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
          <q-avatar>
            <q-icon name="chair_alt" class="q-mr-sm no-margin" />
          </q-avatar>
          <q-toolbar-title>Vistoria</q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section class="q-pt-none">
          <q-form class="vistoria-form">
            <q-row>
              <q-col cols="12" md="6">
                <q-input
                  v-model="Vistoria.dt_vistoria"
                  type="date"
                  label="Data da Vistoria"
                  outlined
                />
              </q-col>
              <q-col cols="12" md="6">
                <q-input
                  v-model="Vistoria.hora_vistoria"
                  type="time"
                  label="Hora da Vistoria"
                  outlined
                />
              </q-col>
            </q-row>
            <q-card-actions align="right" class="q-pt-md">
              <q-btn label="Salvar" color="primary" @click="editarVistoria" />
              <q-btn
                label="Cancelar"
                flat
                color="negative"
                @click="toolbar = false"
              />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import {
  novaVistoria,
  buscarVistorias,
  buscarVistoria,
  apagarVistoria,
  atualizarVistoria,
} from "../services/VistoriaService";

export default {
  name: "ControleVistorias",
  data() {
    return {
      Vistorias: [],
      loading: false,
      columns: [
        {
          name: "dt_vistoria",
          label: "Data",
          align: "left",
          field: "dt_vistoria",
        },
        {
          name: "hora_vistoria",
          label: "Hora",
          align: "left",
          field: "hora_vistoria",
        },
        { name: "options", label: "Opções", align: "left", field: "options" },
      ],
      Vistoria: {
        id: null,
        dt_vistoria: null,
        hora_vistoria: null,
      },
      status: [
        { label: "Selecione", value: null },
        { label: "Ativo", value: 1 },
        { label: "Finalizadas", value: 2 },
        { label: "Cancelada", value: 3 },
      ],
      statusVistoria: null,
      showNewVistoriaModal: false,
      toolbar: false,
    };
  },
  async created() {
    await this.getVistorias();
  },
  methods: {
    handleStatusChange(value) {
      this.statusVistoria = value;
      this.getVistorias();
    },
    async getVistorias() {
      this.loading = true;
      try {
        const vistorias = await buscarVistorias(this.statusVistoria);
        this.Vistorias = vistorias;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async novaVistoria() {
      this.loading = true;
      try {
        await novaVistoria(this.Vistoria);
        await this.getVistorias();
        this.closeModal();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async editarVistoria() {
      this.loading = true;
      try {
        await atualizarVistoria(this.Vistoria);
        await this.getVistorias();
        this.closeModal();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    closeModal() {
      this.showNewVistoriaModal = false;
      this.deleteInfos();
    },
    deleteInfos() {
      this.Vistoria = {
        id: null,
        dt_vistoria: null,
        hora_vistoria: null,
      };
    },
    selectVistoria(id) {
      for (let vist of this.Vistorias) {
        if (vist.id === id) {
          this.Vistoria = vist;
        }
      }
    },
    async apagarVistoria(id) {
      this.loading = true;
      try {
        await apagarVistoria(id);
        await this.getVistorias();
      } catch (error) {
        console.error(error);
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
.vistoria-form {
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
