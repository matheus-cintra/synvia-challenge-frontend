import React, { useRef } from 'react';

import { useDispatch } from 'react-redux';
import Icon from '@mdi/react';
import * as Yup from 'yup';
import {
  mdiAccount,
  mdiEmail,
  mdiFormTextboxPassword,
  mdiChevronLeft,
} from '@mdi/js';
import history from '../../services/history';
import { Form, InputContainer, LogoContainer } from './styles';
import logo from '../../assets/logo.svg';
// import Input from '../../components/Form/Input';
import DefaultInput from '../../components/DefaultInput/Input';

import { validateSignUp } from '../../Schemas/globalSchemas';

import { signUpRequest } from '../../store/modules/auth/actions';

export default function SignUp() {
  const formRef = useRef(null);
  const dispatch = useDispatch();

  async function handleSubmit(data) {
    try {
      await validateSignUp(data);

      dispatch(signUpRequest(data));
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {};

        error.inner.forEach(err => {
          errorMessages[err.path] = err.message;
        });
        formRef.current.setErrors(errorMessages);
      }
    }
  }

  function handleBack() {
    return history.push('/');
  }

  return (
    <>
      <Icon
        path={mdiChevronLeft}
        title="Close"
        size={1.3}
        color="#000"
        onClick={handleBack}
        style={{ cursor: 'pointer' }}
      />
      <LogoContainer>
        <img src={logo} alt="Synvia - Logo" />
      </LogoContainer>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <InputContainer>
          <Icon path={mdiAccount} title="Nome" size={1} color="#c3c3c3" />
          <DefaultInput name="name" type="text" placeholder="Seu nome*" />
        </InputContainer>
        <InputContainer>
          <Icon path={mdiEmail} title="Email" size={1} color="#c3c3c3" />
          <DefaultInput name="email" type="text" placeholder="Seu e-mail*" />
        </InputContainer>
        <InputContainer>
          <Icon
            path={mdiFormTextboxPassword}
            title="Senha"
            size={1}
            color="#c3c3c3"
          />
          <DefaultInput
            name="password"
            type="password"
            placeholder="Sua senha*"
          />
        </InputContainer>
        <button type="submit">Registrar</button>
      </Form>
    </>
  );
}
