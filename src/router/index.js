import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Main",
    component: () => import("../views/Main.vue"),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import("@/views/Home/Home"),
      },
      {
        path: '/user',
        name: 'user',
        component: () => import("@/views/User/User"),
      },
      {
        path: '/video',
        name: 'video',
        component: () => import("@/views/Video/Video"),
      },
      {
        path: '/page1',
        name: 'page1',
        component: () => import("@/views/Other/PageOne"),
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import("@/views/Other/PageTwo"),
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
