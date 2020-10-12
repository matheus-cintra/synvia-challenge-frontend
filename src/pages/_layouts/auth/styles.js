import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: #eeeeee;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  background: #fff;
  max-width: 720px;
  width: 100%;
  padding: 25px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  border: 1px;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  img {
    width: 130px;
    margin-top: 25px;
  }

  button,
  a {
    margin: 0;
    height: 44px;
    background: #9c2c91;
    font-weight: bold;
    color: #fff;
    font-size: 14px;
    border: 0;
    border-radius: 4px;
    transition: background 0.3s;

    &:hover {
      background: #43267f;
    }
  }

  a {
    background: #c5e1a5;
    display: flex;
    width: 250px;
    align-items: center;
    margin: 20px auto;
    justify-content: center;
    &:hover {
      background: #9ccc65;
    }
  }

  form {
    display: flex;
    flex-direction: column;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #000;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(0, 0, 0, 0.4);
      }
    }
  }

  @media screen and (max-width: 800px) {
    width: calc(100vw - 60%);
    min-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;

    svg {
      align-self: flex-start;
    }
  }
`;
