import { defineStore } from "pinia";

export const useCartStateStore = defineStore("cartState", {
  state: () => ({
    cartState: false // Trạng thái giỏ hàng (mở/đóng)
  }),

  actions: {
    toggleCartState(value) {
      this.cartState = value;
    }
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "cart_state",
        storage: localStorage,
        paths: ["cartState"] // 🔹 Chỉ lưu trạng thái giỏ hàng, không lưu cart
      }
    ]
  }
});
