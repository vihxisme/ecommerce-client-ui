export const generateSlug = (name) => {
  return name
    .normalize("NFD") // Chuẩn hóa Unicode (loại bỏ dấu)
    .replace(/[\u0300-\u036f]/g, "") // Xóa dấu tiếng Việt
    .replace(/\s+/g, "-") // Thay dấu cách thành dấu gạch ngang
    .toLowerCase(); // Chuyển về chữ thường
};