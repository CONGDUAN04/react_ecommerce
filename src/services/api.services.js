import axios from "./axios.customize";

//////////////////// CREATE ////////////////////

export const createUserAPI = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) formData.append(key, value);
    });
    return axios.post("/api/admin/users", formData);
};

export const createProductAPI = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) formData.append(key, value);
    });
    return axios.post("/api/admin/products", formData);
};

export const createBrandAPI = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) formData.append(key, value);
    });
    return axios.post("/api/admin/brands", formData);
};

export const createCategoryAPI = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) formData.append(key, value);
    });
    return axios.post("/api/admin/categories", formData);
};
export const createTargetAPI = (data) => {
    return axios.post("/api/admin/targets", data);
}
export const createColorAPI = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) formData.append(key, value);
    });
    return axios.post("/api/admin/colors", formData);
};

export const createStoragesAPI = ({ colorId, storages }) =>
    axios.post("/api/admin/storages", {
        colorId: Number(colorId),
        storages: storages.map(s => ({
            name: s.name.trim(),
            price: s.price,
            quantity: Number(s.quantity),
        })),
    });

export const registerUserAPI = (data) =>
    axios.post("/api/register", data);

//////////////////// UPDATE ////////////////////

export const updateUserAPI = (userId, data) => {
    if (!userId) throw new Error("userId is required");
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) formData.append(key, value);
    });
    return axios.put(`/api/admin/users/${userId}`, formData);
};

export const updateProfileAPI = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) formData.append(key, value);
    });
    return axios.patch("/api/user/update-profile", formData);
};

export const updateProductAPI = (productId, data) => {
    if (!productId) throw new Error("productId is required");
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) formData.append(key, value);
    });
    return axios.put(`/api/admin/products/${productId}`, formData);
};

export const updateBrandAPI = (brandId, data) => {
    if (!brandId) throw new Error("brandId is required");
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) formData.append(key, value);
    });
    return axios.put(`/api/admin/brands/${brandId}`, formData);
};

export const updateCategoryAPI = (categoryId, data) => {
    if (!categoryId) throw new Error("categoryId is required");
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) formData.append(key, value);
    });
    return axios.put(`/api/admin/categories/${categoryId}`, formData);
};

export const updateColorAPI = (colorId, data) => {
    if (!colorId) throw new Error("colorId is required");
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) formData.append(key, value);
    });
    return axios.put(`/api/admin/colors/${colorId}`, formData);
};
export const updateTargetAPI = (id, data) => {
    return axios.put(`/api/admin/targets/${id}`, data);
};
export const updateStorageAPI = (storageId, data) => {
    if (!storageId) throw new Error("storageId is required");
    return axios.put(`/api/admin/storages/${storageId}`, data);
};

//////////////////// DELETE ////////////////////
export const deleteTargetAPI = (id) => {
    return axios.delete(`/api/admin/targets/${id}`);
};

export const deleteUserAPI = (userId) => {
    if (!userId) throw new Error("userId is required");
    return axios.delete(`/api/admin/users/${userId}`);
};

export const deleteProductAPI = (productId) => {
    if (!productId) throw new Error("productId is required");
    return axios.delete(`/api/admin/products/${productId}`);
};

export const deleteBrandAPI = (brandId) => {
    if (!brandId) throw new Error("brandId is required");
    return axios.delete(`/api/admin/brands/${brandId}`);
};

export const deleteCategoryAPI = (categoryId) => {
    if (!categoryId) throw new Error("categoryId is required");
    return axios.delete(`/api/admin/categories/${categoryId}`);
};

export const deleteColorAPI = (colorId) => {
    if (!colorId) throw new Error("colorId is required");
    return axios.delete(`/api/admin/colors/${colorId}`);
};

export const deleteStorageAPI = (storageId) => {
    if (!storageId) throw new Error("storageId is required");
    return axios.delete(`/api/admin/storages/${storageId}`);
};

//////////////////// FETCH ////////////////////

export const fetchAllDashboardAPI = () =>
    axios.get("/api/admin/dashboard");

export const fetchAllUserAPI = () =>
    axios.get("/api/admin/users");

export const fetchAllRolesAPI = () =>
    axios.get("/api/admin/roles");

export const fetchProductsAPI = (page, limit) =>
    axios.get(`/api/admin/products?page=${page}&limit=${limit}`);

export const fetchAllBrandsAPI = (page, limit) => {
    const params = {};
    if (page != null) params.page = page;
    if (limit != null) params.limit = limit;
    return axios.get('/api/admin/brands', { params });
};

export const fetchAllCategoriesAPI = (page, limit) => {
    const params = {};
    if (page != null) params.page = page;
    if (limit != null) params.limit = limit;
    return axios.get('/api/admin/categories', { params });
};

export const fetchAllTargetsAPI = (page, limit) => {
    const params = {};
    if (page != null) params.page = page;
    if (limit != null) params.limit = limit;
    return axios.get('/api/admin/targets', { params });
};
export const fetchAllColorAPI = (page, limit) =>
    axios.get(`/api/admin/colors?page=${page}&limit=${limit}`);

export const fetchAllStoragesAPI = (page, limit) =>
    axios.get(`/api/admin/storages?page=${page}&limit=${limit}`);
export const getAccountAPI = () => {
    const token = localStorage.getItem("access_token");
    return axios.get("/api/account", {
        headers: { Authorization: `Bearer ${token}` },
    });
};

//////////////////// AUTH ////////////////////

export const loginUserAPI = (email, password) =>
    axios.post("/api/login", {
        username: email,
        password,
    });

export const logoutAPI = () =>
    axios.post("/api/logout");
