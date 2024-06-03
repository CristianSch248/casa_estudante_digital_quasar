import api from "../js/axiosConfig";

async function login(credentials) {
  try {
    const response = await api.post("auth", {
      email: credentials.email,
      senha: credentials.senha,
    });

    sessionStorage.setItem("authToken", response.data.token);

    return response.data;
  } catch (error) {
    console.error("Erro no login:", error);
    throw error;
  }
}

function logout() {
  sessionStorage.removeItem("authToken");
}

async function getUser(id) {
  try {
    const response = await api.get("/usuario/", { params: { id: id } });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    throw error;
  }
}

async function fetchUserData() {
  try {
    const response = await api.get("/user/data");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    throw error;
  }
}

async function getAllUsers(params = {}) {
  try {
    const response = await api.get("/usuario/listarportipo", { params });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    throw error;
  }
}

async function ativarUser(id) {
  try {
    const response = await api.patch("/usuario/ativar", {
      id: id,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    throw error;
  }
}

async function desativarUser(id) {
  try {
    const response = await api.patch("/usuario/desativar", {
      id: id,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    throw error;
  }
}

async function novoUsuario(usuario) {
  try {
    const response = await api.post("/usuario/new", {
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
      tipo: usuario.tipo,
      telefone: usuario.telefone,
    });
    return response;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    throw error;
  }
}

async function alterarSenhaUsuario() {}

export {
  login,
  logout,
  fetchUserData,
  getAllUsers,
  ativarUser,
  desativarUser,
  getUser,
  novoUsuario,
};
