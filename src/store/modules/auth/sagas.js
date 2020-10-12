import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import jwt from 'jsonwebtoken';
import history from '../../../services/history';
import api from '../../../services/api';

import {
  signInSuccess,
  logoutUser,
  oAuthSuccess,
  oAuthLogged,
} from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;

  try {
    const response = yield call(api.post, '/api/v1/login', { email, password });
    const { token, userToFront, qrCodeOauth } = response.data.data;

    api.defaults.headers['auth-token'] = token;
    api.defaults.headers['account-id'] = userToFront._id;
    if (userToFront.oAuthConfigured) {
      yield put(oAuthSuccess());
    }

    yield put(signInSuccess(token, userToFront, qrCodeOauth));

    history.push('/oauth-qrcode');
  } catch (err) {
    toast.error(err.response.data.message);
  }
}

export function* validateOauth({ payload }) {
  try {
    const response = yield call(api.post, '/api/v1/oauth-validation', {
      ...payload,
    });

    if (!response.data.success) {
      return toast.error(
        'Falha na validação do google authenticator. Tente novamente'
      );
    }

    yield put(oAuthLogged());

    history.push('/pokedex');
  } catch (err) {
    toast.error(err.response.data.message);
  }
}

export function* signUp({ payload }) {
  try {
    yield call(api.post, '/api/v1/register', { ...payload });
    history.push('/confirmation');
  } catch (err) {
    toast.error(err.response.data.description);
  }
}

export function* setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;
  const accountId =
    payload.user && payload.user.profile && payload.user.profile._id;

  const user = jwt.decode(token);
  const currTime = new Date().getTime() / 1000;

  if (!user) return;

  if (currTime > user.exp) {
    yield put(logoutUser());
    return history.push('/');
  }

  if (token && accountId) {
    api.defaults.headers['auth-token'] = token;
    api.defaults.headers['account-id'] = accountId;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/OAUTH_VALIDATION', validateOauth),
]);
