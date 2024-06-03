<template>
  <q-page class="container">
    <q-card class="q-pa-md q-shadow-2">
      <q-card-section>
        <div class="text-h4">Bem-vindo à página inicial</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background-color: #f4f4f9;
  min-height: 50vh;
}

.q-card {
  max-width: 500px;
  width: 100%;
}
</style>
