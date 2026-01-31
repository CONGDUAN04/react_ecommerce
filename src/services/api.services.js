import axios from "./axios.customize";

//////////////////// HELPERS ////////////////////

const buildFormData = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) formData.append(key, value);
    });
    return formData;
};

//////////////////// AUTH ////////////////////

export const loginUserAPI = (email, password) =>
    axios.post("/api/login", {
        username: email,
        password,
    });

export const registerUserAPI = (data) =>
    axios.post("/api/register", data);

export const logoutAPI = () =>
    axios.post("/api/logout");

//////////////////// ACCOUNT ////////////////////

export const getAccountAPI = () => {
    const token = localStorage.getItem("access_token");
    return axios.get("/api/account", {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updateProfileAPI = (data) =>
    axios.patch("/api/user/update-profile", buildFormData(data));

//////////////////// USER ////////////////////

export const fetchAllUserAPI = () =>
    axios.get("/api/admin/users");

export const createUserAPI = (data) =>
    axios.post("/api/admin/users", buildFormData(data));

export const updateUserAPI = (userId, data) => {
    if (!userId) throw new Error("userId is required");
    return axios.put(`/api/admin/users/${userId}`, buildFormData(data));
};

export const deleteUserAPI = (userId) => {
    if (!userId) throw new Error("userId is required");
    return axios.delete(`/api/admin/users/${userId}`);
};

export const fetchAllRolesAPI = () =>
    axios.get("/api/admin/roles");


//////////////////// BRAND ////////////////////

export const fetchAllBrandsAPI = (page, limit) =>
    axios.get("/api/admin/brands", { params: { page, limit } });

export const createBrandAPI = (data) =>
    axios.post("/api/admin/brands", buildFormData(data));

export const updateBrandAPI = (brandId, data) => {
    if (!brandId) throw new Error("brandId is required");
    return axios.put(`/api/admin/brands/${brandId}`, buildFormData(data));
};

export const deleteBrandAPI = (brandId) => {
    if (!brandId) throw new Error("brandId is required");
    return axios.delete(`/api/admin/brands/${brandId}`);
};

//////////////////// CATEGORY ////////////////////

export const fetchAllCategoriesAPI = (page, limit) =>
    axios.get("/api/admin/categories", { params: { page, limit } });

export const createCategoryAPI = (data) =>
    axios.post("/api/admin/categories", buildFormData(data));

export const updateCategoryAPI = (categoryId, data) => {
    if (!categoryId) throw new Error("categoryId is required");
    return axios.put(`/api/admin/categories/${categoryId}`, buildFormData(data));
};

export const deleteCategoryAPI = (categoryId) => {
    if (!categoryId) throw new Error("categoryId is required");
    return axios.delete(`/api/admin/categories/${categoryId}`);
};

//////////////////// COLOR ////////////////////

export const fetchAllColorAPI = (page, limit) =>
    axios.get(`/api/admin/colors?page=${page}&limit=${limit}`);

export const createColorAPI = (data) =>
    axios.post("/api/admin/colors", buildFormData(data));

export const updateColorAPI = (colorId, data) => {
    if (!colorId) throw new Error("colorId is required");
    return axios.put(`/api/admin/colors/${colorId}`, buildFormData(data));
};

export const deleteColorAPI = (colorId) => {
    if (!colorId) throw new Error("colorId is required");
    return axios.delete(`/api/admin/colors/${colorId}`);
};



//////////////////// PRODUCT GROUP ////////////////////

export const fetchProductGroupsAPI = (page, limit) =>
    axios.get(`/api/admin/product-groups?page=${page}&limit=${limit}`);

export const createProductGroupAPI = (data) =>
    axios.post("/api/admin/product-groups", data);

export const updateProductGroupAPI = (id, data) =>
    axios.put(`/api/admin/product-groups/${id}`, data);

export const deleteProductGroupAPI = (id) =>
    axios.delete(`/api/admin/product-groups/${id}`);

//////////////////// PRODUCT ////////////////////

export const getHomeProductsAPI = () =>
    axios.get("/");

export const fetchProductsAPI = (page, limit) =>
    axios.get(`/api/admin/products?page=${page}&limit=${limit}`);

export const createProductAPI = (data) => {
    const res = axios.post("/api/admin/products", buildFormData(data));
    return res

}
export const updateProductAPI = (productId, data) => {
    if (!productId) throw new Error("productId is required");
    return axios.put(`/api/admin/products/${productId}`, buildFormData(data));
};

export const deleteProductAPI = (productId) => {
    if (!productId) throw new Error("productId is required");
    return axios.delete(`/api/admin/products/${productId}`);
};
//////////////////// DASHBOARD ////////////////////

export const fetchAllDashboardAPI = () =>
    axios.get("/api/admin/dashboard");
