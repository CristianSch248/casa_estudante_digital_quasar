<template>
  <q-page class="container">
    <q-card class="q-pa-md q-shadow-2">
      <q-card-section>
        <div class="q-gutter-md row align-items-center">
          <div class="col text-start">
            <div class="text-h6">Controle Apartamentos</div>
          </div>
          <div class="col text-end">
            <q-btn
              label="Novo Apartamento"
              outline
              color="primary"
              @click="deleteInfos(), (showNewApartamentoModal = true)"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md q-shadow-2">
      <q-table
        :rows="Apartamentos"
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
              @click="
                selectApto(props.row.id), (showNewApartamentoModal = true)
              "
            />
            <q-btn
              label="Detalhes"
              outline
              color="positive"
              @click="goToApto(props.row.id)"
            />
            <q-btn
              label="Apagar"
              outline
              color="negative"
              @click="apagarApto(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <q-dialog v-model="showNewApartamentoModal">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Cadastrar Novo Apartamento</div>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="Apartamento.numero"
            label="Numero do Apartamento"
            filled
            required
          />
          <q-input
            v-model="Apartamento.bloco"
            label="Bloco do Apartamento"
            filled
            required
          />
          <q-select
            v-model="Apartamento.vagas"
            label="Vagas do totais do Apartamento"
            outlined
            required
            :options="vagasAparatamento"
            emit-value
          />
          <div class="form-actions">
            <q-btn
              v-if="!Apartamento.id"
              label="Salvar"
              color="positive"
              @click="novoApto()"
            />
            <q-btn
              v-if="Apartamento.id"
              label="Editar"
              color="primary"
              @click="editarApto()"
            />
            <q-btn label="Cancelar" color="negative" @click="closeModal" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import {
  novoApartamento,
  buscarApartamentos,
  buscarApartamento,
  apagarApartamento,
  atualizarApartamento,
} from "../services/ApartamentoService";

export default {
  name: "ControleApartamentos",
  data() {
    return {
      Apartamentos: [],
      loading: false,
      columns: [
        { name: "numero", label: "Número", align: "left", field: "numero" },
        { name: "bloco", label: "Bloco", align: "left", field: "bloco" },
        { name: "vagas", label: "Vagas", align: "left", field: "vagas" },
        { name: "options", label: "Opções", align: "left", field: "options" },
      ],

      Apartamento: {
        id: null,
        numero: null,
        bloco: null,
        vagas: null,
      },

      vagasAparatamento: [
        { label: "Selecione", value: null },
        { label: "2 Vagas", value: 2 },
        { label: "4 Vagas", value: 4 },
        { label: "6 Vagas", value: 6 },
        { label: "8 Vagas", value: 8 },
      ],

      showNewApartamentoModal: false,
    };
  },
  async created() {
    await this.getAptos();
  },
  methods: {
    async getAptos() {
      this.loading = true;
      try {
        const aptos = await buscarApartamentos();
        this.Apartamentos = aptos;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    goToApto(id) {
      this.$router.push({ path: `/apartamento/${id}` });
    },

    async novoApto() {
      try {
        await novoApartamento(this.Apartamento);
        await this.getAptos();
        this.closeModal();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async editarApto() {
      try {
        await atualizarApartamento(this.Apartamento);
        await this.getAptos();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    closeModal() {
      this.showNewApartamentoModal = false;
      this.deleteInfos();
    },

    deleteInfos() {
      this.Apartamento = {
        id: null,
        numero: null,
        bloco: null,
        vagas: null,
      };
    },

    selectApto(id) {
      for (let ap of this.Apartamentos) {
        if (ap.id === id) {
          this.Apartamento = ap;
        }
      }
    },

    async apagarApto(id) {
      try {
        await apagarApartamento(id);
        await this.getAptos();
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
