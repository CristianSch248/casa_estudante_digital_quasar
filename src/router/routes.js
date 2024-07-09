const routes = [
  {
    path: "/",
    name: "LoginLayout",
    component: () => import("src/layouts/Login.vue"),
  },
  {
    path: "/dashboard",
    component: () => import("src/layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "AppDashboard",
        component: () => import("src/layouts/Dashboard.vue"),
      },
      {
        path: "/user/:id?",
        name: "UserEdit",
        component: () => import("src/layouts/Usuarios.vue"),
      },
      {
        path: "/controle/usuarios",
        name: "ControleUsuarios",
        component: () => import("src/layouts/ControleUsuarios.vue"),
      },
      {
        path: "/cadastrar/usuarios",
        name: "CadastrarUsuarios",
        component: () => import("src/layouts/CadastrarUsuarios.vue"),
      },
      {
        path: "/controle/apartamentos",
        name: "ControleApartamentos",
        component: () => import("src/layouts/ControleApartamentos.vue"),
      },
      {
        path: "/apartamento/:id?",
        name: "ApartamentoData",
        component: () => import("src/layouts/Apartamentos.vue"),
      },
      {
        path: "/controle/patrimonios",
        name: "ControlePatrimonios",
        component: () => import("src/layouts/ControlePatrimonios.vue"),
      },
      {
        path: "/alocar/aluno",
        name: "AlocarAluno",
        component: () => import("src/layouts/AlocarAluno.vue"),
      },
      {
        path: "/controle/vistorias",
        name: "ControleVistorias",
        component: () => import("src/layouts/ControleVistorias.vue"),
      },
      {
        path: "/controle/manutencoes",
        name: "ControleManutencoes",
        component: () => import("src/layouts/ControleManutencoes.vue"),
      },
      {
        path: "/buscar/vagas",
        name: "BuscarVagas",
        component: () => import("src/layouts/Vagas.vue"),
      },
      {
        path: "/apartamento/",
        name: "MeuApartamento",
        component: () => import("src/layouts/MeuApartamento.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
