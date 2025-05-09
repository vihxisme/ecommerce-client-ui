import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { categoryService } from "@/services";
import { webSocket } from "@/services/webSocket";
import { generateSlug } from "@/utils/slugify";

export const useCategoryStore = defineStore("category", () => {
  const categories = ref([]);
  const isLoaded = ref(false);
  const selectedCategoryId = ref(JSON.parse(localStorage.getItem("selectedCategoryId")) || null);


  function setSelectedCategory(id) {
    selectedCategoryId.value = id;
    console.log("idCate: " + selectedCategoryId.value);
    localStorage.setItem("selectedCategoryId", JSON.stringify(id)); // 🔥 Lưu vào localStorage
  }

  // Lấy danh mục từ API hoặc cache
  async function fetchCategories() {
    if (isLoaded.value) return; // Nếu đã load thì không gọi lại API

    try {
      const response = await categoryService.getCategory();
      categories.value = response.data.data.map((c) => ({
        ...c,
        slug: generateSlug(c.name),
      }));

      isLoaded.value = true;
    } catch (error) {
      console.error("Lỗi lấy danh mục:", error);
    }
  }

  // Cập nhật danh mục khi nhận thông báo từ WebSocket
  function updateCategories(newCategories) {
    // categories.value = newCategories; // Cập nhật trực tiếp từ WebSocket
    categories.value = newCategories.map((c) => ({
      ...c,
      slug: generateSlug(c.name),
    }));
  }

  // Reset cache & gọi lại API
  async function refreshCategories() {
    isLoaded.value = false;
    await fetchCategories();
  }

  // Khởi động WebSocket khi store được khởi tạo
  function initWebSocket() {
    webSocket.connect(); // Đảm bảo WebSocket đã kết nối
    webSocket.subscribe("/topic/category-updated", updateCategories); // Nhận dữ liệu real-time
  }

  // ✅ Lấy slug từ category name
  const getSlugByCategory = computed(() => (categoryName) => {
    return categories.value.find((c) => c.name === categoryName)?.slug || generateSlug(categoryName);
  });

  // ✅ Lấy category name từ slug
  const getCategoryBySlug = computed(() => (slug) => {
    let category = categories.value.find((c) => c.slug === slug);

    if (!category) {
      fetchCategories();
      category = categories.value.find((c) => c.slug === slug);
    }

    return category ? category.name : slug.replace(/-/g, " ");
  });

  // Lọc các danh mục áo
  const shirtCategories = computed(() =>
    categories.value
      .filter((c) => c.apparelType === 1)
      .map((c) => ({ id: c.id, text: c.name, link: `/collections/${c.slug}` }))
  );

  // Lọc các danh mục quần
  const pantsCategories = computed(() =>
    categories.value
      .filter((c) => c.apparelType === 2)
      .map((c) => ({ id: c.id, text: c.name, link: `/collections/${c.slug}` }))
  );

  return {
    categories, selectedCategoryId, setSelectedCategory, fetchCategories, refreshCategories, initWebSocket, getSlugByCategory,
    getCategoryBySlug, shirtCategories, pantsCategories
  };
});
