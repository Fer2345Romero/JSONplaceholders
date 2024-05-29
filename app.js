const axios = require('axios');

const api = 'https://pokeapi.co/api/v2';
async function getPokemons() {
  try {
    const response = await axios.get(`${api}/pokemon?limit=10`);
    console.log('GET: Lista de Pokémon');
    console.log(response.data.results);
  } catch (error) {
    console.error('Error al obtener la lista de Pokémon:', error);
  }
}
async function run() {
  await getPokemons();
}
run();
