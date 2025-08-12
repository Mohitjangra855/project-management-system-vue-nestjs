import AboutPage from "../Pages/About.vue";
import HomePage from "../Pages/Home.vue";
import LoginPage from "../Pages/Login.vue";
import ProjectsPage from "../Pages/AllProjects.vue";
import TeamPage from "../Pages/Team.vue";
import ProfilePage from "../Pages/Profile.vue";
import { isAuthenticated } from "../utils/auth";
import { createRouter, createWebHistory } from "vue-router";
import Employee from "@/Pages/Employee.vue";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/about",
    component: AboutPage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/projects",
    component: ProjectsPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/all-employee",
    component: Employee,
    meta: { requiresAuth: true },
  },
  {
    path: "/team",
    component: TeamPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/user/profile",
    component: ProfilePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Har route change pe scroll top
  scrollBehavior(to, from, savedPosition) {
    void to;
    void from;
    void savedPosition;
    return { top: 0 };
  },
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next("/login"); // redirect if not logged in
  } else {
    next(); // allow
  }
});
export default router;
