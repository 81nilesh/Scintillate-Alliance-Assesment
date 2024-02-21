// CharactersAndFavorites.js
import React, { useState, useEffect } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import './CharacterList.css'; // Import the external CSS file

function CharactersAndFavorites() {
    const [characters, setCharacters] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
    const [showFavorites, setShowFavorites] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCharacters('https://swapi.dev/api/people/');
    }, []);

    const fetchCharacters = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setCharacters(data.results);
            setNextPage(data.next);
            setPrevPage(data.previous);
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    };

    const handleNextPage = () => {
        if (nextPage) {
            fetchCharacters(nextPage);
        }
    };

    const handlePrevPage = () => {
        if (prevPage) {
            fetchCharacters(prevPage);
        }
    };

    const handleCharacterClick = (characterUrl) => {
        const characterId = characterUrl.split('/').slice(-2, -1)[0];
        navigate(`/character/${characterId}`);
    };

    const toggleFavorite = (character) => {
        const index = favorites.findIndex(fav => fav.url === character.url);
        if (index !== -1) {
            const updatedFavorites = [...favorites.slice(0, index), ...favorites.slice(index + 1)];
            setFavorites(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        } else {
            const updatedFavorites = [...favorites, character];
            setFavorites(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        }
    };

    const isFavorite = (character) => {
        return favorites.some(fav => fav.url === character.url);
    };

    const handleShowFavorites = () => {
        setShowFavorites(true);
    };

    const handleShowCharacters = () => {
        setShowFavorites(false);
    };

    return (
        <Box className="character-list-container">
            <div className="buttons-container">
                <Button className="show-all-button" onClick={handleShowCharacters}>Show Characters</Button>
                <Button className="favorites-button" onClick={handleShowFavorites}>Show Favorites</Button>
            </div>
            {showFavorites ? (
                <>
                    <Text className="title character-details-title" fontSize="xl" fontWeight="bold" mb={4}>Favorite Characters</Text>

                    {favorites.map(favorite => (
                        <Box key={favorite.url} className="character-card" borderWidth="1px" borderRadius="lg" p={4} mb={4} onClick={() => handleCharacterClick(favorite.url)}>
                            <Text className="name" fontSize="lg" fontWeight="bold">{favorite.name}</Text>
                            <Text className="info">Gender: {favorite.gender}</Text>
                            <Text className="info">Height: {favorite.height}</Text>
                        </Box>
                    ))}
                </>
            ) : (
                <>
                    <Text className="title character-details-title" fontSize="xl" fontWeight="bold" mb={4}>Character List</Text>
                    {characters.map(character => (
                        <Box key={character.name} className="character-card" borderWidth="1px" borderRadius="lg" p={4} mb={4} onClick={() => handleCharacterClick(character.url)}>
                            <Text className="name" fontSize="lg" fontWeight="bold">{character.name}</Text>
                            <Text className="info">Gender: {character.gender}</Text>
                            <Text className="info">Height: {character.height}</Text>
                            <Button className={`favorite-button ${isFavorite(character) ? 'added' : ''}`} onClick={(e) => { e.stopPropagation(); toggleFavorite(character); }}>
                                {isFavorite(character) ? 'Remove from Favorites' : 'Add to Favorites'}
                            </Button>
                        </Box>
                    ))}
                    <div className="pagination">
                        <Button className="pagination-button" onClick={handlePrevPage} disabled={!prevPage} mr={2}>Previous</Button>
                        <Button className="pagination-button" onClick={handleNextPage} disabled={!nextPage}>Next</Button>
                    </div>
                </>
            )}
        </Box>
    );
}

export default CharactersAndFavorites;
