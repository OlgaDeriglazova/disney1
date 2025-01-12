import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './CreateCharacter.module.css';
import { useCharacterContext } from '../CharacterContext';
import { useNavigate } from 'react-router-dom';

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

const CreateCharacter = () => {
  const { addCharacter } = useCharacterContext();
  const navigate = useNavigate();

  const [character, setCharacter] = useState<Character>({
    _id: '',
    name: '',
    imageUrl: '',
    films: [],
    shortFilms: [],
    tvShows: [],
    videoGames: [],
    sourceUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (['films', 'shortFilms', 'tvShows', 'videoGames'].includes(name)) {
      setCharacter((prev) => ({
        ...prev,
        [name]: value.split(',').map((item) => item.trim()).filter(Boolean),
      }));
    } else {
      setCharacter((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCharacter = { ...character, _id: uuidv4() };
    addCharacter(newCharacter); 
    alert('Character added successfully!');
    navigate('/');
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className={styles['character-container']}>
      <h1 className={styles['cards-title']}>Add a new character</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles['cards-field']}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={character.name}
            onChange={handleChange}
            required
            placeholder="required field"
          />
        </div>
        <div className={styles['cards-field']}>
          <label htmlFor="url">Image URL:</label>
          <input
            id="url"
            type="url"
            name="imageUrl"
            value={character.imageUrl}
            onChange={handleChange}
            required
            placeholder="required field"
          />
        </div>
        <div className={styles['cards-field']}>
          <label htmlFor="films">Films:</label>
          <textarea
            id="films"
            name="films"
            value={character.films.join(', ')}
            onChange={handleChange}
          />
        </div>
        <div className={styles['cards-field']}>
          <label htmlFor="shortFilms">ShortFilms:</label>
          <textarea
            id="shortFilms"
            name="shortFilms"
            value={character.shortFilms.join(', ')}
            onChange={handleChange}
          />
        </div>
        <div className={styles['cards-field']}>
          <label htmlFor="tvShows">TVShows:</label>
          <textarea
            id="tvShows"
            name="tvShows"
            value={character.tvShows.join(', ')}
            onChange={handleChange}
          />
        </div>
        <div className={styles['cards-field']}>
          <label htmlFor="videoGames">VideoGames:</label>
          <textarea
            id="videoGames"
            name="videoGames"
            value={character.videoGames.join(', ')}
            onChange={handleChange}
          />
        </div>
        <div className={styles['cards-field']}>
          <label htmlFor="sourceUrl">Source:</label>
          <textarea
            id="sourceUrl"
            name="sourceUrl"
            value={character.sourceUrl}
            onChange={handleChange}
          />
        </div>
        <div className={styles['buttons-container']}>
          <button type="submit">Add a new character</button>
          <button type="button" onClick={handleBackClick}>
            Back to the list
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCharacter;
