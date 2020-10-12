import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../../services/history';
import { store } from '../../store';

import { Container, Content, Profile } from './styles';

function Header() {
  const accountInfo = store.getState();
  const userProfile = accountInfo.user;

  const handleHome = () => {
    return history.push('/pokedex');
  };

  return (
    <Container>
      <Content>
        <span style={{ cursor: 'pointer' }} onClick={handleHome}>
          Pokedex
        </span>
        <aside>
          <Profile>
            <div>
              <strong>
                {userProfile && userProfile.profile && userProfile.profile.name}
              </strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <img
              src="https://api.adorable.io/avatars/48/abott@adorable.png"
              alt="Profile Pic"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

export default connect(state => ({
  user: state.user,
}))(Header);
