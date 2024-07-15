<template>
  <q-page class="container">
    <q-card class="q-pa-md q-shadow-2">
      <q-card-section>
        <div class="q-gutter-md row align-items-center">
          <div class="col text-start">
            <div class="text-h6">Dados do Apartamento</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="q-pa-md q-shadow-2">
      <div class="q-pa-md" style="max-width: 1200px">
        <q-expansion-item
          class="shadow-1 overflow-hidden"
          style="border-radius: 20px"
          icon="explore"
          label="Dados do Apartamento"
          header-class="bg-primary text-white"
          expand-icon-class="text-white"
          default-opened
        >
          <div class="row q-col-gutter-md">
            <div class="col-xs-12 col-sm-4">
              <q-item class="q-ma-xs">
                <q-item-section>
                  <div class="text-h6">Bloco</div>
                  <div>{{ Apartamento.bloco }}</div>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-xs-12 col-sm-4">
              <q-item class="q-ma-xs">
                <q-item-section>
                  <div class="text-h6">Número</div>
                  <div>{{ Apartamento.numero }}</div>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-xs-12 col-sm-4">
              <q-item class="q-ma-xs">
                <q-item-section>
                  <div class="text-h6">Vagas</div>
                  <div>{{ Apartamento.vagas }}</div>
                </q-item-section>
              </q-item>
            </div>
          </div>
        </q-expansion-item>
      </div>

      <div class="q-pa-md" style="max-width: 1200px">
        <q-expansion-item
          class="shadow-1 overflow-hidden"
          style="border-radius: 30px"
          icon="explore"
          label="Moradores do Apartamento"
          header-class="bg-primary text-white"
          expand-icon-class="text-white"
        >
          <q-card>
            <q-card-section>
              <q-table
                :rows="Moradores"
                :columns="MoradoresColumns"
                row-key="id"
                flat
                :loading="loading"
              >
              </q-table>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>

      <div class="q-pa-md" style="max-width: 1200px">
        <q-expansion-item
          class="shadow-1 overflow-hidden"
          style="border-radius: 30px"
          icon="explore"
          label="Patrimônio do Apartamento"
          header-class="bg-primary text-white"
          expand-icon-class="text-white"
        >
          <q-card>
            <q-card-section>
              <q-table
                :rows="Patrimonios"
                :columns="PatrimoniosColumns"
                row-key="id"
                flat
                :loading="loading"
              >
              </q-table>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>

      <div class="q-pa-md" style="max-width: 1200px">
        <q-expansion-item
          class="shadow-1 overflow-hidden"
          style="border-radius: 30px"
          icon="explore"
          label="Vistorias no Apartamento"
          header-class="bg-primary text-white"
          expand-icon-class="text-white"
        >
          <q-card>
            <q-card-section>
              <q-table
                :rows="Vistorias"
                :columns="VistoriasColumns"
                row-key="id"
                flat
                :loading="loading"
              >
              </q-table>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>

      <div class="q-pa-md" style="max-width: 1200px">
        <q-expansion-item
          class="shadow-1 overflow-hidden"
          style="border-radius: 30px"
          icon="explore"
          label="Manutenções no Apartamento"
          header-class="bg-primary text-white"
          expand-icon-class="text-white"
        >
          <q-card>
            <q-card-section>
              <q-table
                :rows="Manutencoes"
                :columns="ManutencoesColumns"
                row-key="id"
                flat
                :loading="loading"
              >
              </q-table>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { buscarApartamento } from "../services/ApartamentoService";

export default {
  name: "ApartamentoData",
  data() {
    return {
      loading: false,
      Dados: null,

      Apartamento: {
        bloco: null,
        numero: null,
        vagas: null,
      },

      Manutencoes: [],
      ManutencoesColumns: [
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
      ],

      Moradores: [],
      MoradoresColumns: [
        { name: "nome", label: "Nome", align: "left", field: "nome" },
        { name: "email", label: "E-mail", align: "left", field: "email" },
        {
          name: "telefone",
          label: "Telefone",
          align: "left",
          field: "telefone",
        },
      ],

      Patrimonios: [],
      PatrimoniosColumns: [
        {
          name: "descricao",
          label: "Descrição",
          align: "left",
          field: "descricao",
        },
        { name: "estado", label: "Estado", align: "left", field: "estado" },
      ],

      Vistorias: [],
      VistoriasColumns: [
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
      ],
    };
  },
  async created() {
    await this.getDados(this.$route.params.id);
  },
  methods: {
    async getDados(id) {
      this.loading = true;
      try {
        const dados = await buscarApartamento(id);
        this.Dados = dados;
        console.log("🚀 ~ getDados ~ this.Dados:", this.Dados);
        this.Apartamento = this.Dados.DadosAP;
        this.Manutencoes = this.Dados.Manutencoes;
        this.Moradores = this.Dados.Moradores;
        this.Patrimonios = this.Dados.Patrimonio;
        this.Vistorias = this.Dados.Vistorias;
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

