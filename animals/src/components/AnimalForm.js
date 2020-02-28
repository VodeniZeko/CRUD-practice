import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
const initialAnimal = {
  name: "",
  sound: "",
  classification: { species: "" }
};

export default function AnimalForm({ animals, updateAnimals }) {
  const [updating, setUpdating] = useState(false);
  const [animalToUpdate, setAnimalToUpdate] = useState(initialAnimal);

  const editAnimal = animal => {
    setUpdating(true);
    setAnimalToUpdate(animal);
  };

  const saveUpdate = e => {
    e.preventDefault();
    // How can we update the animal information?
    // Where can we get the ID?
    // Where is the information stored?
    axiosWithAuth()
      .put(`animals/${animalToUpdate.id}`, animalToUpdate)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteAnimal = animal => {
    axiosWithAuth()
      .delete(`animals/${animalToUpdate.id}`, animal)
      .then(res => {
        console.log(res);
        updateAnimals(animals.filter(an => an.id !== animalToUpdate.id));
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="animals-list">
      <ul className="organized">
        <span>click on animal to EDIT</span>
        {animals.map(animal => (
          <li
            key={animal.name}
            onClick={() => editAnimal(animal)}
            className="edit-animals"
          >
            <span>{animal.name}</span>
          </li>
        ))}
      </ul>
      {updating && (
        <form onSubmit={saveUpdate}>
          <legend>Update Animal</legend>
          <label>
            Name:
            <input
              onChange={e =>
                setAnimalToUpdate({ ...animalToUpdate, name: e.target.value })
              }
              value={animalToUpdate.name}
            />
          </label>
          <label>
            Sound:
            <input
              onChange={e =>
                setAnimalToUpdate({ ...animalToUpdate, sound: e.target.value })
              }
              value={animalToUpdate.sound}
            />
          </label>
          <label>
            Classification:
            <input
              onChange={e =>
                setAnimalToUpdate({
                  ...animalToUpdate,
                  classification: { species: e.target.value }
                })
              }
              value={animalToUpdate.classification.species}
            />
          </label>
          <div>
            <button type="submit">Update</button>
            <button onClick={() => setUpdating(false)}>Cancel</button>
            {
              <button
                onClick={e => {
                  e.stopPropagation();
                  deleteAnimal(animalToUpdate);
                }}
              >
                X
              </button>
            }
          </div>
        </form>
      )}
    </div>
  );
}
