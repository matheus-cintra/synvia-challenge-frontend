import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
  qrCode: null,
  oAuthSuccess: false,
  oAuthLogged: false,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_SUCCESS': {
      console.warn('action > ', action);
      return produce(state, draft => {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.qrCode = action.payload.qrcode;
      });
    }

    case '@auth/OAUTH_SUCCESS': {
      return produce(state, draft => {
        draft.oAuthSuccess = true;
      });
    }

    case '@auth/LOGOUT_USER': {
      return produce(state, draft => {
        draft.token = null;
        draft.signed = false;
      });
    }

    case '@auth/OAUTH_LOGGED': {
      return produce(state, draft => {
        draft.oAuthLogged = true;
        draft.oAuthSuccess = true;
      });
    }

    case '@auth/DELETE_ACCOUNT': {
      return produce(state, draft => {
        draft.token = null;
        draft.signed = false;
        draft.loading = false;
        draft.qrCode = null;
        draft.oAuthSuccess = false;
        draft.oAuthLogged = false;
      });
    }

    default:
      return state;
  }
}
