import React, { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiPlusCircle } from '@mdi/js';
import methods from './methods';
import background from '../../assets/background.png';
import PokemonDialog from '../../components/Dialogs/PokemonDialog';
import Modal from '../../components/Modals';

import {
  Container,
  PokemonCard,
  ImagePokemon,
  CardInformation,
  FloatingLabel,
  ActionBar,
  FloatLabelInput,
  NewButton,
  SearchContainer,
} from './styles';

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [auxPokemons, setAuxPokemons] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentPokemon, setCurrentPokemon] = useState({});
  const [inputActive, setInputActive] = useState({
    pokemonSearch: false,
  });

  async function getPokemons() {
    const pokemonsResult = await methods.getPokemons();
    setPokemons(pokemonsResult);
    setAuxPokemons(pokemonsResult);
  }

  useEffect(() => {
    getPokemons();
  }, []);

  const handleOpen = pokemon => {
    setCurrentPokemon(pokemon);
    setOpen(current => !current);
  };

  const handlePokemonEdit = () => {
    return (
      <PokemonDialog
        setOpen={setOpen}
        current={currentPokemon}
        getPokemons={getPokemons}
      />
    );
  };

  const handleSearch = e => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (e.target.value === '') {
        return setPokemons(auxPokemons);
      }
    }

    const result = pokemons.filter(x =>
      x.Name.toLowerCase().includes(e.target.value)
    );
    setPokemons(result);
  };

  return (
    <>
      <ActionBar>
        <SearchContainer>
          <FloatingLabel
            htmlFor="pokemonSearch"
            active={inputActive.pokemonSearch}
          >
            Pesquisar Pokémon
          </FloatingLabel>
          <FloatLabelInput
            id="pokemonSearch"
            type="text"
            onFocus={() =>
              setInputActive({ ...inputActive, pokemonSearch: true })
            }
            onBlur={e => {
              if (e.target.value === '') {
                setInputActive({
                  ...inputActive,
                  pokemonSearch: false,
                });
              }
            }}
            onKeyUp={e => handleSearch(e)}
            name="pokemonSearch"
          />
        </SearchContainer>
        <NewButton type="button" onClick={handleOpen}>
          <Icon
            path={mdiPlusCircle}
            title="Novo Pokemon"
            size="30px"
            color="#000"
          />
        </NewButton>
      </ActionBar>
      <Container>
        {pokemons && pokemons.length > 0
          ? pokemons.map(pokemon => (
              <PokemonCard
                onClick={() => handleOpen(pokemon)}
                key={pokemon._id}
              >
                <ImagePokemon src={background} />
                <CardInformation>
                  <span>Name: {pokemon.Name}</span>
                  <span>Gerenation: {pokemon.Generation}</span>
                  <span>Types: {pokemon.Types.map(x => `${x} `)}</span>
                  <span>Attacks: {pokemon.qtyAttacks}</span>
                </CardInformation>
              </PokemonCard>
            ))
          : null}
      </Container>

      <Modal open={open} setOpen={setOpen}>
        <div>{handlePokemonEdit()}</div>
      </Modal>
    </>
  );
}

export default Pokedex;
