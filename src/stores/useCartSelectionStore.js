import { defineStore } from 'pinia';

export const useCartSelectionStore = defineStore('cartSelection', {
  state: () => ({
    selectedKeys: [] // Danh sách các key của sản phẩm được chọn
  }),

  actions: {
    // Thêm key vào danh sách chọn
    addSelectedKey(key) {
      if (!this.selectedKeys.includes(key)) {
        this.selectedKeys.push(key);
      }
    },

    // Xóa key khỏi danh sách chọn
    removeSelectedKey(key) {
      this.selectedKeys = this.selectedKeys.filter(k => k !== key);
    },

    // Xóa tất cả các key
    clearSelection() {
      this.selectedKeys = [];
    },

    // Set danh sách các key được chọn
    setSelection(keys) {
      this.selectedKeys = keys;
    }
  },

  getters: {
    // Lấy danh sách các key được chọn
    getSelectedKeys: (state) => state.selectedKeys,
    // Kiểm tra nếu có sản phẩm nào được chọn
    hasSelected: (state) => state.selectedKeys.length > 0
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'cart_selection',
        storage: localStorage,
        paths: ['selectedKeys'], // Chỉ lưu selectedKeys
      }
    ]
  }
});
