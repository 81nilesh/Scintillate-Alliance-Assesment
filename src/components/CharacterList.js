import React, { useState, useEffect } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

function CharacterList() {
    const [characters, setCharacters] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const history = useHistory();

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

    const handleCharacterClick = (characterId) => {
        history.push(`/character/${characterId}`);
    };

    return (
        <Box>
            <Text fontSize="xl" fontWeight="bold" mb={4}>Character List</Text>
            {characters.map(character => (
                <Box key={character.name} borderWidth="1px" borderRadius="lg" p={4} mb={4} onClick={() => handleCharacterClick(character.url)}>
                    <Text fontSize="lg" fontWeight="bold">{character.name}</Text>
                    <Text>Gender: {character.gender}</Text>
                    <Text>Height: {character.height}</Text>
                </Box>
            ))}
            <Button onClick={handlePrevPage} disabled={!prevPage} mr={2}>Previous</Button>
            <Button onClick={handleNextPage} disabled={!nextPage}>Next</Button>
        </Box>
    );
}

export default CharacterList;
