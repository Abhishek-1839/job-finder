import { useState, useEffect } from "react"
import { getJobs, deleteJob } from "../../services"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import styles from "./home.module.css";
import shape1 from '../../assets/Rectangle 3.png';
import shape2 from '../../assets/Rectangle 4(1).png';

export default function Home() {
    const [jobs, setJobs] = useState([])
    const navigate = useNavigate()
    const fetchJobs = async () => {
        try {
            const response = await getJobs()
            setJobs(response)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchJobs()
    }, [])
    const isEditable = (job) => {
        if (localStorage.getItem("userId") === job.userId) {
            return true
        }
        else {
            return false
        }
    }
    
    const handleDelete = async (id) => {
        try {
            const response = await deleteJob(id)
            toast.success(response.message)
            fetchJobs()
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <img src={shape1} alt="shape1" className={styles.shape1} />
                <img src={shape2} alt="shape2" className={styles.shape2} />
                <h3>Jobfinder</h3>
                <div className={styles.btnGroup}>
                    <button className={styles.login} ><a href="/login" style={{ color: '#ffffff', textDecoration: 'none' }}>LogIn</a></button>
                    <button className={styles.register}><a style={{ textDecoration: 'none', color: '#ED5353' }} href="/register">Register</a></button>
                </div>
            </div>
            <h1>Home</h1>
            {jobs.map((job, index) => (
                <div key={index}>
                    <h2 onClick={() => navigate(`/job/${job._id}`)}>{job.companyName}</h2>
                    <p>{job.logoURL}</p>
                    {isEditable(job) && <button onClick={() => navigate(`/edit/${job._id}`)}>Edit</button>}
                    {isEditable(job) && <button onClick={() => handleDelete(job._id)}>Delete</button>}
                </div>
            ))}
        </div>
    )
}