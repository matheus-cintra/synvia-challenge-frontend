import api from '../../services/api';

async function getPokemons() {
  const result = await api.get('/api/v1/pokedex');

  let docs = result.data.success ? result.data.data.Pokedex : [];

  docs = docs.map(pokemon => {
    const pokemonGen = pokemon.Generation.split(' ');
    return {
      ...pokemon,
      qtyAttacks:
        pokemon['Fast Attack(s)'].length + pokemon['Special Attack(s)'].length,
      Generation: pokemonGen.length > 1 ? pokemonGen[1] : pokemonGen[0],
    };
  });

  return docs;
}

export default {
  getPokemons,
};
