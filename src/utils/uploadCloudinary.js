import axios from "axios";
import { getUploadSignatureAPI } from "../services/api.upload";

export const uploadToCloudinary = async (file, type) => {
  try {
    const data = await getUploadSignatureAPI(type);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", data.apiKey);
    formData.append("timestamp", data.timestamp);
    formData.append("signature", data.signature);
    formData.append("folder", data.folder);
    formData.append("public_id", data.public_id);

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${data.cloudName}/image/upload`,
      formData,
    );

    return {
      imageUrl: res.data?.secure_url,
      publicId: res.data?.public_id,
    };
  } catch (err) {
    console.error("UPLOAD CLOUDINARY ERROR:", err?.response?.data || err);

    throw new Error(err?.response?.data?.error?.message || "Upload thất bại");
  }
};
