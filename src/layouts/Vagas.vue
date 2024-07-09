<template>
  <q-page class="container">
    <q-card class="q-pa-md q-shadow-2">
      <q-card-section>
        <div class="q-gutter-md row align-items-center">
          <div class="col text-start">
            <div class="text-h6">QUadro de Vagas CEU 2</div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md q-shadow-2 q-mt-md">
      <q-table
        :rows="Vagas"
        :columns="columns"
        row-key="id"
        flat
        :loading="loading"
      >
      </q-table>
    </q-card>
  </q-page>
</template>

<script>
import { buscarVagas } from "../services/ApartamentoService";

export default {
  name: "BuscarVagas",
  data() {
    return {
      Vagas: [],
      loading: false,
      columns: [
        {
          name: "apartamento_numero",
          label: "Apartamento",
          align: "left",
          field: "apartamento_numero",
        },
        {
          name: "vagas_total",
          label: "Total de Vagas",
          align: "left",
          field: "vagas_total",
        },
        {
          name: "vagas_disponiveis",
          label: "Vagas disponiveis",
          align: "left",
          field: "vagas_disponiveis",
        },
        {
          name: "vagas_ocupadas",
          label: "Vagas Ocupadas",
          align: "left",
          field: "vagas_ocupadas",
        },
      ],
    };
  },
  async created() {
    await this.getVagas();
  },
  methods: {
    async getVagas() {
      this.loading = true;
      try {
        const Vagas = await buscarVagas();
        this.Vagas = Vagas;
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
