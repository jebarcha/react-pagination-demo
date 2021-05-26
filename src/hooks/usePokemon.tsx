import { useEffect, useState } from "react";
import { fetchAllPokemons } from '../helpers/fetchAllPokemons';
import { Pokemon } from '../interfaces/fetchAllPokemonResponse';

export const usePokemon = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    
    useEffect(() => {
        fetchAllPokemons()
            .then( pokemons => {
                setIsLoading(false);
                setPokemons(pokemons);
            });
    }, []);

    return {
        isLoading,
        pokemons
    }
}