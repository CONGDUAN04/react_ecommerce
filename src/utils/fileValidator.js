const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const MAX_SIZE = 3 * 1024 * 1024;

export const validateImageFile = (file) => {
  if (!file) {
    return { valid: false, message: "Không có file" };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      message: "Chỉ cho phép JPG, JPEG, PNG",
    };
  }

  if (file.size > MAX_SIZE) {
    return {
      valid: false,
      message: `Ảnh quá lớn, vui lòng chọn ảnh dưới 3MB`,
    };
  }

  return { valid: true };
};
