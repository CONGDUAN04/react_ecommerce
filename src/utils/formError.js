export const applyBackendErrors = (form, error) => {
    const errors = error?.response?.data?.errors;
    if (!Array.isArray(errors)) return;
    form.setFields(
        errors.map(err => ({
            name: err.field.replace(/^body\./, ""),
            errors: [err.message],
        }))
    );
};
