import api from "../js/axiosConfig";

async function novaVaga(Vaga) {
  try {
    const response = await api.post("/vaga/new", {
      dt_entrada: Vaga.dt_entrada,
      id_aluno: Vaga.id_aluno,
      id_apartamento: Vaga.id_apartamento,
    });
    return response;
  } catch (error) {
    console.error("Erro ao cadastrar vaga:", error);
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

export { novaVaga, buscarVagas, buscarVaga, apagarVaga, atualizarVaga };
