import { useState } from "react";
import styles from "./register.module.css";
import toast from "react-hot-toast";
import { register } from "../../services";

export default function Register() {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        phone: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({
        email: null,
        name: null,
        phone: null,
        password: null,
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        let errors = false;
        setFormErrors({ email: null, name: null, phone: null, password: null });

        if (!formData.email || !formData.email.includes("@") || !formData.email.includes(".")) {
            setFormErrors((formErrors) => ({ ...formErrors, email: "Email is invalid" }));
            errors = true;
        }
        if (!formData.name) {
            setFormErrors((formErrors) => ({ ...formErrors, name: "Name is required" }));
            errors = true;
        }
        if (!formData.phone || formData.phone.length < 10) {
            setFormErrors((formErrors) => ({ ...formErrors, phone: "Phone number is invalid" }));
            errors = true;
        }
        if (!formData.password) {
            setFormErrors((formErrors) => ({ ...formErrors, password: "Password is required" }));
            errors = true;
        }
        if (errors) {
            return;
        }

        try {
            setLoading(true);
            const response = await register(formData);
            toast.success(response.message);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftPanel}>
                <header>
                    <h1>Create an account</h1>
                    <h3>Your personal job finder is here</h3>
                </header>
                <form className={styles.form} onSubmit={handleRegister}>
                    <input
                        value={formData.name}
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {formErrors.name && <p className={styles.error}>{formErrors.name}</p>}

                    <input
                        value={formData.email}
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {formErrors.email && <p className={styles.error}>{formErrors.email}</p>}

                    <input
                        value={formData.phone}
                        type="text"
                        placeholder="Mobile"
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {formErrors.phone && <p className={styles.error}>{formErrors.phone}</p>}

                    <input
                        value={formData.password}
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    {formErrors.password && <p className={styles.error}>{formErrors.password}</p>}

                    <div className={styles.checkboxContainer}>
                        <input type="checkbox" name="tos" id="tos" />
                        <label htmlFor="tos">By creating an account, I agree to our terms of use and privacy policy</label>
                    </div>

                    <button disabled={loading} type="submit">
                        {loading ? "Loading..." : "Create Account"}
                    </button>
                </form>
                <p className={styles.footerText}>
                    Already have an account? <a href="/login">Sign In</a>
                </p>
            </div>
            <div className={styles.rightPanel}>
                <p>Your Personal Job Finder</p>
            </div>
        </div>
    );
}
