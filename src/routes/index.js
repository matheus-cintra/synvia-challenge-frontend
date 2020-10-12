/* ****************************************************************************
Import de bibliotecas padrão
***************************************************************************** */
import React from 'react';
import { Switch } from 'react-router-dom';

/* ****************************************************************************
Import do Route onde é feito a validação de acesso as rotas.
***************************************************************************** */
import Route from './Route';

/* ****************************************************************************
Import das rotas da aplicação
***************************************************************************** */
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ConfirmationRegister from '../pages/ConfirmationRegister';
import QRCode from '../pages/QRCode';
import Pokedex from '../pages/Pokedex';
import Profile from '../pages/Profile'

/* ****************************************************************************
Definição das rotas de navegação
***************************************************************************** */
export default function Routes() {
  return (
    <Switch>
      <Route path="/" title="Synvia Challenge" exact component={SignIn} />
      <Route path="/register" title="Registro" component={SignUp} />
      <Route
        path="/confirmation"
        title="Confirmação"
        exact
        component={ConfirmationRegister}
      />
      <Route
        path="/oauth-qrcode"
        title="Autenticação por dois fatores"
        exact
        isPrivate
        component={QRCode}
      />
      <Route
        path="/pokedex"
        title="Lista de Pokémons"
        exact
        isPrivate
        component={Pokedex}
      />
       <Route
        path="/profile"
        title="Perfil"
        component={Profile}
        isPrivate
      />
      <Route
        path="/"
        title="Página não encontrada"
        component={() => <h1>404</h1>}
        isPrivate
      />
    </Switch>
  );
}
