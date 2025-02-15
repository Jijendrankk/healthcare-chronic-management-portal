import { useState } from "react";
import { useRouter } from "next/router";
// import { registerUser } from "../utils/api";
// import { setAuthToken, setUserData } from "../utils/auth";
import axios from "axios";
import styles from "../styles/auth.module.scss";
import { setUser } from "@/redux/slices/userSlice";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        { name:formData.name,email: formData.email, password:formData.password },
        { withCredentials: true } 
    );
    console.log(response.data.newUser.name);
      // setAuthToken(response.data.token); 
      // setUserData(response.data.user);
    alert(`Registered Successfull${response.data.newUser.name}`)  
      router.push("/login"); // Redirect to dashboard
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
      />
      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}
