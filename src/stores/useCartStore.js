import { createPinia, defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: {} // Sử dụng Object thay vì Map
  }),

  actions: {
    addToCart(product) {
      const key = `${product.id.toString().slice(-4)}-${product.variantId.toString().slice(-4)}`;

      if (this.cart[key]) {
        this.cart[key].quantity += product.quantity;
      } else {
        this.cart[key] = product;
      }
    },

    removeFromCart(key) {
      delete this.cart[key];
    },

    clearCart() {
      this.cart = {};
    }
  },

  getters: {
    // cartItems: (state) => Object.values(state.cart),
    cartItems: (state) => Object.entries(state.cart).map(([key, value]) => ({ key, ...value })),
    cartValueItems: (state) => { return Object.entries(state.cart).map(([key, value]) => value); },
    totalItems: (state) => Object.keys(state.cart).length,

    // Getter để lấy sản phẩm theo key
    getCartItemByKey: (state) => (key) => {
      return state.cart[key] || null; // trả về sản phẩm hoặc null nếu không tìm thấy
    }
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "cart_view",
        storage: localStorage,
        paths: ["cart"],
        serializer: {
          serialize: (state) => {
            console.log("🔵 Saving to localStorage:", state.cart);
            return JSON.stringify(state);
          },
          deserialize: (value) => {
            console.log("🟢 Loading from localStorage:", value);
            const parsed = JSON.parse(value);
            return {
              cart: parsed  // ✅ Đảm bảo Vue theo dõi reactivity
            };
          }
        }
      }
    ]
  }
});

