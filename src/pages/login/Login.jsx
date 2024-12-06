import React, { useState } from "react";
import { loginUser } from "../../apis/auth";
import { useNavigate } from "react-router";
import styles from "./login.module.css";

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleFormChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async () => {
        if (!formData.email || !formData.password) {
            alert("Fields can't be empty");
            return;
        }

        try {
            const response = await loginUser(formData.email, formData.password);
            if (response?.token) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("userId", response.id);
                alert("Login successful!");
                navigate("/");
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>Already have an account?</h1>
            <h2 className={styles.h2}>Your personal job finder is here</h2>
            <input
                className={styles.input}
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                type="email"
                placeholder="Email"
            />
            <input
                className={styles.input}
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                type="password"
                placeholder="Password"
            />
            <button onClick={handleSubmit} className={styles.button}>
                Sign in
            </button>
            <p className={styles.footer}>
                Don&apos;t have an account?{" "}
                <span className={styles.underline} onClick={() => navigate("/register")}>
                    Sign Up
                </span>
            </p>
        </div>
    );
}
