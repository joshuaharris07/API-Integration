async function fetchGenerationData(generationId) {
    const response = await fetch(`https://pokeapi.co/api/v2/generation/${generationId}`);
    const generationData = await response.json();
    return generationData;
}

async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    const pokemonData = await response.json();
    return pokemonData;
}

async function displayPokemonByGeneration(generationId) {
    const pokemonDisplay = document.getElementById('pokemonDisplay');
    pokemonDisplay.innerHTML = '<p>Loading...</p>';

    const generationData = await fetchGenerationData(generationId);

    
    pokemonDisplay.innerHTML = '';
    const pokemonList = generationData.pokemon_species;

    const pokemonDetails = pokemonList.map(pokemon => fetchPokemonDetails(pokemon.url.replace('pokemon-species', 'pokemon')));
    const allPokemonDetails = await Promise.all(pokemonDetails);

    const sortedPokemonDetails = allPokemonDetails.sort((a, b) => a.id - b.id); //Sorts the pokemon by their ID

    sortedPokemonDetails.forEach(pokemonDetails => {
        const pokemonCard = document.createElement('div');
        pokemonCard.className = 'col-md-3';
        pokemonCard.innerHTML = `
            <div class="card">
                <img src="${pokemonDetails.sprites.front_default}" class="card-img-top" alt="${pokemonDetails.name}">
                <div class="card-body text-center">
                    <h5 class="card-title text-capitalize">${pokemonDetails.name}</h5>
                    <p>ID: ${pokemonDetails.id}</p>
                </div>
            </div>
        `;
        pokemonDisplay.appendChild(pokemonCard);
    });
    } 

document.addEventListener('DOMContentLoaded', () => {
    const generationSelect = document.getElementById('generation');
    generationSelect.addEventListener('change', () => {
        const selectedGeneration = generationSelect.value;
        displayPokemonByGeneration(selectedGeneration);
    });
});