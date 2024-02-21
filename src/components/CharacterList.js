// CharacterList.js
import React, { useState, useEffect } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function CharacterList() {
    const [characters, setCharacters] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
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

    const handleShowFavorites = () => {
        navigate('/favorites');
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

    return (
        <Box>
            <Text fontSize="xl" fontWeight="bold" mb={4}>Character List</Text>
            <Button onClick={handleShowFavorites} mb={4}>Show Favorites</Button>
            {characters.map(character => (
                <Box key={character.name} borderWidth="1px" borderRadius="lg" p={4} mb={4} onClick={() => handleCharacterClick(character.url)}>
                    <Text fontSize="lg" fontWeight="bold">{character.name}</Text>
                    <Text>Gender: {character.gender}</Text>
                    <Text>Height: {character.height}</Text>
                    <Button onClick={(e) => { e.stopPropagation(); toggleFavorite(character); }}>
                        {isFavorite(character) ? 'Remove from Favorites' : 'Add to Favorites'}
                    </Button>
                </Box>
            ))}
            <Button onClick={handlePrevPage} disabled={!prevPage} mr={2}>Previous</Button>
            <Button onClick={handleNextPage} disabled={!nextPage}>Next</Button>
        </Box>
    );
}

export default CharacterList;
