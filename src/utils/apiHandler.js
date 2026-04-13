export const handleApiSuccess = (api, message) => {
  api.success({
    message: "Thành công",
    description: message || "Thao tác thành công",
    duration: 2,
  });
};

export const handleApiError = (api, err, form) => {
  const error = err?.error || err;
  console.log("DEBUG ERROR:", error);
  if (error?.code === "VALIDATION_ERROR") {
    const fieldMapping = {
      username: "email",
      password: "password",
    };

    const formErrors = error.errors.map((e) => ({
      name: fieldMapping[e.field] || e.field,
      errors: [e.message],
    }));

    if (form) {
      form.setFields(formErrors);
      return;
    }
  }

  if (error?.code === "CONFLICT") {
    api.warning({
      message: "Thông báo",
      description: error.message,
      duration: 3,
    });
    return;
  }

  api.error({
    message: "Lỗi",
    description: error?.message || "Có lỗi xảy ra, vui lòng thử lại",
    duration: 3,
  });
};
