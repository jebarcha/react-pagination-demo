import { pokemonApi } from '../api/pokemonApi';
import { FetchAllPokemonResponse, SmallPokemon, Pokemon } from '../interfaces/fetchAllPokemonResponse';

export const fetchAllPokemons = async(): Promise<Pokemon[]> => {
    
    const resp = await pokemonApi.get<FetchAllPokemonResponse>('/pokemon?limit=1500');
    const smallPokemonList = resp.data.results;
    
    return transformSmallPokemonIntoPokemon(smallPokemonList);

}

const transformSmallPokemonIntoPokemon = ( smallPokmonList: SmallPokemon[]): Pokemon[] => {

    const pokemonArr = smallPokmonList.map( poke => {

        const pokeArr = poke.url.split('/');
        const id = pokeArr[6];
        const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

        return {
            id,
            name: poke.name,
            pic
        }
    });
    
    return pokemonArr;

}