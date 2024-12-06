import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllJobPost, getAllSkills } from "../../apis/job";
import { DEFAULT_SKILLS } from "../../utils/constants";
import { CiSearch } from "react-icons/ci";
import styles from "./home.module.css";
import shape1 from '../../assets/Rectangle 3.png';
import shape2 from '../../assets/Rectangle 4(1).png';
import { MdOutlinePeople } from "react-icons/md";

export default function Home() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);  // Stores all jobs
    const [filteredJobs, setFilteredJobs] = useState([]); // Stores filtered jobs
    const [skills, setSkills] = useState([]);  // Selected skills for filtering
    const [title, setTitle] = useState("");  // Title for search filter
    const [token] = useState(localStorage.getItem("token"));
    const [availableSkills, setAvailableSkills] = useState([]);
    // const fetchAllJobs = async () => {
    //     try {
    //         const response = await getAllJobPost();  // Get all jobs without filters
    //         setJobs(response.data || []);
    //         setFilteredJobs(response.data || []); // Initialize filtered jobs with all fetched jobs
    //     } catch (error) {
    //         console.error("Error fetching jobs:", error.message);
    //     }
    // };
    const fetchAllJobs = async () => {
        try {
            const filter = {};
    
            // Set search query for title
            if (title) {
                filter.search = title;
            }
    
            // Set skills filter if skills are selected
            if (skills.length > 0) {
                filter.skills = skills.join(",");
            }
    
            const response = await getAllJobPost(filter);
            setJobs(response);  // All jobs are fetched now, before any filtering
            setFilteredJobs(response);  // Initialize filtered jobs with all fetched jobs
        } catch (error) {
            console.error("Error fetching jobs:", error.message);
        }
    };
    const fetchAvailableSkills = () => {
        const skillsSet = new Set();
        jobs.forEach((job) => {
            if (job.skillsRequired && Array.isArray(job.skillsRequired)) {
                job.skillsRequired.forEach((skill) => skillsSet.add(skill));
            }
        });
        setAvailableSkills([...skillsSet]); // Populate dropdown with unique skills
    };
    

    
    useEffect(() => {
        fetchAllJobs();
    }, []); // Re-fetch jobs whenever filters are updated
    
    
        
    useEffect(() => {
        fetchAvailableSkills(); // Generate skills list after jobs are fetched
    }, [jobs]); // Run only when `jobs` changes
    
    const filterJobs = () => {
        let filtered = [...jobs]; // Start with all jobs

        // Filter by title
        if (title) {
            filtered = filtered.filter((job) =>
                job.position.toLowerCase().includes(title.toLowerCase())
            );
        }

        // Filter by selected skills
        if (skills.length > 0) {
            filtered = filtered.filter((job) =>
                skills.every(skill => job.skills && job.skills.includes(skill))
            );
        }

        setFilteredJobs(filtered);  // Update the filtered jobs
    };

    // Reapply filters whenever the user changes skills or title
    useEffect(() => {
        filterJobs();  // Apply filter every time skills or title change
    }, [skills, title]);

    const handleLogout = () => {
        try {
            localStorage.clear();
            navigate("/register");
        } catch (error) {
            console.error("Error during logout:", error.message);
        }
    };

    const handleSkill = (event) => {
        const selectedSkill = event.target.value;
        if (!skills.includes(selectedSkill)) {
            setSkills([...skills, selectedSkill]);
        }
    };

    const removeSkill = (selectedSkill) => {
        setSkills(skills.filter((skill) => skill !== selectedSkill));
    };



    return (
        <>
            <div className={styles.header}>
                <img src={shape1} alt="shape1" className={styles.shape1} />
                <img src={shape2} alt="shape2" className={styles.shape2} />
                <h3>Jobfinder</h3>
                <div className={styles.btnGroup}>
                {token && <button className={styles.register} onClick={handleLogout}>Logout</button>}
                    <button className={styles.login} onClick={() => navigate("/login")}>Login</button>
                    <button className={styles.register} onClick={() => navigate("/register")}>Register</button>
                </div>
            </div>
            <div className={styles.container}>
                
                <div className={styles.containerTop}>
                    <CiSearch />
                    <input
                        className={styles.inputTop}
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        type="text"
                        name="search"
                        placeholder="Type any job title"
                    />
                </div>
                <div className={styles.containerBottom}>
                    <select
                        onChange={handleSkill}
                        className={styles.inputSelect}
                        name="skills"
                        defaultValue=""
                    >
                        <option disabled value="">Skills</option>
                        {availableSkills.map((skill) => (
                            <option key={skill} value={skill}>
                                {skill}
                            </option>
                        ))}
                    </select>

                    {skills.map((skill) => (
                        <span className={styles.chip} key={skill}>
                            {skill}
                            <span
                                onClick={() => removeSkill(skill)}
                                className={styles.cross}
                            >
                                ╳
                            </span>
                        </span>
                    ))}
                    <div>
                        <button onClick={fetchAllJobs} className={styles.filter}>
                            Apply Filter
                        </button>
                        <button
                            onClick={() => {
                                setSkills([]);
                                setTitle("");
                                fetchAllJobs();
                            }}
                            className={styles.clear}
                        >
                            Clear
                        </button>
                        <button
                            onClick={() => navigate("/create")}
                            className={styles.job}
                        >
                            + Add Job
                        </button>
                    </div>
                </div>
            </div>
            {filteredJobs.length > 0 ? (
                filteredJobs.map((data) => (
                    <div key={data._id} className={styles.list}>
                        <div className={styles.listLeft}>
                            <div>
                                <img className={styles.logo} src={data.logoURL || "https://via.placeholder.com/150"} />
                            </div>
                            <div className={styles.infoLeft}>
                                <p className={styles.position}>
                                    {data.position}
                                </p>
                                <p className={styles.extraInfo}>
                                    <MdOutlinePeople style={{ fontSize: "20px", color: "grey", marginTop: "2px" }} />
                                    <span className={styles.greyText}>11-50</span>
                                    <span className={styles.greyText}>₹ {data.salary}</span>
                                    <span className={styles.greyText}>{data.location}</span>
                                </p>
                                <p className={styles.extraInfo}>
                                    <span className={styles.redText}>{data.remote}</span>
                                    <span className={styles.redText}>{data.jobType}</span>
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className={styles.skills}>
                                {data?.skillsRequired?.map((skill) => (
                                    <span className={styles.skill} key={skill}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            <div className={styles.btnGroup2}>
                                {token && (
                                    <button
                                        onClick={() => navigate(`/edit/${data._id}`)}
                                        className={styles.view}
                                    >
                                        Edit Jobs
                                    </button>
                                )}
                                <button
                                    onClick={() => navigate(`/job/${data._id}`)}
                                    className={styles.view}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No jobs found. Adjust your filters and try again.</p>
            )}
        </>
    );
}
