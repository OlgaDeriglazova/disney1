import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCharacterContext } from '../CharacterContext';
import styles from './CardDetail.module.css';

interface CharacterDetail {
  _id: string;
  name: string;
  imageUrl: string;
  films: string[];
  shortFilms: string[];
  tvShows: string[];
  videoGames: string[];
  sourceUrl: string;
}

const CardDetail = () => {
  const { _id } = useParams();
  const [character, setCharacter] = useState<CharacterDetail | null>(null);
  const navigate = useNavigate();
  const { characters } = useCharacterContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const existingCharacter = characters.find((char) => char._id === _id);

    if (existingCharacter) {
      setCharacter(existingCharacter); 
      setLoading(false);
    } else if (_id) {
      fetch(`https://api.disneyapi.dev/character/${_id}`)
        .then((response) => response.json())
        .then((data) => {
          setCharacter(data.data); 
          setLoading(false); 
        })
        .catch((error) => {
          console.error('Error fetching character data:', error);
          setLoading(false);
        });
    } else {
      setLoading(false); 
    }
  }, [_id, characters]); 

  const handleBackClick = () => {
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div className={styles["detail-container"]}>
      <button className={styles["button-back"]} onClick={handleBackClick}>
        Back to the list
      </button>

      <div className={styles["container"]}>
        <h1 className={styles["character-name"]}>{character.name}</h1>
        <img src={character.imageUrl} alt={character.name} className={styles["character-image"]} />
        <div className={styles["text-container"]}>
          <p><strong>Films: </strong>{character.films.join(', ')}</p>
          <p><strong>ShortFilms: </strong>{character.shortFilms.join(', ')}</p>
          <p><strong>TvShows: </strong>{character.tvShows.join(', ')}</p>
          <p><strong>VideoGames: </strong>{character.videoGames.join(', ')}</p>
          <p><strong>Source: </strong><a href={character.sourceUrl} target="_blank" rel="noopener noreferrer">more detailed</a></p>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
