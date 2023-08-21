import React, { useState, useEffect } from "react";

function EditPerson({ editing, selectedPerson, updatePerson, setEditing, setSelectedPerson }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: 0,
    email: "",
  });

  useEffect(() => {
    if (editing) {
      setFormData(selectedPerson);
    }
  }, [editing, selectedPerson]);

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

    updatePerson(selectedPerson.id, formData);
    setSelectedPerson(null); // Clear the selected person
    setEditing(false);
  };

  if (!editing) {
    return null;
  }

  return (
    <div className="container">
      <h2>Edit Person</h2>
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
            <span className="error" style={{ color: "red" }}>
              {errors.firstName}
            </span>
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
          {errors.lastName && (
            <span className="error" style={{ color: "red" }}>
              {errors.lastName}
            </span>
          )}
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
          {errors.email && (
            <span className="error" style={{ color: "red" }}>
              {errors.email}
            </span>
          )}
        </div>
        <button type="submit">Save Changes</button>
        <button
          type="button"
          onClick={() => {
            setSelectedPerson(null);
            setEditing(false);
          }}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditPerson;
