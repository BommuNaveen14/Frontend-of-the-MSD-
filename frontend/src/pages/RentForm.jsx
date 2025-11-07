import React, { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000"; // ✅ fallback

function RentForm() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    rentType: "",
    size: "",
    price: "",
    duration: "",
    description: "",
    email: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Update input values
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );
      if (image) data.append("image", image);

      // ✅ Actual API call to backend
      await axios.post(`${API}/api/rents`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Rent listing uploaded successfully!");
      // Reset form after submission
      setFormData({
        title: "",
        location: "",
        rentType: "",
        size: "",
        price: "",
        duration: "",
        description: "",
        email: "",
      });
      setImage(null);
    } catch (err) {
      console.error("Error uploading rent listing:", err);
      alert("❌ Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rent-form-container" style={{ padding: "2rem" }}>
      <section
        className="form-section"
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "#f9f9f9",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Upload Rent Listing
        </h1>

        <form
          onSubmit={handleSubmit}
          className="land-form"
          encType="multipart/form-data"
        >
          <label htmlFor="title">Property Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="e.g., Lease Land in Guntur"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="City or Area"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <label htmlFor="rentType">Rent Type</label>
          <select
            id="rentType"
            name="rentType"
            value={formData.rentType}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Rent Type --</option>
            <option value="Lease Land">Lease Land</option>
            <option value="Rent Building">Rent Building</option>
          </select>

          <label htmlFor="size">Size (in acres or sq ft)</label>
          <input
            type="number"
            id="size"
            name="size"
            step="0.1"
            value={formData.size}
            onChange={handleChange}
            required
          />

          <label htmlFor="price">Rent Price (INR per month/year)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <label htmlFor="duration">Rent Duration (months/years)</label>
          <input
            type="text"
            id="duration"
            name="duration"
            placeholder="e.g., 6 months, 1 year"
            value={formData.duration}
            onChange={handleChange}
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            placeholder="Brief description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>

          <label htmlFor="email">Contact Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#4CAF50",
              color: "white",
              border: "none",
              padding: "0.7rem 1.2rem",
              borderRadius: "6px",
              cursor: "pointer",
              marginTop: "1rem",
              width: "100%",
              fontSize: "1rem",
            }}
          >
            {loading ? "Uploading..." : "Submit"}
          </button>
        </form>
      </section>

      <footer
        className="footer"
        style={{ textAlign: "center", marginTop: "2rem", color: "#777" }}
      >
        © 2025 Digital Land Exchange. All rights reserved.
      </footer>
    </div>
  );
}

export default RentForm;
