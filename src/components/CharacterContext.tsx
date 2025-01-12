import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Character {
  _id: string;
  name: string;
  imageUrl: string;
  films: string[];
  shortFilms: string[];
  tvShows: string[];
  videoGames: string[];
  sourceUrl: string;
}

interface CharacterContextType {
  characters: Character[];
  addCharacter: (newCharacter: Character) => void;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const useCharacterContext = (): CharacterContextType => {
  const context = useContext(CharacterContext);
  if (!context) throw new Error('useCharacterContext must be used within a CharacterProvider');
  return context;
};

export const CharacterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [characters, setCharacters] = useState<Character[]>([]);

  const addCharacter = (newCharacter: Character) => setCharacters(prev => [...prev, newCharacter]);

  return (
    <CharacterContext.Provider value={{ characters, addCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
};

