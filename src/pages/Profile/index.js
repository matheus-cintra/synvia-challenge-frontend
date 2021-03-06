import React, { useEffect, useState, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import DefaultInput from '../../components/DefaultInput/Input';

import {
  Container,
  ProfileContainer,
  Row,
  FormContainer,
  SubmitButton,
  Actions,
  DeleteButton,
} from './styles';

import Modal from '../../components/Modals';
import Asks from './Dialogs/Asks';

import { handleSubmit } from './methods';
import { setProfile } from '../../store/modules/user/actions';
import { deleteAccount, logoutUser } from '../../store/modules/auth/actions';
import { store } from '../../store';

function Profile() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const storedInfo = store.getState();
  const accountInfo = storedInfo.user.profile;
  const [askOpen, setAskOpen] = useState(false);
  const [, setOpen] = useState(false);

  const handleSubmitMethod = data =>
    handleSubmit(data, formRef, accountInfo, dispatch, setProfile);

  useEffect(() => {
    setProfile(accountInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountInfo]);

  const handleOpenAskDialog = () => setAskOpen(asking => !asking);

  function handleCloseReturn() {
    dispatch(logoutUser());
    setTimeout(() => {
      window.location.reload();
      dispatch(deleteAccount());
    }, 100);
  }

  const handleAskDialog = () => {
    return (
      <Asks
        setAskOpen={handleOpenAskDialog}
        accountId={accountInfo && accountInfo._id}
        closeReturn={handleCloseReturn}
      />
    );
  };

  return (
    <>
      <Container>
        <span>Editar Informações de Perfil</span>
        <ProfileContainer>
          <FormContainer ref={formRef} onSubmit={handleSubmitMethod}>
            <Row>
              <DefaultInput
                name="name"
                type="text"
                placeholder="Nome de Exibição"
                defaultValue={accountInfo && accountInfo.name}
              />
            </Row>
            <Row>
              <DefaultInput
                name="email"
                type="email"
                placeholder="E-mail do Usuário"
                defaultValue={accountInfo && accountInfo.email}
                disabled
              />
            </Row>
            <Row>
              <DefaultInput
                name="oldPassword"
                type="password"
                placeholder="Senha Atual"
              />
            </Row>
            <Row>
              <DefaultInput
                name="newPassword"
                type="password"
                placeholder="Nova Senha"
              />
            </Row>
            <Row>
              <p />
              <Actions>
                <SubmitButton>Salvar</SubmitButton>
                <DeleteButton type="button" onClick={handleOpenAskDialog}>
                  Apagar Conta
                </DeleteButton>
              </Actions>
            </Row>
          </FormContainer>
        </ProfileContainer>
      </Container>

      <Modal open={askOpen} setOpen={setOpen}>
        <div>{handleAskDialog()}</div>
      </Modal>
    </>
  );
}

export default connect()(Profile);
