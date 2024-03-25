
import React, { createContext, useState } from 'react';

export const AnimalContext = createContext({
    animals: [], 
  });

export const AnimalProvider = ({ children }) => {
    const [animals, setAnimals] = useState([]);

    const updateAnimals = (animalData) => {
        setAnimals(animalData);
    };

    return (
        <AnimalContext.Provider value={{ animals, updateAnimals }}>
            {children}
        </AnimalContext.Provider>
    );
};
