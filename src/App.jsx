import React, { useState, useEffect } from "react";
import "./App.css";
import PeopleList from "./PeopleList";
import PersonForm from "./AddPerson";
import EditPerson from "./EditPerson";
import DeletePerson from "./DeletePerson";

function App() {
  const [people, setPeople] = useState([]);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  // Fetch the list of people on initial load
  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = () => {
    fetch("https://localhost:7151/api/Persons")
      .then((response) => response.json())
      .then((data) => setPeople(data))
      .catch((error) => console.error("Error fetching people:", error));
  };

  const addPerson = (personData) => {
    fetch("https://localhost:7151/api/Persons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(personData),
    })
      .then((response) => response.json())
      .then((data) => {
        setPeople([...people, data]); // Update the list with the newly added person
      })
      .catch((error) => console.error("Error adding person:", error));
  };

  const updatePerson = (personId, updatedData) => {
    fetch(`https://localhost:7151/api/Persons/${personId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedPeople = people.map((person) =>
          person.id === personId ? data : person
        );
        setPeople(updatedPeople); // Update the list with the updated person
        setEditing(false);
      })
      .catch((error) => console.error("Error updating person:", error));
  };

  const deletePerson = (personId) => {
    fetch(`https://localhost:7151/api/Persons/${personId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedPeople = people.filter((person) => person.id !== personId);
        setPeople(updatedPeople); // Update the list by removing the deleted person
        setDeleting(false);
      })
      .catch((error) => console.error("Error deleting person:", error));
  };

  return (
    <div>
      <h1>CRUD App</h1>
      <PersonForm addPerson={addPerson} />
      <PeopleList
        people={people}
        setEditing={setEditing}
        setSelectedPerson={setSelectedPerson}
        setDeleting={setDeleting}
        setDeletedPerson={setSelectedPerson}
      />
      <EditPerson
        editing={editing}
        selectedPerson={selectedPerson}
        updatePerson={updatePerson}
        setEditing={setEditing}
        setSelectedPerson={setSelectedPerson}
      />
      <DeletePerson
        deleting={deleting}
        selectedPerson={selectedPerson}
        deletePerson={deletePerson}
        setDeleting={setDeleting}
      />
    </div>
  );
}

export default App;
