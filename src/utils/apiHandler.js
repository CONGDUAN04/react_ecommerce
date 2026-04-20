export const handleApiSuccess = (api, message) => {
  api.success({
    message: "Thành công",
    description: message || "Thao tác thành công",
    duration: 2,
  });
};

export const handleApiError = (api, err, form) => {
  const error = err?.error || err;
  if (form && error?.errors?.length > 0) {
    form.setFields(
      error.errors.map((e) => ({
        name: e.field,
        errors: [e.message],
      })),
    );
    return;
  }

  if (error?.code === "CONFLICT" || error?.ErrorCode === 2) {
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
