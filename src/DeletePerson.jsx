import React from "react";

function DeletePerson({ deleting, selectedPerson, deletePerson }) {
  const handleDelete = () => {
    deletePerson(selectedPerson.id);
  };

  if (!deleting) {
    return null;
  }

  return (
    <div className="container">
      <h2>Delete Person</h2>
      <p>Are you sure you want to delete {selectedPerson.firstName}?</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeletePerson;
