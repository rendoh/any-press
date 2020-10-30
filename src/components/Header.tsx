import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAuthenticatedUser } from '../hooks/recoil/auth';
import { useLogoutUseCase } from '../hooks/usecases/auth';
import { Paths } from './Routes';

const Header: FC = () => {
  const authenticatedUser = useAuthenticatedUser();
  const handleClickLogout = useLogoutUseCase();

  return (
    <Wrapper>
      <NabBar>
        <Logo to={Paths.home}>HOME</Logo>
        {authenticatedUser ? (
          <Account>
            {authenticatedUser.name}
            <Menu>
              <MenuButton type="button">ダミーボタン</MenuButton>
              <MenuButton type="button" onClick={handleClickLogout}>
                ログアウト
              </MenuButton>
            </Menu>
          </Account>
        ) : (
          <ButtonLink to={Paths.login}>LOGIN</ButtonLink>
        )}
      </NabBar>
    </Wrapper>
  );
};

export default Header;

const HEADER_HEIGHT = 50;

const Wrapper = styled.div`
  height: ${HEADER_HEIGHT}px;
`;

const NabBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 5px 20px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${HEADER_HEIGHT}px;
`;

const Logo = styled(Link)`
  font-weight: bold;
  color: #555;
  text-decoration: none;
`;

const ButtonLink = styled(Link)`
  border: 1px solid #f1f1f1;
  text-decoration: none;
  color: #333;
  font-size: 13px;
  padding: 5px 20px;
  &:hover {
    border-color: #e1e1e1;
    color: #333;
  }
`;

const Menu = styled.div`
  background: #fff;
  position: absolute;
  top: 100%;
  right: 0;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  display: none;
`;

const Account = styled.div`
  position: relative;
  &:hover ${Menu} {
    display: block;
  }
`;

const MenuButton = styled.button`
  padding: 10px 20px;
  display: block;
  width: 100%;
  text-align: left;
`;
