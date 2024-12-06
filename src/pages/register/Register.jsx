import React, { useState } from "react";
import { registerUser } from "../../apis/auth";
import { useNavigate } from "react-router";
import styles from "./register.module.css";

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async () => {
        if (!formData.email || !formData.password || !formData.name || !formData.phone) {
            alert("All fields are required");
            return;
        }

        try {
            const response = await registerUser({ ...formData });
            if (response?.message) {
                alert(response.message);
                navigate("/login");
            }
        } catch (error) {
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        // <div className={styles.container}>
        //     <h1 className={styles.h1}>Create an account</h1>
        //     <h2 className={styles.h2}>Your personal job finder is here</h2>
        //     <input
        //         className={styles.input}
        //         name="name"
        //         onChange={handleChange}
        //         type="text"
        //         placeholder="Name"
        //     />
        //     <input
        //         className={styles.input}
        //         name="email"
        //         onChange={handleChange}
        //         type="email"
        //         placeholder="Email"
        //     />
        //     <input
        //         className={styles.input}
        //         name="phone"
        //         onChange={handleChange}
        //         type="tel"
        //         placeholder="Phone"
        //     />
        //     <input
        //         className={styles.input}
        //         name="password"
        //         onChange={handleChange}
        //         type="password"
        //         placeholder="Password"
        //     />
        //     <button onClick={handleSubmit} className={styles.button}>
        //         Create Account
        //     </button>
        //     <p className={styles.footer}>
        //         Already have an account?{" "}
        //         <span className={styles.underline} onClick={() => navigate("/login")}>
        //             Sign in
        //         </span>
        //     </p>
        // </div>
        <div className={styles.container}>
  <h1>Create an account</h1>
  <h2>Your personal job finder is here</h2>
  <input
    className={styles.input}
    name="name"
    onChange={handleChange}
    type="text"
    placeholder="Name"
  />
  <input
    className={styles.input}
    name="email"
    onChange={handleChange}
    type="email"
    placeholder="Email"
  />
  <input
    className={styles.input}
    name="phone"
    onChange={handleChange}
    type="tel"
    placeholder="Phone"
  />
  <input
    className={styles.input}
    name="password"
    onChange={handleChange}
    type="password"
    placeholder="Password"
  />
  <button onClick={handleSubmit} className={styles.button}>
    Create Account
  </button>
  <p className={styles.footer}>
    Already have an account?{" "}
    <span className={styles.underline} onClick={() => navigate("/login")}>
      Sign in
    </span>
  </p>
</div>

    );
}
