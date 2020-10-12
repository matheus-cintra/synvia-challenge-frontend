import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const ContainerOAuth = styled.div`
  display: flex;
  height: 200px;
  justify-content: space-around;
  align-items: center;
  border-radius: 5px;
  /* box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23); */
  /* width: 450px; */
  flex-direction: column;
`;

export const OAuthDescription = styled.span`
  font-weight: 600;
  font-size: 18px;
`

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
  margin-top: 13px;

  transform: ${props => (props.active ? 'translateY(-19px)' : null)};
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

export const QRCodeImage = styled.img`

`