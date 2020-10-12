import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { useDispatch } from 'react-redux';

import AuthLayout from '../pages/_layouts/auth';
import DefaultLayout from '../pages/_layouts/default';

import { store } from '../store';
import { logoutUser } from '../store/modules/auth/actions';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  title,
  path,
  ...rest
}) {
  const { signed, oAuthSuccess } = store.getState().auth;
  // const signed = true;
  const account = store.getState();
  const { token } = account.auth;
  const currTime = new Date().getTime() / 1000;
  const decoded = jwt.decode(token);
  const expired = decoded && currTime > decoded.exp;

  const dispatch = useDispatch();

  if (expired) {
    dispatch(logoutUser());
    return <Redirect to="/" />;
  }

  if (title) window.document.title = title;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && oAuthSuccess && !isPrivate) {
    return <Redirect to="/pokedex" />;
  }

  const Layout =
    signed && path !== '/oauth-qrcode' ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.any,
  ]).isRequired,
  title: PropTypes.string.isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
