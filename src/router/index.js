import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home.vue"),
    redirect:'/hy',
    children: [
      {
        path: "/hy",
        name: "hy",
        component: () => import("@/views/children"),
      },
      {
        path: "/users",
        name: "users",
        component: () => import("@/views/children/users.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
