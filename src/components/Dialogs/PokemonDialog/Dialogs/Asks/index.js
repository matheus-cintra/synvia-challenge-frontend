import React from 'react';
import Icon from '@mdi/react';
import PropTypes from 'prop-types';
import { mdiClose } from '@mdi/js';
import { toast } from 'react-toastify';
import api from '../../../../../services/api';

import { Toolbar, Title, Container, AskText, BottomActions } from './styles';

function Asks({ setAskOpen, pokemonId, getPokemons, closeReturn }) {
  const handleClose = () => {
    closeReturn();
    setAskOpen(open => !open);
  };

  const handleDeletePokemon = async () => {
    try {
      // await api.delete(`/api/v1/delete-account/${accountId}`);
      await api.delete(`/api/v1/pokedex/${pokemonId}`);
      getPokemons();
      handleClose();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleJustClose = () => {
    setAskOpen(open => !open);
  };

  return (
    <>
      <Toolbar>
        <Title>Remover Pokemon?</Title>
        <Icon
          path={mdiClose}
          title="Close"
          size={1}
          color="#FFF"
          onClick={handleJustClose}
        />
      </Toolbar>
      <Container>
        <AskText>
          Você tem certeza que deseja remover este pokemon? Essa ação não tem
          volta.
        </AskText>
        <BottomActions>
          <button type="button" onClick={handleDeletePokemon}>
            Sim
          </button>
          <button type="button" onClick={handleJustClose}>
            Não
          </button>
        </BottomActions>
      </Container>
    </>
  );
}

export default Asks;

Asks.propTypes = {
  setAskOpen: PropTypes.func.isRequired,
  closeReturn: PropTypes.func,
  accountId: PropTypes.string,
  attachmentId: PropTypes.string,
};

Asks.defaultProps = {
  accountId: undefined,
  attachmentId: undefined,
  closeReturn: undefined,
};
