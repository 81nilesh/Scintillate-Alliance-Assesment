import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';

function CharacterDetails({ characterId }) {
    const [character, setCharacter] = useState(null);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchCharacterDetails = async () => {
            try {
                const characterResponse = await fetch(`https://swapi.dev/api/people/${characterId}/`);
                const characterData = await characterResponse.json();
                setCharacter(characterData);

                const movieRequests = characterData.films.map(filmUrl => fetch(filmUrl));
                const movieResponses = await Promise.all(movieRequests);
                const movieData = await Promise.all(movieResponses.map(response => response.json()));
                setMovies(movieData);
            } catch (error) {
                console.error('Error fetching character details:', error);
            }
        };

        fetchCharacterDetails();
    }, [characterId]);

    if (!character) {
        return <div>Loading...</div>;
    }

    return (
        <Box>
            <Text fontSize="xl" fontWeight="bold" mb={4}>Character Details</Text>
            <Text fontSize="lg" fontWeight="bold">Name: {character.name}</Text>
            <Text>Height: {character.height}</Text>
            <Text>Gender: {character.gender}</Text>
            <Text fontSize="xl" fontWeight="bold" mt={4} mb={2}>Movies:</Text>
            <Box>
                {movies.map(movie => (
                    <Text key={movie.title}>{movie.title}</Text>
                ))}
            </Box>
        </Box>
    );
}

export default CharacterDetails;
