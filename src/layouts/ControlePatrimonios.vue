<template>
  <q-page class="container">
    <q-card class="q-pa-md q-shadow-2">
      <q-card-section>
        <div class="q-gutter-md row align-items-center">
          <div class="col text-start">
            <div class="text-h6">Controle de Patrimônios</div>
          </div>
          <div class="col text-end">
            <q-btn
              label="Novo Patrimônio"
              outline
              color="primary"
              @click="deleteInfos(), (showNewPatrimonioModal = true)"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md q-shadow-2">
      <q-table
        :rows="Patrimonios"
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
                selectPatrimonio(props.row.id), (showNewPatrimonioModal = true)
              "
            />
            <q-btn
              label="Detalhes"
              outline
              color="positive"
              @click="selectPatrimonio(props.row.id), (toolbar = true)"
            />
            <q-btn
              label="Apagar"
              outline
              color="negative"
              @click="apagarPatrimonio(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <q-dialog v-model="showNewPatrimonioModal">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Cadastrar Novo Patrimônio</div>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="Patrimonio.descricao"
            label="Descrição do Patrimônio Ex: Cadeira azul"
            filled
            required
          />
          <q-input
            v-model="Patrimonio.estado"
            label="Estado de conservação do patrimônio"
            filled
            required
          />
          <div class="form-actions">
            <q-btn
              v-if="!Patrimonio.id"
              label="Salvar"
              color="positive"
              @click="novoPatrimonio()"
            />
            <q-btn
              v-if="Patrimonio.id"
              label="Editar"
              color="primary"
              @click="editarPatrimonio()"
            />
            <q-btn label="Cancelar" color="negative" @click="closeModal" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="toolbar">
      <q-card>
        <q-toolbar>
          <q-avatar>
            <q-icon name="chair_alt" class="q-mr-sm no-margin" />
          </q-avatar>

          <q-toolbar-title> Patrimônio </q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section>
          <h5 class="text-h5">
            <strong>Descrição:</strong> {{ Patrimonio.descricao }}
          </h5>

          <h6 class="text-h6">
            <strong>Estado de conservação:</strong> {{ Patrimonio.estado }}
          </h6>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import {
  novoPatrimonio,
  buscarPatrimonios,
  apagarPatrimonio,
  atualizarPatrimonio,
} from "../services/PatrimonioService";
export default {
  name: "ControlePatrimonios",
  data() {
    return {
      Patrimonios: [],
      loading: false,
      columns: [
        {
          name: "descricao",
          label: "Descrição",
          align: "left",
          field: "descricao",
        },
        { name: "estado", label: "Estado", align: "left", field: "estado" },
        { name: "options", label: "Opções", align: "left", field: "options" },
      ],

      Patrimonio: {
        id: null,
        descricao: null,
        estado: null,
      },

      showNewPatrimonioModal: false,
      toolbar: false,
    };
  },
  async created() {
    await this.getPatrimonios();
  },
  methods: {
    async getPatrimonios() {
      this.loading = true;
      try {
        const Patrimonios = await buscarPatrimonios();
        this.Patrimonios = Patrimonios;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async novoPatrimonio() {
      try {
        await novoPatrimonio(this.Patrimonio);
        await this.getPatrimonios();
        this.closeModal();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async editarPatrimonio() {
      try {
        await atualizarPatrimonio(this.Patrimonio);
        await this.getPatrimonios();
        this.closeModal();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    closeModal() {
      this.showNewPatrimonioModal = false;
      this.deleteInfos();
    },

    deleteInfos() {
      this.Patrimonio = {
        id: null,
        descricao: null,
        estado: null,
      };
    },

    selectPatrimonio(id) {
      for (let pat of this.Patrimonios) {
        if (pat.id === id) {
          this.Patrimonio = pat;
        }
      }
    },

    async apagarPatrimonio(id) {
      try {
        await apagarPatrimonio(id);
        await this.getPatrimonios();
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
