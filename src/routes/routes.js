import { useAuthStore } from '@/stores/auth';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes'; // hoặc dùng trực tiếp

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isLoggedIn = !!authStore.isLoggedIn;

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/auth'); // 🚧 redirect về trang login
  } else {
    next(); // Cho đi tiếp
  }
});

export default router;
