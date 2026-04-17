import { useState, useRef } from "react";
import { uploadCloudinary } from "../utils/uploadCloudinary";
import { message } from "antd";

export const useImageUpload = (
  form,
  fieldName = "image",
  folder = "default",
) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  // ✅ Giữ form ref luôn fresh
  const formRef = useRef(form);
  formRef.current = form;

  const handleChangeFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      message.error("Chỉ được upload file ảnh!");
      return;
    }

    setPreview(URL.createObjectURL(file));
    setLoading(true);

    try {
      const url = await uploadCloudinary(file, folder);

      setUploadedUrl(url);

      // ✅ Dùng formRef thay vì form trực tiếp
      formRef.current?.setFieldsValue({
        [fieldName]: url,
      });

      setPreview(url);
    } catch (err) {
      message.error("Upload ảnh thất bại!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Reset sạch hoàn toàn
  const resetImage = () => {
    setPreview(null);
    setUploadedUrl(null);
    formRef.current?.setFieldsValue({
      [fieldName]: null,
    });
  };

  const setPreviewFromUrl = (url) => {
    setPreview(url);
    setUploadedUrl(url);
  };

  return {
    preview,
    loading,
    uploadedUrl,
    handleChangeFile,
    resetImage,
    setPreviewFromUrl,
  };
};
