import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getJobDetailsById } from "../../apis/job";
import styles from "./JobDetails.module.css";

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [jobDetails, setJobDetails] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await getJobDetailsById(id);
                setJobDetails(response);
            } catch (error) {
                alert("Failed to fetch job details. Please try again.");
            }
        };
        fetchJobDetails();
    }, [id]);

    const handleEditClick = () => {
        navigate(`/edit/${jobDetails._id}`, {
            state: { id: jobDetails._id, jobDetails, edit: true },
        });
    };

    if (!jobDetails) return <p>Loading job details...</p>;

    return (
        <div className={styles.body}>
        <div className={styles.nav}>
            <p className={styles.navText}>Jobfinder</p>
            <div className={styles.btnGrp}>
                <button className={styles.login}>Login</button>
                <button className={styles.register}>Register</button>
            </div>
        </div>
        <div className={styles.container}>
            <p className={styles.containerText}>{jobDetails.companyName}</p>
        </div>
        <div className={styles.containerBottom}>
            <div className={styles.preHeading}>
                <p className={styles.lightText}>{jobDetails.jobType}</p>
            </div>
            <div className={styles.heading}>
                <div>
                    <p className={styles.boldText}>{jobDetails.title}</p>
                    <p className={styles.locationText}>{jobDetails.location}</p>
                </div>
                <div>
                    <button onClick={handleEditClick} className={styles.edit}>
                        Edit Job
                    </button>
                </div>
            </div>
            <div className={styles.perks}>
                <div>
                    <p className={styles.lightText}>Stipend</p>
                    <p className={styles.lightText}>{jobDetails.salary}</p>
                </div>
                {/* <div>
                    <p className={styles.lightText}>Duration</p>
                    <p className={styles.lightText}>{jobDetails.duration}</p>
                </div> */}
            </div>
            <div className={styles.info}>
                <h2>About Company</h2>
                <p className={styles.lightText}>{jobDetails.about}</p>
            </div>
            <div className={styles.info}>
                <h2>Skill(s) Required</h2>
                {jobDetails.skillsRequired?.map((skill, index) => (
                    <p className={styles.skill} key={index}>
                        {skill}
                    </p>
                ))}
            </div>
            <div className={styles.info}>
                <h2>About the job/internship</h2>
                <p className={styles.lightText}>{jobDetails.description}</p>
            </div>
        </div>
    </div>
    );
};

export default JobDetails;
