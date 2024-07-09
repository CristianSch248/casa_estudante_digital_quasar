import api from "../js/axiosConfig";

async function novaManutencao(manutencao) {
  try {
    const response = await api.post("/manutencao/new", {
      caso: manutencao.caso,
      dt_manutencao: manutencao.dt_manutencao,
      hora_manutencao: manutencao.hora_manutencao,
    });
    return response;
  } catch (error) {
    console.error("Erro ao cadastrar vistorias:", error);
    throw error;
  }
}

async function buscarManutencoes(status) {
  try {
    const response = await api.get("/manutencao/all", {
      params: { status: status },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados das vistorias:", error);
    throw error;
  }
}

async function buscarManutencao(id) {
  try {
    const response = await api.get("/manutencao/id", { params: { id: id } });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados da vistoria:", error);
    throw error;
  }
}

async function apagarManutencao(id) {
  try {
    const response = await api.delete("/manutencao/delete", {
      params: { id: id },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao apagar dados:", error);
    throw error;
  }
}

async function atualizarManutencao(manutencao) {
  try {
    const response = await api.put("/manutencao/update", {
      id: manutencao.id,
      caso: manutencao.caso,
      dt_manutencao: manutencao.dt_manutencao,
      hora_manutencao: manutencao.hora_manutencao,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar dados:", error);
    throw error;
  }
}

export {
  novaManutencao,
  buscarManutencoes,
  buscarManutencao,
  apagarManutencao,
  atualizarManutencao,
};
