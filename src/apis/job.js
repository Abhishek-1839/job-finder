import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getJobDetailsById = async (jobId) => {
    try {
        const reqUrl = `${backendUrl}/api/job/details/${jobId}`;
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        console.error("Error fetching job details:", error.message);
        throw new Error("Could not fetch job details. Please try again later.");
    }
};

export const createJobPost = async (jobPostPayload) => {
    try {
        const reqUrl = `${backendUrl}/api/job/`;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.post(reqUrl, jobPostPayload);
        return response.data;
    } catch (error) {
        console.error("Error creating job post:", error.message);
        throw new Error("Could not create job post. Please try again later.");
    }
};

export const updateJobPostById = async (jobPostId, updatedFormData) => {
    try {
        const reqUrl = `${backendUrl}/api/job/${jobPostId}`;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.put(reqUrl, updatedFormData);
        return response.data;
    } catch (error) {
        console.error("Error updating job post:", error.message);
        throw new Error("Could not update job post. Please try again later.");
    }
};

// export const getAllJobPost = async (filter = {}) => {
//     try {
//         const query = new URLSearchParams(filter).toString();
//         const reqUrl = `${backendUrl}/api/job/all-jobs?${query}`;
//         const response = await axios.get(reqUrl);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching all job posts:", error.message);
//         throw new Error("Could not fetch job posts. Please try again later.");
//     }
// };
export const getAllJobPost = async (filter = {}) => {
    try {
        const query = new URLSearchParams(filter).toString();
        const reqUrl = `${backendUrl}/api/job/all-jobs?${query}`;
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        console.error("Error fetching all job posts:", error.message);
        throw new Error("Could not fetch job posts. Please try again later.");
    }
};

// apis/job.js
export const getAllSkills = async () => {
    try {
        const response = await fetch("/api/job/skills"); // Replace with your actual API endpoint
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.skills; // Assuming the response contains a `skills` array
    } catch (error) {
        console.error("Error fetching skills:", error.message);
        throw error;
    }
};
