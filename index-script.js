async function fetchPokemonData(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemonData = await response.json();
    return pokemonData;
}

document.addEventListener("DOMContentLoaded", async () => {
    const pokemonNames = ['pikachu', 'charmander', 'squirtle', 'bulbasaur']; //add any pokemon names
    const pokemonInfoElement = document.getElementById('pokemon-carousel');

    for (let i = 0; i < pokemonNames.length; i++) {
        const pokemonData = await fetchPokemonData(pokemonNames[i]);
        const pokemonDiv = document.createElement('div');
        pokemonDiv.className = `carousel-item text-center ${i === 0 ? 'active' : ''}`

        pokemonDiv.innerHTML = `
        <h2 class="text-capitalize">${pokemonData.name}</h2>
        <div class="d-flex justify-content-center">
            <img src="${pokemonData.sprites.front_default}" class="d-block w-10 img-fluid" alt="${pokemonData.name}">
        </div>    
        <p class="text-capitalize">Type: ${pokemonData.types.map(t => t.type.name).join(', ')}</p>
        <h4>Abilities:</h4>
        <ul class="list-unstyled text-capitalize">
            ${pokemonData.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
        </ul>
        `;

    pokemonInfoElement.appendChild(pokemonDiv)
    };
});