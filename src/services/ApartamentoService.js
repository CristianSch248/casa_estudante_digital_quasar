import api from "../js/axiosConfig";

async function novoApartamento(apartamento) {
  try {
    const response = await api.post("/apartamento/new", {
      numero: apartamento.numero,
      bloco: apartamento.bloco,
      vagas: apartamento.vagas,
    });
    return response;
  } catch (error) {
    console.error("Erro ao cadastrar apartamento:", error);
    throw error;
  }
}

async function buscarApartamentos() {
  try {
    const response = await api.get("/apartamento/all");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados dos Apartamentos:", error);
    throw error;
  }
}

async function buscarApartamento(id) {
  try {
    const response = await api.get("/apartamento/id", { params: { id: id } });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do Aparatamento:", error);
    throw error;
  }
}

async function apagarApartamento(id) {
  try {
    const response = await api.delete("/apartamento/delete", {
      params: { id: id },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao apagras dados:", error);
    throw error;
  }
}

async function atualizarApartamento(apartamento) {
  try {
    const response = await api.put("/apartamento/update", {
      id: apartamento.id,
      numero: apartamento.numero,
      bloco: apartamento.bloco,
      vagas: apartamento.vagas,
    });
    return response;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    throw error;
  }
}

async function buscarVagas() {
  try {
    const response = await api.get("/apartamento/vagas");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados dos Apartamentos:", error);
    throw error;
  }
}

async function MeuApartamento() {
  try {
    const response = await api.get("/apartamento/dados");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados dos Apartamentos:", error);
    throw error;
  }
}

export {
  novoApartamento,
  buscarApartamentos,
  buscarApartamento,
  apagarApartamento,
  atualizarApartamento,
  buscarVagas,
  MeuApartamento,
};
