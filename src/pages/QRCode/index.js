import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { store } from '../../store';
import { oauthValidation } from '../../store/modules/auth/actions';
import FloatLabelInput from '../../components/FloatLabel/Input';
import {
  ContainerOAuth,
  FloatingLabelInputContainer,
  FloatingLabel,
  OAuthDescription,
  Form,
  QRCodeImage,
} from './styles';

function QRCode() {
  const state = store.getState();
  const { oAuthSuccess, oAuthLogged } = state.auth;
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const [code, setCode] = useState('');
  const [inputActive, setInputActive] = useState(false);

  const handleTFACode = () => {
    const secret =
      (state.auth &&
        state.auth.qrCode &&
        state.auth.qrCode.secret &&
        state.auth.qrCode.secret.ascii) ||
      (state.user && state.user.profile && state.user.profile.oAuthSecret);

    const data = {
      token: code,
      secret,
      encoding: 'ascii',
    };

    dispatch(oauthValidation(data));
  };

  if (oAuthLogged) {
    return <Redirect to="/pokedex" />;
  }

  return (
    <>
      {oAuthSuccess ? (
        <ContainerOAuth>
          <OAuthDescription>
            Digite o código que aparece em seu app Google Authenticator
          </OAuthDescription>
          <FloatingLabelInputContainer>
            <Form ref={formRef} onSubmit={handleTFACode} id="editForm">
              <FloatingLabel htmlFor="OAuthCode" active={inputActive.OAuthCode}>
                Código de Autenticação
              </FloatingLabel>
              <FloatLabelInput
                id="OAuthCode"
                type="text"
                onFocus={() =>
                  setInputActive({ ...inputActive, OAuthCode: true })
                }
                onBlur={e => {
                  if (e.target.value === '') {
                    setInputActive({
                      ...inputActive,
                      OAuthCode: false,
                    });
                  }
                }}
                onChange={e => setCode(e.target.value)}
                name="OAuthCode"
              />

              {/* <input type="text" onChange={e => setCode(e.target.value)} placeholder="Código..." /> */}
              <button type="submit">Validar</button>
            </Form>
          </FloatingLabelInputContainer>
        </ContainerOAuth>
      ) : (
        <ContainerOAuth style={{ height: 320 }}>
          <OAuthDescription>
            Escaneie o QRCode em seu celular usando o App Google Authenticator
          </OAuthDescription>
          <QRCodeImage src={state.auth.qrCode.data} alt="QRCODE" />
          <OAuthDescription>
            Em seguida digite o código que aparecerá na tela para confirmar.
          </OAuthDescription>
          <FloatingLabelInputContainer>
            <Form ref={formRef} onSubmit={handleTFACode} id="editForm">
              <FloatingLabel htmlFor="OAuthCode" active={inputActive.OAuthCode}>
                Código de Autenticação
              </FloatingLabel>
              <FloatLabelInput
                id="OAuthCode"
                type="text"
                onFocus={() =>
                  setInputActive({ ...inputActive, OAuthCode: true })
                }
                onBlur={e => {
                  if (e.target.value === '') {
                    setInputActive({
                      ...inputActive,
                      OAuthCode: false,
                    });
                  }
                }}
                onChange={e => setCode(e.target.value)}
                name="OAuthCode"
              />

              {/* <input type="text" onChange={e => setCode(e.target.value)} placeholder="Código..." /> */}
              <button type="submit">Validar</button>
            </Form>
          </FloatingLabelInputContainer>
        </ContainerOAuth>
      )}
    </>
  );
}

export default QRCode;
