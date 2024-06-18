import api from "../js/axiosConfig";

async function novoPatrimonio(patrimonio) {
  try {
    const response = await api.post("/patrimonio/new", {
      descricao: patrimonio.descricao,
      estado: patrimonio.estado,
    });
    return response;
  } catch (error) {
    console.error("Erro ao cadastrar apartamento:", error);
    throw error;
  }
}

async function buscarPatrimonios() {
  try {
    const response = await api.get("/patrimonio/all");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados dos Apartamentos:", error);
    throw error;
  }
}

async function buscarPatrimonio(id) {
  try {
    const response = await api.get("/patrimonio/id", { params: { id: id } });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do Aparatamento:", error);
    throw error;
  }
}

async function apagarPatrimonio(id) {
  try {
    const response = await api.delete("/patrimonio/delete", {
      params: { id: id },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao apagras dados:", error);
    throw error;
  }
}

async function atualizarPatrimonio(patrimonio) {
  try {
    const response = await api.put("/patrimonio/update", {
      id: patrimonio.id,
      descricao: patrimonio.descricao,
      estado: patrimonio.estado,
    });
    return response;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    throw error;
  }
}

export {
  novoPatrimonio,
  buscarPatrimonios,
  buscarPatrimonio,
  apagarPatrimonio,
  atualizarPatrimonio,
};
