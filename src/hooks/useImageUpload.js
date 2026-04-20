import { useState, useRef } from "react";
import axios from "axios";
import { getUploadSignatureAPI } from "../services/api.upload";

export const useImageUpload = (form, config) => {
  const { type, fieldName, fieldId } = config;

  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const objectUrlRef = useRef(null);

  const handleChangeFile = async (e) => {
    const rawFile = e?.target?.files?.[0];

    if (!rawFile || !(rawFile instanceof File)) return;

    if (!rawFile.type.startsWith("image/")) return;

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const objectUrl = URL.createObjectURL(rawFile);
    objectUrlRef.current = objectUrl;
    setPreview(objectUrl);

    setUploading(true);

    try {
      const data = await getUploadSignatureAPI(type);

      if (!data?.apiKey || !data?.cloudName) {
        throw new Error();
      }

      const formData = new FormData();
      formData.append("file", rawFile);
      formData.append("api_key", data.apiKey);
      formData.append("timestamp", data.timestamp);
      formData.append("signature", data.signature);
      formData.append("folder", data.folder);
      formData.append("public_id", data.public_id);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${data.cloudName}/image/upload`,
        formData,
      );

      const imageUrl = res.data.secure_url;
      const publicId = res.data.public_id;

      setPreview(imageUrl);

      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }

      form.setFieldsValue({
        [fieldName]: imageUrl,
        [fieldId]: publicId,
      });
    } catch {
      form.setFieldsValue({
        [fieldName]: null,
        [fieldId]: null,
      });
    } finally {
      setUploading(false);
    }
  };

  const setPreviewFromUrl = (url) => {
    if (url) setPreview(url);
  };

  const resetImage = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    setPreview(null);

    form.setFieldsValue({
      [fieldName]: null,
      [fieldId]: null,
    });
  };

  return {
    preview,
    uploading,
    handleChangeFile,
    setPreviewFromUrl,
    resetImage,
  };
};
