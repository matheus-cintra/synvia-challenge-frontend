export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess(token, user, qrcode) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user, qrcode },
  };
}

export function oAuthSuccess() {
  return {
    type: '@auth/OAUTH_SUCCESS',
  };
}

export function oAuthLogged() {
  return {
    type: '@auth/OAUTH_LOGGED',
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function logoutUser() {
  return {
    type: '@auth/LOGOUT_USER',
  };
}

export function oauthValidation(payload) {
  return {
    type: '@auth/OAUTH_VALIDATION',
    payload: { ...payload },
  };
}

export function signUpRequest(payload) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { ...payload },
  };
}

export function deleteAccount() {
  return {
    type: '@auth/DELETE_ACCOUNT',
  };
}
