// CharacterDetails.js
import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

function CharacterDetails() {
    const { id } = useParams(); // Use useParams to get the characterId from the URL
    const [character, setCharacter] = useState(null);
    const [homeworld, setHomeworld] = useState(null);
    const [films, setFilms] = useState([]);
    const [species, setSpecies] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [starships, setStarships] = useState([]);

    useEffect(() => {
        const fetchCharacterDetails = async () => {
            try {
                const response = await fetch(`https://swapi.dev/api/people/${id}/`);
                const data = await response.json();
                setCharacter(data);

                // Fetch additional data
                await Promise.all([
                    fetchAdditionalData(data.homeworld, setHomeworld),
                    fetchAllAdditionalData(data.films, setFilms),
                    fetchAllAdditionalData(data.species, setSpecies),
                    fetchAllAdditionalData(data.vehicles, setVehicles),
                    fetchAllAdditionalData(data.starships, setStarships)
                ]);
            } catch (error) {
                console.error('Error fetching character details:', error);
            }
        };

        fetchCharacterDetails();
    }, [id]); // Add id to the dependency array to re-fetch data when id changes

    // Function to fetch additional data for a single endpoint
    const fetchAdditionalData = async (url, setData) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching additional data:', error);
        }
    };

    // Function to fetch additional data for multiple endpoints
    const fetchAllAdditionalData = async (urls, setData) => {
        try {
            const responses = await Promise.all(urls.map(url => fetch(url)));
            const data = await Promise.all(responses.map(response => response.json()));
            setData(data);
        } catch (error) {
            console.error('Error fetching additional data:', error);
        }
    };

    if (!character) {
        return <div>Loading...</div>;
    }

    return (
        <Box>
            <Text fontSize="xl" fontWeight="bold" mb={4}>Character Details</Text>
            <Text>Name: {character.name}</Text>
            <Text>Height: {character.height}</Text>
            <Text>Mass: {character.mass}</Text>
            <Text>Hair Color: {character.hair_color}</Text>
            <Text>Skin Color: {character.skin_color}</Text>
            <Text>Eye Color: {character.eye_color}</Text>
            <Text>Birth Year: {character.birth_year}</Text>
            <Text>Gender: {character.gender}</Text>
            <Text>Homeworld: {homeworld?.name}</Text>
            <Text>Films: {films.map(film => film.title).join(', ')}</Text>
            <Text>Species: {species.map(specie => specie.name).join(', ')}</Text>
            <Text>Vehicles: {vehicles.map(vehicle => vehicle.name).join(', ')}</Text>
            <Text>Starships: {starships.map(starship => starship.name).join(', ')}</Text>
        </Box>
    );
}

export default CharacterDetails;
