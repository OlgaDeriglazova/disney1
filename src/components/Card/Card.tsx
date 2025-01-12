import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css'

interface CardProps {
  name: string;
  imageUrl: string;
  _id: string;
  toggleFavorite: (card: { _id: string; name: string; imageUrl: string }) => void; // Функция для добавления в избранное
  isFavorite: boolean; 
}

function Card ({ name, imageUrl, _id, toggleFavorite, isFavorite }: CardProps) {
    const defaultImage = "https://i.ytimg.com/vi/8P1ejnGvTgU/maxresdefault.jpg";
    const [deleted, setDeleted] = useState(false);
    const [imageSrc, setImageSrc] = useState(imageUrl || defaultImage);

    const handleImageError = () => {
        setImageSrc(defaultImage); 
      };

      const handleFavoriteClick = () => {
        toggleFavorite({ _id, name, imageUrl }); 
      };

      const handleDeleteClick = () => {
        setDeleted(true);
      };

    if (deleted) {
        return null;  
    }

    return (
    <div className={ styles.card }>
      <Link to={`/character/${_id}`} className={styles.link}>
        <img src={imageUrl || defaultImage} alt={name} className={ styles["char_photo"] } />
        <h2 className={ styles["char_name"] }>{name}</h2>
      </Link>
      <div className={ styles["button-container"] }>
        <button 
          className={ `${ styles['button-favorite'] } ${isFavorite ? styles['favorite'] : ''}`}
          onClick={handleFavoriteClick}
        >
          <i className="fa-solid fa-heart"></i>
        </button>

        <button
          className={ styles["button-delete"] }
          onClick={handleDeleteClick}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default Card;