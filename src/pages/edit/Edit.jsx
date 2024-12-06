import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getJobDetailsById, updateJobPostById } from "../../apis/job"; // Updated API functions
import toast from "react-hot-toast";
import "./Edit.css"; // Import the CSS file

export default function Edit() {
    const { id } = useParams();
    const [job, setJob] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
    });
    const [loading, setLoading] = useState(false);

    // Fetch job details by ID
    useEffect(() => {
        const fetchJob = async () => {
            try {
                setLoading(true);
                const response = await getJobDetailsById(id); // Fetch job by ID
                setJob({
                    companyName: response.companyName || "",
                    logoURL: response.logoURL || "",
                    position: response.position || "", // position is equivalent to the title
                    salary: response.salary || "",
                    jobType: response.jobType || "",
                    remote: response.remote || "",
                    location: response.location || "",
                    description: response.description || "",
                    skillsRequired: response.skillsRequired || [],
                });
            } catch (error) {
                toast.error("Failed to load job details. Please try again.");
                console.error("Error fetching job details:", error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    // Handle form submission to update job
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const updatedJob = {
                companyName: job.companyName,
                position: job.position,
                salary: job.salary,
                jobType: job.jobType,
                remote: job.remote,
                location: job.location,
                description: job.description,
                skillsRequired: job.skillsRequired,
            };
            const response = await updateJobPostById(id, updatedJob);
            toast.success("Job updated successfully!");
        } catch (error) {
            toast.error("Failed to update job. Please try again.");
            console.error("Error updating job:", error.message);
        } finally {
            setLoading(false);
        }
    };

    // Render loading state or edit form
    return (
        <div className="edit-container">
            <h1>Edit Job Details</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleSubmit} className="edit-form">
                    <div className="form-group">
                        <label htmlFor="companyName">Company Name:</label>
                        <input
                            id="companyName"
                            value={job.companyName}
                            type="text"
                            placeholder="Company Name"
                            onChange={(e) => setJob({ ...job, companyName: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="position">Position:</label>
                        <input
                            id="position"
                            value={job.position}
                            type="text"
                            placeholder="Position"
                            onChange={(e) => setJob({ ...job, position: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="salary">Salary:</label>
                        <input
                            id="salary"
                            value={job.salary}
                            type="text"
                            placeholder="Salary"
                            onChange={(e) => setJob({ ...job, salary: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="jobType">Job Type:</label>
                        <select
                            id="jobType"
                            value={job.jobType}
                            onChange={(e) => setJob({ ...job, jobType: e.target.value })}
                        >
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="remote">Remote:</label>
                        <select
                            id="remote"
                            value={job.remote}
                            onChange={(e) => setJob({ ...job, remote: e.target.value })}
                        >
                            <option value="Remote">Remote</option>
                            <option value="Office">Office</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location:</label>
                        <input
                            id="location"
                            value={job.location}
                            type="text"
                            placeholder="Location"
                            onChange={(e) => setJob({ ...job, location: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            value={job.description}
                            placeholder="Description"
                            onChange={(e) => setJob({ ...job, description: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="skillsRequired">Skills Required (comma separated):</label>
                        <input
                            id="skillsRequired"
                            value={job.skillsRequired?.join(", ") || ""} // Display as comma-separated
                            type="text"
                            placeholder="Skills (comma separated)"
                            onChange={(e) => setJob({ ...job, skillsRequired: e.target.value.split(",") })}
                        />
                    </div>

                    <button type="submit" disabled={loading} className="submit-btn">
                        {loading ? "Saving..." : "Submit"}
                    </button>
                </form>
            )}
        </div>
    );
}
