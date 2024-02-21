// Favorites.js
import React, { useState, useEffect } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    const handleShowAllFavorites = () => {
        // Logic to show all favorites
        console.log(favorites);
    };

    return (
        <Box>
            <Text fontSize="xl" fontWeight="bold" mb={4}>Favorite Characters</Text>
            {favorites.map(favorite => (
                <Box key={favorite.url} borderWidth="1px" borderRadius="lg" p={4} mb={4}>
                    <Text fontSize="lg" fontWeight="bold">{favorite.name}</Text>
                    <Text>Gender: {favorite.gender}</Text>
                    <Text>Height: {favorite.height}</Text>
                </Box>
            ))}
            <Button onClick={handleShowAllFavorites} mt={4}>Show All Favorites</Button>
        </Box>
    );
}

export default Favorites;
