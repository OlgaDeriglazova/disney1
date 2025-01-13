import { useState, useEffect } from 'react';
import Card from '../Card/Card';
import styles from './CardList.module.css'
import { Link } from 'react-router-dom';
import { useCharacterContext } from '../CharacterContext';

interface Character {
  name: string;
  imageUrl: string;
  _id: string;
}

const CardList = () => {
  const [apiCards, setApiCards] = useState<Character[]>([]);
  const [favoriteCards, setFavoriteCards] = useState<Character[]>([]);
  const [showFavorites, setShowFavorites] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [sortAscending, setSortAscending] = useState(true); 
  const [isSorted, setIsSorted] = useState(false);
  const cardsPerPage = 6; 
  const { characters } = useCharacterContext();
  const [searchQuery, setSearchQuery] = useState('');

  //получение данных с API
  useEffect(() => {
    fetch('https://api.disneyapi.dev/character')
      .then((response) => response.json())
      .then((data) => setApiCards(data.data))
      .catch(() => console.error('Failed to fetch data'));
  }, []);

  const allCards = [...apiCards, ...characters];

  const toggleFavorite = (card: Character) => {
    setFavoriteCards((prev) =>
      prev.some((fav) => fav._id === card._id)
        ? prev.filter((fav) => fav._id !== card._id)
        : [...prev, card]
    );
  };

  // Отображение избранных
  const cardsToDisplay = showFavorites
    ? allCards.filter((card) => favoriteCards.some((fav) => fav._id === card._id)) 
    : allCards; 
  
    // Фильтрация карточек по поиску
  const filteredCards = cardsToDisplay.filter((card) =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

    // Сортировка по алфавиту
    const sortedCards = isSorted
    ? filteredCards.sort((a, b) => {
        const comparison = a.name.localeCompare(b.name);
        return sortAscending ? comparison : -comparison;
      })
    : filteredCards;

   // пагинация
   const indexOfLastCard = currentPage * cardsPerPage;
   const indexOfFirstCard = indexOfLastCard - cardsPerPage;
   const currentCards = sortedCards.slice(indexOfFirstCard, indexOfLastCard);
 
   const totalPages = Math.ceil(cardsToDisplay.length / cardsPerPage);
      //переключение на следующую страницу
   const handleNextPage = () => {
     if (currentPage < totalPages) {
       setCurrentPage((prev) => prev + 1);
     }
   };
   //переключение на предыдущую страницу
   const handlePrevPage = () => {
     if (currentPage > 1) {
       setCurrentPage((prev) => prev - 1);
     }
   };
// сортировка по алфавиту
   const toggleSort = () => {
    setIsSorted(true); 
    setSortAscending(!sortAscending); 
    setShowFavorites(false); 
    setCurrentPage(1);
  };
// кнопка "All the characters"
  const showAllCards = () => {
    setIsSorted(false); 
    setShowFavorites(false);
    setCurrentPage(1); 
  };

  return (
    <div>
        <h1 className={ styles["cards-title"] }>Disney characters</h1>
        <div className={styles["search-container"]}>
          <input
            type="text"
            placeholder="Search characters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles["search-input"]}
          />
        </div>
        <div className={ styles["buttons-container"] }>
          <button 
            className={ styles["button"] }
            onClick={showAllCards}>All the characters</button>

          <button 
            className={ styles["button"] }
            onClick={() => setShowFavorites(true)}>Favorites</button>

          <button 
            className={ styles["button"] }
            onClick={toggleSort}
            >Alphabetically</button>
        </div>
          <div className={styles["add-button-container"]}>
            <Link to="/create-character">
              <button className={`${styles["button"]} ${styles["button-add"]}`}>Add a new character</button>
            </Link>
        </div>
      

    <div className={ styles["card-list"] }>
        {cardsToDisplay.length === 0 ? (
          <p>There are no cards</p>
        ) : (
        currentCards.map((card) => (
            <div className={ styles["card-container"] }>
            <Card 
              name={card.name}
              imageUrl={card.imageUrl}
              key={card._id}
              _id={card._id}
              toggleFavorite={toggleFavorite} 
              isFavorite={favoriteCards.some((fav) => fav._id === card._id)}
            />
            </div>
        ))
      )}
    </div>
    <div className={ styles["pagination"] }>
        <button
          onClick={handlePrevPage} 
          disabled={currentPage === 1}
          className={`${styles["button"]} ${styles["button-pagination"]}`}>
          Back
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages}
          className={`${styles["button"]} ${styles["button-pagination"]}`}
        >
          Next
        </button>
      </div>

</div>
  );
};

export default CardList;
