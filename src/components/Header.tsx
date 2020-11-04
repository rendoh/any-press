import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { logout } from '../api/auth';
import { Avatar, Dropdown, Icon, Nav, Navbar } from 'rsuite';

import {
  useAuthenticatedUser,
  useSetAuthenticatedUser,
} from '../hooks/recoil/auth';
import { Paths } from '../constants/paths';

const Header: FC = () => {
  const authenticatedUser = useAuthenticatedUser();
  const setAuthenticatedUser = useSetAuthenticatedUser();
  const handleLogoutClick = () => {
    logout();
    setAuthenticatedUser(null);
  };

  return (
    <Navbar appearance="inverse">
      <Navbar.Header>
        <Logo to={Paths.home}>HOME</Logo>
      </Navbar.Header>
      <Navbar.Body>
        <Nav pullRight>
          {authenticatedUser ? (
            <AvatarDropdown
              title={
                <AvatarRow>
                  {authenticatedUser.avatar ? (
                    <AvatarRowImage
                      circle
                      src={authenticatedUser.avatar}
                      alt=""
                    />
                  ) : (
                    <AvatarRowImage circle alt="">
                      <Icon icon="user" />
                    </AvatarRowImage>
                  )}
                  {authenticatedUser.name}
                </AvatarRow>
              }
              trigger={['hover', 'click']}
              placement="bottomEnd"
            >
              <Dropdown.Item componentClass={Link} to={Paths.accountSettings}>
                アカウント編集
              </Dropdown.Item>
              <Dropdown.Item onSelect={handleLogoutClick}>
                ログアウト
              </Dropdown.Item>
            </AvatarDropdown>
          ) : (
            <>
              <Nav.Item componentClass={Link} to={Paths.register}>
                ユーザ登録
              </Nav.Item>
              <Nav.Item componentClass={Link} to={Paths.login}>
                ログイン
              </Nav.Item>
            </>
          )}
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};

export default Header;

const Logo = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  display: inline-flex;
  height: 100%;
  align-items: center;
  padding: 0 20px;
`;

const AvatarDropdown = styled(Dropdown)`
  > a {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    display: flex !important;
    align-items: center;
  }
`;

const AvatarRow = styled.span`
  display: flex;
  align-items: center;
`;

const AvatarRowImage = styled(Avatar)`
  margin-right: 10px;
`;
