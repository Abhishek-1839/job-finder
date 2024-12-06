import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const loginUser = async (email, password) => {
    try {
        const reqUrl = `${backendUrl}/api/user/signin`;
        const response = await axios.post(reqUrl, { email, password });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Login failed. Please try again.");
    }
};

export const registerUser = async ({ email, password, name, phone }) => {
    try {
        const reqUrl = `${backendUrl}/api/user/signup`;
        const response = await axios.post(reqUrl, { email, password, name, phone });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Registration failed. Please try again.");
    }
};
