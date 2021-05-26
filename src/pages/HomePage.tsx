import { usePokemon } from '../hooks/usePokemon';
import { Loading } from '../components/Loading';
import { Pokemon } from '../interfaces/fetchAllPokemonResponse';
import { useState } from 'react';

export const HomePage = () => {

    const { isLoading, pokemons} = usePokemon();
    const [ currentPage, setCurrentPage ] = useState(0);
    const [search, setSearch] = useState('');
    //const [disable, setDisable] = useState(false);

    const filteredPokemons = (): Pokemon[] => {
        if (search.length === 0) {
            return pokemons.slice(currentPage, currentPage + 5);
        }

        const filtered = pokemons.filter(poke => poke.name.includes(search));
        // if (filtered.length === 0) {
        //     setDisable(false);
        // }
        return filtered.slice(currentPage, currentPage + 5);
    }

    const nextPage = () => {
        const arrLenght = pokemons.filter(poke => poke.name.includes(search)).length;
        if (arrLenght > currentPage + 5) {
            setCurrentPage(currentPage + 5);
        }
    }

    const previousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 5);
        }
    }

    const onSearchChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPage(0);
        setSearch(target.value);
    }

    return (
        <div className="mt-5">
            <h1>Pokemons List</h1>
            <hr />

            <input type="text" 
                   className="mb-3 form-control"
                   placeholder="Search Pokemon"
                   value={search}
                   onChange={ onSearchChange }
            />

            <button className="btn btn-primary"
                    onClick={previousPage}
                    disabled={currentPage===0}>
                Previous
            </button>
            &nbsp;
            <button className="btn btn-primary"
                    onClick={nextPage}
                    >
                Next
            </button>

            <table className="table">
                <thead>
                    <tr>
                        <th style={{width: 100}}>ID</th>
                        <th style={{width: 150}}>Name</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredPokemons().map( ({ id, name, pic}) => (
                            <tr key={ id }>
                                <td>{ id }</td>
                                <td>{ name }</td>
                                <td>
                                    <img 
                                        src={ pic } 
                                        alt={ name }
                                        style={ { height: 75} }
                                    />
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>

            { isLoading && <Loading />}

        </div>
    )
}
