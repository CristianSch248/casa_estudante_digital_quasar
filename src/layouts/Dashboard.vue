<template>
  <q-page>
    <div class="q-pa-md">
      <q-card flat bordered class="q-pa-md">
        <h5 class="text-primary">UFSM - Universidade Federal de Santa Maria</h5>
        <p>
          A Universidade Federal de Santa Maria (UFSM) é uma instituição de
          ensino superior pública localizada em Santa Maria, Rio Grande do Sul.
          Oferece diversos cursos de graduação, pós-graduação e programas de
          extensão.
        </p>
        <p>
          <a href="https://www.ufsm.br/" target="_blank"
            >Visite o site da UFSM para mais informações</a
          >
        </p>
      </q-card>

      <div class="q-mt-lg">
        <h2 class="text-primary">Últimas Notícias</h2>
        <q-gutter>
          <!-- Primeira linha de cards -->
          <q-row class="q-col-gutter-md q-pt-md">
            <q-col cols="4" sm="4" md="4">
              <q-card flat bordered class="q-pa-md">
                <q-card-section>
                  <div class="text-h6">GERAL</div>
                  <div>
                    Projeto Tecendo Novos Saberes é lançado oficialmente e deve
                    contribuir para o acesso e permanência no mundo do trabalho
                  </div>
                  <div class="text-caption text-grey">13/07/2024 - 10:08</div>
                </q-card-section>
              </q-card>
            </q-col>

            <q-col cols="4" sm="4" md="4">
              <q-card flat bordered class="q-pa-md">
                <q-card-section>
                  <div class="text-h6">EDUCAÇÃO</div>
                  <div>
                    UFSM disponibiliza curso aberto on-line e autoinstrucional
                    sobre acessibilidade na educação
                  </div>
                  <div class="text-caption text-grey">12/07/2024 - 17:31</div>
                </q-card-section>
              </q-card>
            </q-col>

            <q-col cols="4" sm="4" md="4">
              <q-card flat bordered class="q-pa-md">
                <q-card-section>
                  <div class="text-h6">GERAL</div>
                  <div>
                    UFSM apresenta ao governo estadual propostas para a
                    reconstrução do Rio Grande do Sul
                  </div>
                  <div class="text-caption text-grey">12/07/2024 - 11:43</div>
                </q-card-section>
              </q-card>
            </q-col>
          </q-row>

          <q-row class="q-col-gutter-md q-pt-md">
            <q-col cols="4" sm="4" md="4">
              <q-card flat bordered class="q-pa-md">
                <q-card-section>
                  <div class="text-h6">GERAL</div>
                  <div>
                    UFSM oferecerá 1ª especialização gratuita do Brasil em
                    Práticas Integrativas e Complementares no Cuidado em Saúde
                    EaD
                  </div>
                  <div class="text-caption text-grey">12/07/2024 - 10:27</div>
                </q-card-section>
              </q-card>
            </q-col>

            <q-col cols="4" sm="4" md="4">
              <q-card flat bordered class="q-pa-md">
                <q-card-section>
                  <div class="text-h6">GERAL</div>
                  <div>Rádio UniFM 107.9 realiza cobertura da 30ª Feicoop</div>
                  <div class="text-caption text-grey">11/07/2024 - 18:46</div>
                </q-card-section>
              </q-card>
            </q-col>

            <q-col cols="4" sm="4" md="4">
              <q-card flat bordered class="q-pa-md">
                <q-card-section>
                  <div class="text-h6">GERAL</div>
                  <div>
                    Professores da Engenharia Florestal ministram palestras em
                    encontro técnico da Ageflor
                  </div>
                  <div class="text-caption text-grey">11/07/2024 - 16:16</div>
                </q-card-section>
              </q-card>
            </q-col>
          </q-row>
        </q-gutter>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "AppDashboard",
};
</script>

<style scoped>
.text-primary {
  color: #1976d2;
}
.q-mt-lg {
  margin-top: 2rem;
}
.q-pa-md {
  padding: 1rem;
}
.q-mb-md {
  margin-bottom: 1rem;
}
</style>
