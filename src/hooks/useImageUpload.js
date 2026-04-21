import { useState, useRef } from "react";
import { validateImageFile } from "../utils/fileValidator";
import { uploadToCloudinary } from "../utils/uploadCloudinary";

export const useImageUpload = (form, config) => {
  const { type, fieldName, fieldId } = config;

  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const objectUrlRef = useRef(null);
  const pendingFileRef = useRef(null);

  const setPreviewFromUrl = (url) => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    pendingFileRef.current = null;
    setPreview(url);
  };

  const handleChangeFile = async (e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;

    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);

    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;
    setPreview(objectUrl);

    pendingFileRef.current = file;

    form.setFieldsValue({ [fieldName]: file, [fieldId]: null });

    setUploading(true);

    try {
      const check = validateImageFile(file);

      if (!check.valid) {
        await new Promise((r) => setTimeout(r, 500));
        return;
      }

      const { imageUrl, publicId } = await uploadToCloudinary(file, type);

      setPreview(imageUrl);

      form.setFieldsValue({ [fieldName]: imageUrl, [fieldId]: publicId });

      pendingFileRef.current = null;
    } catch {
      form.setFields([{ name: fieldName, errors: ["Upload thất bại"] }]);
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const logoValidator = async (_, value) => {
    const file = pendingFileRef.current;

    if (!file && !value) {
      return Promise.reject("Vui lòng chọn ảnh");
    }

    if (typeof value === "string" && value.startsWith("http")) {
      return Promise.resolve();
    }

    const check = validateImageFile(file);
    if (!check.valid) {
      return Promise.reject(check.message);
    }

    return Promise.resolve();
  };

  const resetImage = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    pendingFileRef.current = null;
    setPreview(null);

    form.setFieldsValue({ [fieldName]: null, [fieldId]: null });
    form.setFields([{ name: fieldName, errors: [] }]);
  };

  return {
    preview,
    uploading,
    handleChangeFile,
    logoValidator,
    resetImage,
    setPreviewFromUrl,
  };
};
