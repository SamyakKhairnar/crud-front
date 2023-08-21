import React, { useState } from "react";

function AddPerson({ addPerson }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: 0,
    email: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = "FirstName Required";
    if (!formData.lastName) newErrors.lastName = "LastName Required";
    if (!formData.email) newErrors.email = "Email Required";
    return newErrors;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addPerson(formData);

    // Clear the form after submission
    setFormData({
      firstName: "",
      lastName: "",
      age: 0,
      email: "",
    });
  };

  return (
    <div className="container">
      <h2>Add Person</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter First Name"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          {errors.firstName && (
            <span className="error" style={{color:"red"}}>{errors.firstName}</span>
          )}
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          {errors.lastName && <span className="error" style={{color:"red"}}>{errors.lastName}</span>}
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            placeholder="Enter Age"
            value={formData.age}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <span className="error" style={{color:"red"}}>{errors.email}</span>}
        </div>
        <button type="submit">Add Person</button>
      </form>
    </div>
  );
}

export default AddPerson;
