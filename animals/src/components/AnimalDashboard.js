import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import AnimalForm from "./AnimalForm.js";
import AnimalList from "./AnimalsList.js";

export default function AnimalDashboard() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("animals")
      .then(res => {
        setAnimals(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [animals]);

  return (
    <div className="dash">
      <AnimalForm animals={animals} updateAnimals={setAnimals} />
      <AnimalList animals={animals} />
    </div>
  );
}
