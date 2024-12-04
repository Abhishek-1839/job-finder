import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getJobById, updateJob } from "../../services"
import toast from "react-hot-toast"
export default function Edit() {
    const { id } = useParams()
    const [job, setJob] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
    })
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchJob = async () => {
            try {
                setLoading(() => true)
                const response = await getJobById(id)
                setJob(response)
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoading(() => false)
            }
        }
        fetchJob()
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(() => true)
            const response = await updateJob(id, job)
            toast.success(response.message)
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
        finally {
            setLoading(() => false)
        }
    }
    return (
        <div>
            edit
            <h1>Job Detail</h1>
            {loading ? <p>Loading...</p> :
                <form onSubmit={handleSubmit}>
                    <input value={job.title} type="text" placeholder="Title" onChange={(e) => setJob({ ...job, title: e.target.value })} />
                    <input value={job.description} type="text" placeholder="Description" onChange={(e) => setJob({ ...job, description: e.target.value })} />
                    <input value={job.location} type="text" placeholder="Location" onChange={(e) => setJob({ ...job, location: e.target.value })} />
                    <input value={job.salary} type="text" placeholder="Salary" onChange={(e) => setJob({ ...job, salary: e.target.value })} />
                    <button type="submit">Submit</button>
                </form>
            }
        </div>
    )
}