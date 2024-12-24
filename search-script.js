async function fetchPokemonData(query) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
    const pokemonData = await response.json();
    return pokemonData;
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("pokemonSearchForm");
    const searchInput = document.getElementById("searchPokemon");
    const searchResult = document.getElementById("searchResult");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const query = searchInput.value.trim();

        if (!query) {
            searchResult.innerHTML = "<p>Please enter a Pokémon name or number.</p>";
            return;
        }

        const pokemonData = await fetchPokemonData(query);

        if (pokemonData) {
            searchResult.innerHTML = `
                <div class="card">
                    <img src="${pokemonData.sprites.front_default}" class="card-img-top" alt="${pokemonData.name}">
                    <div class="card-body">
                        <h3 class="card-title text-capitalize">${pokemonData.name}</h3>
                        <p class="card-text"><strong>ID:</strong> ${pokemonData.id}</p>
                        <p class="card-text text-capitalize"><strong>Type:</strong> ${pokemonData.types.map(t => t.type.name).join(', ')}</p>
                        <h5>Abilities:</h5>
                        <ul class="list-unstyled card-text text-capitalize">
                            ${pokemonData.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
                        </ul>
                        <h5>Stats:</h5>
                        <ul class="list-unstyled card-text text-capitalize">
                            ${pokemonData.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        } else {
            searchResult.innerHTML = "<p>Pokemon not found. Please try again.</p>";
        }
    });
});