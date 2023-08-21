import React from "react";

function PeopleList({
  people,
  setEditing,
  setSelectedPerson,
  setDeleting,
  setDeletedPerson,
}) {
  return (
    <div className="container">
      <h2>People List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.firstName}</td>
              <td>{person.lastName}</td>
              <td>{person.age}</td>
              <td>{person.email}</td>
              <td>
                <button
                  onClick={() => {
                    setEditing(true);
                    setSelectedPerson(person);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setDeleting(true);
                    setDeletedPerson(person);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PeopleList;
