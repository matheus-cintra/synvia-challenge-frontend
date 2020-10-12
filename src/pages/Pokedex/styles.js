import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
export const PokemonCard = styled.div`
  width: 200px;
  margin: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;
export const ImagePokemon = styled.img`
  padding: 10px;
  width: 100%;
`;
export const CardInformation = styled.div`
  padding: 10px;
  background: #ccc;

  span {
    display: block;
  }
`;

export const FloatingLabelInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  input {
    -webkit-appearance: none !important;
    padding: 10px;
    margin: 5px;
    border-radius: 4px;
    border: none;
    background: #f3f3f3;
  }
`;

export const FloatingLabel = styled.label`
  display: inline-block;
  z-index: 2;
  position: absolute;
  transition: all 150ms ease-in;
  color: #9a9a9a;
  margin-left: 15px !important;
  cursor: text;
  margin-top: 29px;

  transform: ${props => (props.active ? 'translateY(-16px)' : null)};
  font-size: ${props => (props.active ? '0.8em' : null)};
  color: ${props => (props.active ? '#9a9a9a' : null)};
  text-shadow: ${props =>
    props.active
      ? '1px 0 0 #fff, -1px 0 0 #fff, 2px 0 0 #fff, -2px 0 0 #fff, 0 1px 0 #fff, 0 -1px 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff'
      : null};
`;

export const Form = styled(Unform)`
  fieldset {
    border: none;
  }

  input {
    width: 250px;
  }
`;

export const ActionBar = styled.div`
  border-bottom: 1px solid #9a9a9a;
  margin: 20px 0;

  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const FloatLabelInput = styled.input`
  -webkit-appearance: none !important;
  padding: 10px;
  margin: 20px 5px 20px 5px;
  border-radius: 4px;
  border: none;
  background: #f3f3f3;
  font-size: 14px !important;
  width: 300px;
`;

export const NewButton = styled.button`
  display: flex;
  height: 30px;
  width: 30px;
  align-items: center;
  background: transparent;
  border: none;
  margin-right: 110px;
`;

export const SearchContainer = styled.div`
  margin-left: 110px;
  width: 300px;
`;
