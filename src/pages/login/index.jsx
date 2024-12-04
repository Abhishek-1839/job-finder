import { useState } from "react"
import styles from "./login.module.css"
import toast from "react-hot-toast"
import { login } from "../../services"
import { useNavigate } from "react-router-dom"
export default function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState(false)
    const [formErrors, setFormErrors] = useState({
        email: null,
        password: null,
    })
    const handleRegister = async (e) => {
        e.preventDefault()
        let errors = false;
        setFormErrors((formErrors) => { return { ...formErrors, email: null, name: null, phone: null, password: null } })
        if (!formData.email || formData.email.length < 1 || !formData.email.includes("@") || !formData.email.includes(".")) {
            setFormErrors((formErrors) => { return { ...formErrors, email: "Email is invalid" } })
            errors = true
        }
        if (!formData.password) {
            setFormErrors((formErrors) => { return { ...formErrors, password: "Password is required" } })
            errors = true
        }
        if (errors) {
            return
        }
        try {
            setLoading(() => true)
            const response = await login(formData)
            toast.success(response.message)
            console.log(response)
            if (response.token) {
                localStorage.setItem("token", response.token)
                localStorage.setItem("userId", response.id)
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(() => false)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.leftPanel}>
                <header>
                    <h1>Already have an account?</h1>
                    <h3>Your personal job finder is here</h3>
                </header>
                <form className={styles.form} onSubmit={handleRegister}>
                    <input
                        value={formData.email}
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {formErrors.email && <p className={styles.error}>{formErrors.email}</p>}
                    <input
                        value={formData.password}
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    {formErrors.password && <p className={styles.error}>{formErrors.password}</p>}
                    <button disabled={loading} type="submit">
                        {loading ? "Loading..." : "Sign In"}
                    </button>
                </form>
                <p className={styles.signup}>Don’t have an account? <a href="/register">Sign Up</a></p>
            </div>
            <div className={styles.rightPanel}>
                <span>Your Personal Job Finder</span>
            </div>
        </div> 
    )
}
