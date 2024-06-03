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
