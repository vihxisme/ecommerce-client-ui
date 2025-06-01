import { defineStore } from 'pinia';

export const useCartSelectionStore = defineStore('cartSelection', {
  state: () => ({
    selectedKeys: [] // Danh sách các key của sản phẩm được chọn
  }),

  actions: {
    // Thêm key vào danh sách chọn
    addSelectedKeys(keys) {
      const flatKeys = keys.flat(); // phòng trường hợp truyền mảng lồng nhau
      flatKeys.forEach((key) => {
        if (!this.selectedKeys.includes(key)) {
          this.selectedKeys.push(key);
        }
      });
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
        paths: ['selectedKeys'],
        serialize: (value) => JSON.stringify({ selectedKeys: value.selectedKeys }), // ✅ giữ nguyên structure
        deserialize: (data) => JSON.parse(data) // ✅ không cần bọc lại nữa
      }
    ]
  }


});
