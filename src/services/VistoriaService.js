import api from "../js/axiosConfig";

async function novaVistoria(vistoria) {
  console.log("🚀 ~ novaVistoria ~ vistorias:", vistoria);
  try {
    const response = await api.post("/vistoria/new", {
      dt_vistoria: vistoria.dt_vistoria,
      hora_vistoria: vistoria.hora_vistoria,
    });
    return response;
  } catch (error) {
    console.error("Erro ao cadastrar vistorias:", error);
    throw error;
  }
}

async function buscarVistorias(status) {
  try {
    const response = await api.get("/vistoria/all", {
      params: { status: status },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados das vistorias:", error);
    throw error;
  }
}

async function buscarVistoria(id) {
  try {
    const response = await api.get("/vistoria/id", { params: { id: id } });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados da vistoria:", error);
    throw error;
  }
}

async function apagarVistoria(id) {
  try {
    const response = await api.delete("/vistoria/delete", {
      params: { id: id },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao apagar dados:", error);
    throw error;
  }
}

async function atualizarVistoria(vistoria) {
  try {
    const response = await api.put("/vistoria/update", {
      params: { id: vistoria.id },
      dt_vistoria: vistoria.dt_vistoria,
      hora_vistoria: vistoria.hora_vistoria,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar dados:", error);
    throw error;
  }
}

export {
  novaVistoria,
  buscarVistorias,
  buscarVistoria,
  apagarVistoria,
  atualizarVistoria,
};
