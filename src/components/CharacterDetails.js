import React, { useState, useEffect } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import './CharacterDetails.css'; // Import the CSS file

function CharacterDetails() {
    const { id } = useParams(); // Use useParams to get the characterId from the URL
    const [character, setCharacter] = useState(null);
    const [homeworld, setHomeworld] = useState(null);
    const [films, setFilms] = useState([]);
    const [species, setSpecies] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [starships, setStarships] = useState([]);
    const navigate = useNavigate();

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
        <>
            <Box className="character-details-container"> {/* Apply className */}
                <Text className="character-details-title">Character Details</Text> {/* Apply className */}
                <Text className="character-details-item">Name: {character.name}</Text> {/* Apply className */}
                <Text className="character-details-item">Height: {character.height}</Text> {/* Apply className */}
                <Text className="character-details-item">Mass: {character.mass}</Text> {/* Apply className */}
                <Text className="character-details-item">Hair Color: {character.hair_color}</Text> {/* Apply className */}
                <Text className="character-details-item">Skin Color: {character.skin_color}</Text> {/* Apply className */}
                <Text className="character-details-item">Eye Color: {character.eye_color}</Text> {/* Apply className */}
                <Text className="character-details-item">Birth Year: {character.birth_year}</Text> {/* Apply className */}
                <Text className="character-details-item">Gender: {character.gender}</Text> {/* Apply className */}
                <Text className="character-details-item">Homeworld: {homeworld?.name}</Text> {/* Apply className */}
                <Text className="character-details-item">Films: {films.map(film => film.title).join(', ')}</Text> {/* Apply className */}
                <Text className="character-details-item">Species: {species.map(specie => specie.name).join(', ')}</Text> {/* Apply className */}
                <Text className="character-details-item">Vehicles: {vehicles.map(vehicle => vehicle.name).join(', ')}</Text> {/* Apply className */}
                <Text className="character-details-item">Starships: {starships.map(starship => starship.name).join(', ')}</Text> {/* Apply className */}
                <Button onClick={() => navigate('/')} mt={4} className='btn'>Go Back</Button>
            </Box>
        </>
    );
}

export default CharacterDetails;
