import axios from 'axios';

export const usePokeAPI = () => {
  const baseURL = 'https://pokeapi.co/api/v2';

  const getFirstGeneration = async () => {
    try {
      const response = await axios.get(`${baseURL}/pokemon?limit=151`);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
      return [];
    }
  };

  const getPokemonByName = async (name: string) => {
    try {
      const response = await axios.get(`${baseURL}/pokemon/${name}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching Pokemon ${name}:`, error);
      return null;
    }
  };

  const getPokemonSpeciesByName = async (name: string) => {
    try {
      const response = await axios.get(`${baseURL}/pokemon-species/${name}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching Pokemon ${name}:`, error);
      return null;
    }
  };

  return {
    getFirstGeneration,
    getPokemonByName,
    getPokemonSpeciesByName
  };
};