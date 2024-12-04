import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getJobById } from "../../services"
export default function JobDetail() {
    const { id } = useParams()
    const [job, setJob] = useState({})
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await getJobById(id)
                setJob(response)
            } catch (error) {
                console.log(error)
            }
        }
        fetchJob()
    }, [])
    return (
        <div>
            <h1>Job Detail</h1>
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <p>{job.location}</p>
            <p>{job.salary}</p>
        </div>
    )
}



// CREATE AND EDIT TUESDAY OR WEDNESDAY 
// FILTERS AND SEARCH THURSDAY
// FINAL DISCUSSION(DOUBTS/UI) FRIDAY