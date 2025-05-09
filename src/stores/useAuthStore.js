import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
  }),
  actions: {
    setAuth(token, user) {
      this.token = token;
      this.user = user;
    },
    logout() {
      this.token = null;
      this.user = null;
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.token && !!state.user,
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "auth",
        storage: localStorage,
        paths: ["token", "user"],
        serializer: {
          serialize: (state) => {
            console.log("🔵 Saving to localStorage:", state.cart);
            return JSON.stringify(state);
          },
          deserialize: (value) => {
            console.log("🟢 Loading from localStorage:", value);
            return JSON.parse(value);  // ✅ Đảm bảo Vue theo dõi reactivity
          }
        }
      }
    ]
  }
});