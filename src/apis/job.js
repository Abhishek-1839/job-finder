import api from "./api";

export const getJobDetailsById = async (jobId) => {
    try {
        const response = await api.get(`/api/job/details/${jobId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching job details:", error.message);
        throw new Error("Could not fetch job details. Please try again later.");
    }
};

export const createJobPost = async (jobPostPayload) => {
    try {
        const token = localStorage.getItem("token");
        const response = await api.post(
            "/api/job/",
            jobPostPayload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error creating job post:", error.message);
        throw new Error("Could not create job post. Please try again later.");
    }
};

export const updateJobPostById = async (jobPostId, updatedFormData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await api.put(
            `/api/job/${jobPostId}`,
            updatedFormData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating job post:", error.message);
        throw new Error("Could not update job post. Please try again later.");
    }
};

export const getAllJobPost = async (filter = {}) => {
    try {
        const query = new URLSearchParams(filter).toString();
        const response = await api.get(`/api/job/all-jobs?${query}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all job posts:", error.message);
        throw new Error("Could not fetch job posts. Please try again later.");
    }
};

export const getAllSkills = async () => {
    try {
        const response = await api.get("/api/job/skills");
        return response.data.skills; // Assuming the response contains a `skills` array
    } catch (error) {
        console.error("Error fetching skills:", error.message);
        throw new Error("Could not fetch skills. Please try again later.");
    }
};
