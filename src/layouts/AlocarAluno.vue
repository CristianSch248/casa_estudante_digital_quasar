<template>
  <q-page class="q-pa-lg">
    <div class="grid-container">
      <div class="grid-item">
        <q-card class="q-pa-md q-shadow-2 card-fixed">
          <q-card-section>
            <div class="text-h4">Lista de Alunos</div>
            <q-table
              :rows="usuarios"
              :columns="columnsAlunos"
              row-key="id"
              flat
              :loading="loading"
              class="table-centered"
            >
              <template v-slot:body-cell-options="props">
                <q-td :props="props">
                  <q-btn
                    icon="person_add"
                    label="Selecionar"
                    outline
                    color="primary"
                    @click="selectAluno(props.row.id)"
                  />
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>

      <div class="grid-item">
        <q-card class="q-pa-md q-shadow-2 card-fixed">
          <q-card-section>
            <div class="text-h4">Lista de Apartamentos</div>
            <q-table
              :rows="Apartamentos"
              :columns="columnsAptos"
              row-key="id"
              flat
              :loading="loading"
              class="table-centered"
            >
              <template v-slot:body-cell-options="props">
                <q-td :props="props">
                  <q-btn
                    icon="domain_add"
                    label="Selecionar"
                    outline
                    color="primary"
                    @click="selectApto(props.row.id)"
                  />
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>

      <div class="grid-item">
        <q-card class="q-pa-md q-shadow-2 card-fixed">
          <q-card-section>
            <div class="text-h4">Informações do Aluno</div>
            <q-list bordered>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="font-large">
                    Nome: {{ usuario.nome }}
                  </q-item-label>
                  <q-item-label caption class="font-medium">
                    E-mail: {{ usuario.email }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <div class="grid-item">
        <q-card class="q-pa-md q-shadow-2 card-fixed">
          <q-card-section>
            <div class="text-h4">Informações do Apartamento</div>
            <q-list bordered>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="business" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="font-large">
                    Número: {{ Apartamento.numero }}
                  </q-item-label>
                  <q-item-label caption class="font-medium">
                    Bloco: {{ Apartamento.bloco }}
                  </q-item-label>
                  <q-item-label caption class="font-medium">
                    Vagas: {{ Apartamento.vagas }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <div class="grid-item grid-item-span">
        <q-card class="q-pa-md q-shadow-2 card-fixed">
          <q-card-section class="text-center">
            <q-btn
              icon="person_add"
              label="Alocar Aluno"
              outline
              color="primary"
              @click="novaVaga"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { buscarApartamentos } from "../services/ApartamentoService";
import { getAllUsers } from "../services/UsuarioService";
import { novaVaga } from "../services/VagasService";

export default {
  name: "AlocarAluno",
  data() {
    return {
      usuarios: [],
      Apartamentos: [],
      usuario: {},
      Apartamento: {},
      Vaga: {},
      loading: false,
      columnsAlunos: [
        { name: "nome", label: "Nome", align: "left", field: "nome" },
        { name: "email", label: "E-mail", align: "left", field: "email" },
        { name: "options", label: "Opções", align: "center", field: "options" },
      ],
      columnsAptos: [
        { name: "numero", label: "Número", align: "left", field: "numero" },
        { name: "bloco", label: "Bloco", align: "left", field: "bloco" },
        { name: "options", label: "Opções", align: "center", field: "options" },
      ],
    };
  },

  async created() {
    await this.getUsers();
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

    selectApto(id) {
      const apto = this.Apartamentos.find((apto) => apto.id === id);
      if (apto) {
        this.Apartamento = apto;
      }
    },

    selectAluno(id) {
      const user = this.usuarios.find((user) => user.id === id);
      if (user) {
        this.usuario = user;
      }
    },

    async novaVaga() {
      this.Vaga = {
        dt_entrada: new Date().toISOString(),
        id_aluno: this.usuario.id,
        id_apartamento: this.Apartamento.id,
      };

      this.loading = true;
      try {
        await novaVaga(this.Vaga);
        this.limparInfos();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    limparInfos() {
      this.Vaga = {};
      this.usuario = {};
      this.Apartamento = {};
    },
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.grid-item-span {
  grid-column: span 2;
}

.card-fixed {
  width: 100%;
}

.table-centered .q-table__grid .q-table__grid-header,
.table-centered .q-table__grid .q-table__grid-body {
  text-align: center;
}

.font-large {
  font-size: 1.25rem;
}

.font-medium {
  font-size: 1rem;
}
</style>
