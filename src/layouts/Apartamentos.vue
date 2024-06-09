<template>
  <q-page class="container">
    <div class="col q-pa-md q-shadow-2">
      <q-card>
        <q-card-section>
          <div class="text-h4">Dados do Apartamento</div>
        </q-card-section>
      </q-card>
      <q-card>
        <q-card-section>
          <div class="text-h4">
            <div class="row icone no-margin">
              <div class="col-4 row no-wrap items-center no-margin">
                <q-icon name="home" class="q-mr-sm no-margin" />
                <h6 class="no-margin">Apartamento: {{ Apartamento.numero }}</h6>
              </div>
              <div class="col-4 row no-wrap items-center no-margin">
                <q-icon name="apartment" class="q-mr-sm no-margin" />
                <h6 class="no-margin">Bloco: {{ Apartamento.bloco }}</h6>
              </div>
              <div class="col-4 row no-wrap items-center no-margin">
                <q-icon name="bed" class="q-mr-sm no-margin" />
                <h6 class="no-margin">
                  Total de vagas: {{ Apartamento.vagas }}
                </h6>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import {
  buscarApartamento,
  atualizarApartamento,
} from "../services/ApartamentoService";

export default {
  name: "ApartamentoData",
  data() {
    return {
      aptoId: null,
      Apartamento: {
        id: null,
        numero: null,
        bloco: null,
        vagas: null,
      },
    };
  },

  async created() {
    this.aptoId = this.$route.params.id;
    await this.getApto();
  },
  methods: {
    async getApto() {
      this.loading = true;
      try {
        const apto = await buscarApartamento(this.aptoId);
        this.Apartamento = apto;
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
.icone {
  align-items: center;
  margin: 0; /* Remove margin from .icone */
}
.no-margin {
  margin: 0; /* Remove margin from elements with .no-margin */
}
</style>
