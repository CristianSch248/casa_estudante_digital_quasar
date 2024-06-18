import api from "../js/axiosConfig";

async function novaVaga(Vaga) {
  try {
    const response = await api.post("/vaga/new", {
      dt_entrada: Vaga.dt_saida,
      id_aluno: Vaga.observacao,
      id_apartamento: Vaga.ativo,
    });
    return response;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    throw error;
  }
}

async function buscarVagas() {}

async function buscarVaga(id) {}

async function apagarVaga(id) {}

async function atualizarVaga(Vaga) {
  try {
    const response = await api.put("/vaga/update", {
      id: Vaga.id,
      dt_saida: Vaga.dt_saida,
      observacao: Vaga.observacao,
      ativo: Vaga.ativo,
    });
    return response;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    throw error;
  }
}

module.exports = {
  novaVaga,
  buscarVagas,
  buscarVaga,
  apagarVaga,
  atualizarVaga,
};
