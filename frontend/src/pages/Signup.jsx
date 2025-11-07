import React, { useState } from "react";
import axios from "axios";

// Make sure this points to your backend
const API = import.meta.env.VITE_API_URL;

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  // Update form state
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debug log: check form data
    console.log("Sending data to backend:", form);

    try {
      const res = await axios.post(`${API}/api/auth/register`, form, {
        headers: { "Content-Type": "application/json" }, // ✅ important
      });

      console.log("Backend response:", res.data);

      // Save token
      localStorage.setItem("token", res.data.token);

      alert("Registration successful!");
      window.location.href = "/"; // redirect to home
    } catch (err) {
      // ✅ Full error handling
      if (err.response) {
        // Backend responded with a status code
        console.error("Backend error response:", err.response.data);
        alert(err.response.data.message || "Registration failed");
      } else if (err.request) {
        // Request made but no response received
        console.error("No response received:", err.request);
        alert("Cannot reach backend. Make sure your server is running on port 5000.");
      } else {
        // Something else went wrong setting up the request
        console.error("Error setting up request:", err.message);
        alert("An error occurred: " + err.message);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: { maxWidth: "400px", margin: "50px auto", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { padding: "10px", fontSize: "16px" },
  button: { padding: "10px", fontSize: "16px", cursor: "pointer" },
};

export default Signup;
