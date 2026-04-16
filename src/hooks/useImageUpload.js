import { useState } from "react";
import { uploadCloudinary } from "../utils/uploadCloudinary";
import { message } from "antd";

export const useImageUpload = (form) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);

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
      const url = await uploadCloudinary(file);

      setUploadedUrl(url);
      form?.setFieldsValue({ logo: url });

      setPreview(url);
    } catch (err) {
      message.error("Upload ảnh thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const resetImage = () => {
    setPreview(null);
    setUploadedUrl(null);
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
