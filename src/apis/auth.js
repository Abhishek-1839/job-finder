import api from "./api";

export const loginUser = async (email, password) => {
    try {
        const response = await api.post("/api/user/signin", { email, password });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Login failed. Please try again.");
    }
};

export const registerUser = async ({ email, password, name, phone }) => {
    try {
        const response = await api.post("/api/user/signup", { email, password, name, phone });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Registration failed. Please try again.");
    }
};
