import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiClose, mdiTrashCan } from '@mdi/js';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import FloatLabelInput from '../../FloatLabel/Input';
import { buildDataSet, handleDispatchEvents } from './methods';

import Modal from '../../Modals';
import Asks from './Dialogs/Asks';

import {
  Container,
  Toolbar,
  Title,
  Form,
  BottomActions,
  RowContainer,
  FloatingLabelInputContainer,
  FloatingLabel,
} from './styles';

const schema = Yup.object().shape({
  pokemonNumber: Yup.string().required('Campo Obrigatório'),
  pokemonName: Yup.string().required('Campo Obrigatório'),
  pokemonGeneration: Yup.string().required('Campo Obrigatório'),
  pokemonDescription: Yup.string().required('Campo Obrigatório'),
  pokemonTypes: Yup.string().required('Campo Obrigatório'),
  pokemonResistance: Yup.string(),
  pokemonWeaknesses: Yup.string(),
  pokemonFastAttacks: Yup.string(),
  pokemonSpecialAttacks: Yup.string(),
  pokemonMinWeight: Yup.string(),
  pokemonMaxWeight: Yup.string(),
  pokemonMinHeight: Yup.string(),
  pokemonMaxHeight: Yup.string(),
  pokemonDistance: Yup.string(),
  pokemonBaseStamina: Yup.string(),
  pokemonBaseAttack: Yup.string(),
  pokemonBaseDefense: Yup.string(),
  pokemonFleeRate: Yup.string(),
  pokemonNextEvolution: Yup.string(),
  pokemonEvolutions: Yup.string(),
  pokemonPreviousEvolutions: Yup.string(),
  pokemonMaxCP: Yup.string(),
  pokemonMaxHP: Yup.string(),
});

function PokemonDialog({ setOpen, current, getPokemons }) {
  const pokemonId = current._id;
  const formRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [inputActive, setInputActive] = useState({});
  const [askOpen, setAskOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClose = () => {
    if (submitting) return;
    setOpen(open => !open);
  };

  const handleSubmit = async data => {
    try {
      setSubmitting(true);
      await schema.validate(data, {
        abortEarly: false,
      });

      const ds = buildDataSet(data);
      const result = pokemonId
        ? await api.put(`/api/v1/pokedex/${pokemonId}`, { ...ds })
        : await api.post('/api/v1/pokedex', { ...ds });

      if (!result.data.success) {
        return toast.error('Eror ao realizar solicitação.');
      }

      if (pokemonId) {
        toast.success('Pokemon Atualizado.');
      } else {
        toast.success('Pokemon Criado.');
      }
      getPokemons();
      handleClose();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {};

        error.inner.forEach(err => {
          errorMessages[err.path] = err.message;
        });

        formRef.current.setErrors(errorMessages);
        setSubmitting(false);
      } else {
        setSubmitting(false);
        return toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handleDispatchEvents(pokemonId);
    }, 50);
  }, []);

  const handleOpenAskDialog = () => setAskOpen(asking => !asking);

  const handleAskDialog = () => {
    return (
      <Asks
        setAskOpen={handleOpenAskDialog}
        pokemonId={pokemonId}
        getPokemons={getPokemons}
        closeReturn={handleClose}
      />
    );
  };

  return (
    <>
      <Toolbar>
        <Title>{pokemonId ? 'Editar Pokémon' : 'Novo Pokémon'}</Title>
        <Icon
          path={mdiClose}
          title="Close"
          size={1}
          color="#FFF"
          onClick={handleClose}
        />
      </Toolbar>
      {pokemonId ? (
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit} id="editForm">
            <RowContainer>
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonNumber"
                  active={inputActive.pokemonNumber}
                >
                  Numero do Pokémon
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonNumber"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonNumber: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonNumber: false,
                      });
                    }
                  }}
                  defaultValue={current.Number}
                  name="pokemonNumber"
                  disabled
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonName"
                  active={inputActive.pokemonName}
                >
                  Nome do Pokémon
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonName"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonName: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonName: false,
                      });
                    }
                  }}
                  defaultValue={current.Name}
                  name="pokemonName"
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonGeneration"
                  active={inputActive.pokemonGeneration}
                >
                  Geração do Pokémon
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonGeneration"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonGeneration: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonGeneration: false,
                      });
                    }
                  }}
                  defaultValue={current.Generation}
                  name="pokemonGeneration"
                />
              </FloatingLabelInputContainer>
            </RowContainer>

            <RowContainer>
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonDescription"
                  active={inputActive.pokemonDescription}
                >
                  Descrição do Pokémon
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonDescription"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonDescription: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonDescription: false,
                      });
                    }
                  }}
                  defaultValue={current.About}
                  name="pokemonDescription"
                />
              </FloatingLabelInputContainer>
            </RowContainer>

            <RowContainer>
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonTypes"
                  active={inputActive.pokemonTypes}
                >
                  Tipo do Pokémon (Separe por virgulas)
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonTypes"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonTypes: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonTypes: false,
                      });
                    }
                  }}
                  defaultValue={`${current.Types} `}
                  name="pokemonTypes"
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonResistance"
                  active={inputActive.pokemonResistance}
                >
                  Resistencia do Pokémon (Separe por virgulas)
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonResistance"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonResistance: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonResistance: false,
                      });
                    }
                  }}
                  defaultValue={`${current.Resistant} `}
                  name="pokemonResistance"
                />
              </FloatingLabelInputContainer>
            </RowContainer>

            <RowContainer>
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonWeaknesses"
                  active={inputActive.pokemonWeaknesses}
                >
                  Fraquesas do Pokémon (Separe por virgulas)
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonWeaknesses"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonWeaknesses: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonWeaknesses: false,
                      });
                    }
                  }}
                  defaultValue={`${current.Weaknesses} `}
                  name="pokemonWeaknesses"
                />
              </FloatingLabelInputContainer>
            </RowContainer>

            <RowContainer>
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonFastAttacks"
                  active={inputActive.pokemonFastAttacks}
                >
                  Ataques Rápidos (Nome - Tipo - Dano) (Separe por virgulas)
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonFastAttacks"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonFastAttacks: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonFastAttacks: false,
                      });
                    }
                  }}
                  defaultValue={
                    current['Fast Attack(s)'].length > 0 &&
                    current['Fast Attack(s)'][0].Damage &&
                    current['Fast Attack(s)'].map(
                      x => ` ${x.Name} - ${x.Type} - ${x.Damage}`
                    )
                  }
                  name="pokemonFastAttacks"
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonSpecialAttacks"
                  active={inputActive.pokemonSpecialAttacks}
                >
                  Ataques Especiais (Nome - Tipo - Dano) (Separe por virgulas)
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonSpecialAttacks"
                  type="text"
                  onFocus={() =>
                    setInputActive({
                      ...inputActive,
                      pokemonSpecialAttacks: true,
                    })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonSpecialAttacks: false,
                      });
                    }
                  }}
                  defaultValue={
                    current['Special Attack(s)'].length > 0 &&
                    current['Special Attack(s)'][0].Damage &&
                    current['Special Attack(s)'].map(
                      x => ` ${x.Name} - ${x.Type} - ${x.Damage}`
                    )
                  }
                  name="pokemonSpecialAttacks"
                />
              </FloatingLabelInputContainer>
            </RowContainer>

            <RowContainer>
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonMinWeight"
                  active={inputActive.pokemonMinWeight}
                >
                  Peso Mínimo
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonMinWeight"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonMinWeight: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonMinWeight: false,
                      });
                    }
                  }}
                  defaultValue={current.Weight && current.Weight.Minimum}
                  name="pokemonMinWeight"
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonMaxWeight"
                  active={inputActive.pokemonMaxWeight}
                >
                  Peso Máximo
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonMaxWeight"
                  type="text"
                  onFocus={() =>
                    setInputActive({
                      ...inputActive,
                      pokemonMaxWeight: true,
                    })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonMaxWeight: false,
                      });
                    }
                  }}
                  defaultValue={current.Weight && current.Weight.Maximum}
                  name="pokemonMaxWeight"
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonMinHeight"
                  active={inputActive.pokemonMinHeight}
                >
                  Altura Mínima
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonMinHeight"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonMinHeight: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonMinHeight: false,
                      });
                    }
                  }}
                  defaultValue={current.Height && current.Height.Minimum}
                  name="pokemonMinHeight"
                />
              </FloatingLabelInputContainer>
            </RowContainer>

            <RowContainer>
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonMaxHeight"
                  active={inputActive.pokemonMaxHeight}
                >
                  Altura Máxima
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonMaxHeight"
                  type="text"
                  onFocus={() =>
                    setInputActive({
                      ...inputActive,
                      pokemonMaxHeight: true,
                    })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonMaxHeight: false,
                      });
                    }
                  }}
                  defaultValue={current.Height && current.Height.Maximum}
                  name="pokemonMaxHeight"
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonDistance"
                  active={inputActive.pokemonDistance}
                >
                  Distância Média
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonDistance"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonDistance: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonDistance: false,
                      });
                    }
                  }}
                  defaultValue={current['Buddy Distance']}
                  name="pokemonDistance"
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonBaseStamina"
                  active={inputActive.pokemonBaseStamina}
                >
                  Stamina Base
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonBaseStamina"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonBaseStamina: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonBaseStamina: false,
                      });
                    }
                  }}
                  defaultValue={current['Base Stamina']}
                  name="pokemonBaseStamina"
                />
              </FloatingLabelInputContainer>
            </RowContainer>

            <RowContainer>
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonBaseAttack"
                  active={inputActive.pokemonBaseAttack}
                >
                  Ataque Base
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonBaseAttack"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonBaseAttack: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonBaseAttack: false,
                      });
                    }
                  }}
                  defaultValue={current['Base Attack']}
                  name="pokemonBaseAttack"
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonBaseDefense"
                  active={inputActive.pokemonBaseDefense}
                >
                  Stamina Base
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonBaseDefense"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonBaseDefense: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonBaseDefense: false,
                      });
                    }
                  }}
                  defaultValue={current['Base Defense']}
                  name="pokemonBaseDefense"
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonFleeRate"
                  active={inputActive.pokemonFleeRate}
                >
                  Chance de Fuga
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonFleeRate"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonFleeRate: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonFleeRate: false,
                      });
                    }
                  }}
                  defaultValue={current['Base Flee Rate']}
                  name="pokemonFleeRate"
                />
              </FloatingLabelInputContainer>
            </RowContainer>

            <RowContainer>
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonNextEvolution"
                  active={inputActive.pokemonNextEvolution}
                >
                  Próxima Evolução (Quantidade - Nome)
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonNextEvolution"
                  type="text"
                  onFocus={() =>
                    setInputActive({
                      ...inputActive,
                      pokemonNextEvolution: true,
                    })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonNextEvolution: false,
                      });
                    }
                  }}
                  defaultValue={
                    current['Next Evolution Requirements'] &&
                    current['Next Evolution Requirements'].Amount &&
                    `${current['Next Evolution Requirements'].Amount} - ${current['Next Evolution Requirements'].Name}`
                  }
                  name="pokemonNextEvolution"
                />
              </FloatingLabelInputContainer>
            </RowContainer>

            <RowContainer>
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonEvolutions"
                  active={inputActive.pokemonEvolutions}
                >
                  Evoluções (Numero - Nome) (Separe por Virgulas)
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonEvolutions"
                  type="text"
                  onFocus={() =>
                    setInputActive({
                      ...inputActive,
                      pokemonEvolutions: true,
                    })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonEvolutions: false,
                      });
                    }
                  }}
                  defaultValue={
                    current['Next evolution(s)'] &&
                    current['Next evolution(s)'].map(
                      x => ` ${x.Number} - ${x.Name}`
                    )
                  }
                  name="pokemonEvolutions"
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonPreviousEvolutions"
                  active={inputActive.pokemonPreviousEvolutions}
                >
                  Evoluções Anteriores (Numero - Nome) (Separe por Virgulas)
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonPreviousEvolutions"
                  type="text"
                  onFocus={() =>
                    setInputActive({
                      ...inputActive,
                      pokemonPreviousEvolutions: true,
                    })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonPreviousEvolutions: false,
                      });
                    }
                  }}
                  defaultValue={
                    current['Previous evolution(s)'] &&
                    current['Previous evolution(s)'].map(
                      x => ` ${x.Number} - ${x.Name}`
                    )
                  }
                  name="pokemonPreviousEvolutions"
                />
              </FloatingLabelInputContainer>
            </RowContainer>

            <RowContainer>
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonMaxCP"
                  active={inputActive.pokemonMaxCP}
                >
                  CP Máximo
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonMaxCP"
                  type="text"
                  onFocus={() =>
                    setInputActive({
                      ...inputActive,
                      pokemonMaxCP: true,
                    })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonMaxCP: false,
                      });
                    }
                  }}
                  defaultValue={current.MaxCP}
                  name="pokemonMaxCP"
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonMaxHP"
                  active={inputActive.pokemonMaxHP}
                >
                  HP Máximo
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonMaxHP"
                  type="text"
                  onFocus={() =>
                    setInputActive({
                      ...inputActive,
                      pokemonMaxHP: true,
                    })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonMaxHP: false,
                      });
                    }
                  }}
                  defaultValue={current.MaxHP}
                  name="pokemonMaxHP"
                />
              </FloatingLabelInputContainer>
            </RowContainer>
          </Form>
        </Container>
      ) : (
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit} id="editForm">
            <RowContainer>
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonNumber"
                  active={inputActive.pokemonNumber}
                >
                  Numero do Pokémon
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonNumber"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonNumber: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonNumber: false,
                      });
                    }
                  }}
                  name="pokemonNumber"
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonName"
                  active={inputActive.pokemonName}
                >
                  Nome do Pokémon
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonName"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonName: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonName: false,
                      });
                    }
                  }}
                  name="pokemonName"
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonGeneration"
                  active={inputActive.pokemonGeneration}
                >
                  Geração do Pokémon
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonGeneration"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonGeneration: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonGeneration: false,
                      });
                    }
                  }}
                  name="pokemonGeneration"
                />
              </FloatingLabelInputContainer>
            </RowContainer>

            <RowContainer>
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonDescription"
                  active={inputActive.pokemonDescription}
                >
                  Descrição do Pokémon
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonDescription"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonDescription: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonDescription: false,
                      });
                    }
                  }}
                  name="pokemonDescription"
                />
              </FloatingLabelInputContainer>
            </RowContainer>

            <RowContainer>
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonTypes"
                  active={inputActive.pokemonTypes}
                >
                  Tipo do Pokémon (Separe por virgulas)
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonTypes"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonTypes: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonTypes: false,
                      });
                    }
                  }}
                  name="pokemonTypes"
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonResistance"
                  active={inputActive.pokemonResistance}
                >
                  Resistencia do Pokémon (Separe por virgulas)
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonResistance"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonResistance: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonResistance: false,
                      });
                    }
                  }}
                  name="pokemonResistance"
                />
              </FloatingLabelInputContainer>
            </RowContainer>

            <RowContainer>
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonWeaknesses"
                  active={inputActive.pokemonWeaknesses}
                >
                  Fraquesas do Pokémon (Separe por virgulas)
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonWeaknesses"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonWeaknesses: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonWeaknesses: false,
                      });
                    }
                  }}
                  name="pokemonWeaknesses"
                />
              </FloatingLabelInputContainer>
            </RowContainer>

            <RowContainer>
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonFastAttacks"
                  active={inputActive.pokemonFastAttacks}
                  title="Ataques Rápidos (Nome - Tipo - Dano) (Separe por virgulas)"
                >
                  Ataques Rápidos (Nome - Tipo - Dano) (Separe por virgulas)
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonFastAttacks"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonFastAttacks: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonFastAttacks: false,
                      });
                    }
                  }}
                  name="pokemonFastAttacks"
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonSpecialAttacks"
                  active={inputActive.pokemonSpecialAttacks}
                  title="Ataques Especiais (Nome - Tipo - Dano) (Separe por virgulas)"
                >
                  Ataques Especiais (Nome - Tipo - Dano) (Separe por virgulas)
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonSpecialAttacks"
                  type="text"
                  onFocus={() =>
                    setInputActive({
                      ...inputActive,
                      pokemonSpecialAttacks: true,
                    })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonSpecialAttacks: false,
                      });
                    }
                  }}
                  name="pokemonSpecialAttacks"
                />
              </FloatingLabelInputContainer>
            </RowContainer>

            <RowContainer>
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonMinWeight"
                  active={inputActive.pokemonMinWeight}
                >
                  Peso Mínimo
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonMinWeight"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonMinWeight: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonMinWeight: false,
                      });
                    }
                  }}
                  name="pokemonMinWeight"
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonMaxWeight"
                  active={inputActive.pokemonMaxWeight}
                >
                  Peso Máximo
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonMaxWeight"
                  type="text"
                  onFocus={() =>
                    setInputActive({
                      ...inputActive,
                      pokemonMaxWeight: true,
                    })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonMaxWeight: false,
                      });
                    }
                  }}
                  name="pokemonMaxWeight"
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonMinHeight"
                  active={inputActive.pokemonMinHeight}
                >
                  Altura Mínima
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonMinHeight"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonMinHeight: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonMinHeight: false,
                      });
                    }
                  }}
                  name="pokemonMinHeight"
                />
              </FloatingLabelInputContainer>
            </RowContainer>

            <RowContainer>
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonMaxHeight"
                  active={inputActive.pokemonMaxHeight}
                >
                  Altura Máxima
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonMaxHeight"
                  type="text"
                  onFocus={() =>
                    setInputActive({
                      ...inputActive,
                      pokemonMaxHeight: true,
                    })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonMaxHeight: false,
                      });
                    }
                  }}
                  name="pokemonMaxHeight"
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonDistance"
                  active={inputActive.pokemonDistance}
                >
                  Distância Média
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonDistance"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonDistance: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonDistance: false,
                      });
                    }
                  }}
                  name="pokemonDistance"
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonBaseStamina"
                  active={inputActive.pokemonBaseStamina}
                >
                  Stamina Base
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonBaseStamina"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonBaseStamina: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonBaseStamina: false,
                      });
                    }
                  }}
                  name="pokemonBaseStamina"
                />
              </FloatingLabelInputContainer>
            </RowContainer>

            <RowContainer>
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonBaseAttack"
                  active={inputActive.pokemonBaseAttack}
                >
                  Ataque Base
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonBaseAttack"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonBaseAttack: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonBaseAttack: false,
                      });
                    }
                  }}
                  name="pokemonBaseAttack"
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonBaseDefense"
                  active={inputActive.pokemonBaseDefense}
                >
                  Stamina Base
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonBaseDefense"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonBaseDefense: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonBaseDefense: false,
                      });
                    }
                  }}
                  name="pokemonBaseDefense"
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonFleeRate"
                  active={inputActive.pokemonFleeRate}
                >
                  Chance de Fuga
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonFleeRate"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, pokemonFleeRate: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonFleeRate: false,
                      });
                    }
                  }}
                  name="pokemonFleeRate"
                />
              </FloatingLabelInputContainer>
            </RowContainer>

            <RowContainer>
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonNextEvolution"
                  active={inputActive.pokemonNextEvolution}
                >
                  Próxima Evolução (Quantidade - Nome)
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonNextEvolution"
                  type="text"
                  onFocus={() =>
                    setInputActive({
                      ...inputActive,
                      pokemonNextEvolution: true,
                    })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonNextEvolution: false,
                      });
                    }
                  }}
                  name="pokemonNextEvolution"
                />
              </FloatingLabelInputContainer>
            </RowContainer>

            <RowContainer>
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonEvolutions"
                  active={inputActive.pokemonEvolutions}
                >
                  Evoluções
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonEvolutions"
                  type="text"
                  onFocus={() =>
                    setInputActive({
                      ...inputActive,
                      pokemonEvolutions: true,
                    })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonEvolutions: false,
                      });
                    }
                  }}
                  name="pokemonEvolutions"
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonPreviousEvolutions"
                  active={inputActive.pokemonPreviousEvolutions}
                >
                  Evoluções Anteriores
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonPreviousEvolutions"
                  type="text"
                  onFocus={() =>
                    setInputActive({
                      ...inputActive,
                      pokemonPreviousEvolutions: true,
                    })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonPreviousEvolutions: false,
                      });
                    }
                  }}
                  name="pokemonPreviousEvolutions"
                />
              </FloatingLabelInputContainer>
            </RowContainer>

            <RowContainer>
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonMaxCP"
                  active={inputActive.pokemonMaxCP}
                >
                  CP Máximo
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonMaxCP"
                  type="text"
                  onFocus={() =>
                    setInputActive({
                      ...inputActive,
                      pokemonMaxCP: true,
                    })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonMaxCP: false,
                      });
                    }
                  }}
                  name="pokemonMaxCP"
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="pokemonMaxHP"
                  active={inputActive.pokemonMaxHP}
                >
                  HP Máximo
                </FloatingLabel>
                <FloatLabelInput
                  id="pokemonMaxHP"
                  type="text"
                  onFocus={() =>
                    setInputActive({
                      ...inputActive,
                      pokemonMaxHP: true,
                    })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        pokemonMaxHP: false,
                      });
                    }
                  }}
                  name="pokemonMaxHP"
                />
              </FloatingLabelInputContainer>
            </RowContainer>
          </Form>
        </Container>
      )}
      <BottomActions>
        <Icon
          path={mdiTrashCan}
          title="Remove"
          size={1.2}
          color="#333"
          onClick={handleOpenAskDialog}
        />
        <button type="submit" form="editForm">
          Salvar
        </button>
      </BottomActions>

      <Modal open={askOpen} setOpen={setDialogOpen}>
        <div>{handleAskDialog()}</div>
      </Modal>
    </>
  );
}

export default PokemonDialog;

PokemonDialog.propTypes = {
  setOpen: PropTypes.func.isRequired,
  getPokemons: PropTypes.func.isRequired,
  current: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
