

export const processProductImages = (data) => {
  const result = [];
  const imageSet = new Set(); // 🛑 Tránh trùng ảnh
  let idCounter = 1;

  // 🖼️ 1. Ảnh chính (default) - lấy ảnh mặc định, nếu ảnh mặc định không có lấy biến thể đầu tiên
  let defaultImage = data.productImageUrl;
  if (defaultImage == null) {
    defaultImage = data.productVariantsDTO[0].colorImageUrl;
  }

  if (!imageSet.has(defaultImage)) {
    result.push({ id: idCounter++, keyImg: "default", imageUrl: defaultImage });
    imageSet.add(defaultImage);
  }

  // 🎨 2. Ảnh biến thể theo màu (mỗi màu chỉ lấy một ảnh duy nhất)
  const colorImageMap = new Map();
  data.productVariantsDTO?.forEach(variant => {
    if (!colorImageMap.has(variant.colorId)) {
      colorImageMap.set(variant.colorId, variant.colorImageUrl);
    }
  });

  colorImageMap.forEach((imageUrl, color) => {
    if (!imageSet.has(imageUrl)) {
      result.push({ id: idCounter++, keyImg: color, imageUrl });
      imageSet.add(imageUrl);
    }
  });

  // 🏞️ 3. Ảnh sản phẩm thêm từ productImagesDTO, bỏ qua ảnh null
  data.productImagesDTO?.forEach(img => {
    if (img.imageURL && !imageSet.has(img.imageURL)) {
      result.push({ id: idCounter++, keyImg: "-", imageUrl: img.imageURL });
      imageSet.add(img.imageURL);
    }
  });

  return result;
};

export const extractVariantData = (data) => {
  return data.map(({ id, colorId, colorName, sizeId, sizeName, stock }) => ({
    id,
    colorId,
    colorName,
    sizeId,
    sizeName,
    stock
  }));
};

export const extractVariantToColors = (data) => {
  const seen = new Set();
  return data.filter(({ colorId }) => {
    if (seen.has(colorId)) return false;
    seen.add(colorId);
    return true;
  }).map(({ colorId, colorName }) => ({ colorId, colorName }));
}

export const extractVariantToSizes = (data) => {
  const seen = new Set();
  return data.filter(({ sizeId }) => {
    if (seen.has(sizeId)) return false;
    seen.add(sizeId);
    return true;
  }).map(({ sizeId, sizeName }) => ({ sizeId, sizeName }));
}

export const getSizeIdsByColorId = (data, idColor) => {
  return data.filter(item => item.colorId === idColor && item.stock > 0)
    .map(item => item.sizeId);
}