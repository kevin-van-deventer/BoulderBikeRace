import React, { useState } from "react";

const AddSlogan = ({ addSlogan }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    slogan: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Email validation function
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.slogan) {
      setError("All fields are required!");
      return;
    }

    if (formData.slogan.length > 50) {
      setError("Slogan should not exceed 50 characters!");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address!");
      return;
    }

    setError("");
    try {
      await addSlogan(formData);
      setFormData({ first_name: "", last_name: "", email: "", slogan: "" }); // Reset the form
    } catch (err) {
      setError("Failed to submit the slogan. Please try again.");
    }
  };

  return (
    <div className="addSlogan">
      <h2>Submit Your Slogan</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="sloganForm">
        <div className="formGroup">
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="slogan">Slogan:</label>
          <textarea
            id="slogan"
            name="slogan"
            value={formData.slogan}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="submitBtn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddSlogan;
