import React, { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;  // ✅ Vite-compatible

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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // prepare form data
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );
      if (image) data.append("image", image);

      // For now, just simulate success (no rent backend yet)
      // You can later change to:
      // await axios.post(`${API}/api/rents`, data, { headers: { "Content-Type": "multipart/form-data" } });
      alert("Rent listing uploaded successfully!");
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
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <div>

      <section className="form-section">
        <h1>Upload Rent Listing</h1>
        <form onSubmit={handleSubmit} className="land-form" encType="multipart/form-data">
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

          <button type="submit">Submit</button>
        </form>
      </section>

      <footer className="footer">
        © 2025 Digital Land Exchange. All rights reserved.
      </footer>
    </div>
  );
}

export default RentForm;
