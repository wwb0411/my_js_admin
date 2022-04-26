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
      {
        path: "/roles",
        name: "roles",
        component: () => import("@/views/children/roles.vue"),
      },
      {
        path: "/rights",
        name: "rights",
        component: () => import("@/views/children/rights.vue"),
      },
      {
        path: "/goods",
        name: "goods",
        component: () => import("@/views/children/goods.vue"),
      },
      {
        path: "/goods/add",
        name: "add_goods",
        component: () => import("@/views/children/add_goods.vue"),
      },
      {
        path: "/params",
        name: "params",
        component: () => import("@/views/children/params.vue"),
      },
      {
        path: "/categories",
        name: "categories",
        component: () => import("@/views/children/categories.vue"),
      },
      {
        path: "/orders",
        name: "orders",
        component: () => import("@/views/children/orders.vue"),
      },
      {
        path: "/reports",
        name: "reports",
        component: () => import("@/views/children/reports.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
