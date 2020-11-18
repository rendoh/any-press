import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../api/auth';
import { Dropdown, Icon, IconButton, Nav, Navbar } from 'rsuite';

import {
  useAuthenticatedUser,
  useSetAuthenticatedUser,
} from '../../hooks/recoil/auth';
import { Paths } from '../../constants/paths';
import Avatar from '../core/Avatar';
import { css, Global } from '@emotion/core';
import DrawerMenu from './DrawerMenu';

const Header: FC = () => {
  const authenticatedUser = useAuthenticatedUser();
  const setAuthenticatedUser = useSetAuthenticatedUser();
  const handleLogoutClick = () => {
    logout();
    setAuthenticatedUser(null);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const location = useLocation();
  React.useEffect(closeMenu, [location]);

  return (
    <>
      <Root appearance="inverse">
        <Global styles={globalStyle} />
        <Navbar.Header>
          <MenuButton
            onClick={openMenu}
            icon={<Icon icon="bars" />}
            appearance="primary"
            circle
          />
          <Logo to={Paths.home}>AnyPress</Logo>
        </Navbar.Header>
        <Navbar.Body>
          <Nav pullRight>
            {authenticatedUser ? (
              <AvatarDropdown
                title={
                  <AvatarRow>
                    <AvatarRowImage avatar={authenticatedUser.avatar} />
                    {authenticatedUser.name}
                  </AvatarRow>
                }
                trigger={['hover', 'click']}
                placement="bottomEnd"
              >
                <Dropdown.Item componentClass={Link} to={Paths.accountSettings}>
                  アカウント編集
                </Dropdown.Item>
                <Dropdown.Item componentClass={Link} to={Paths.accountArticles}>
                  投稿した記事一覧
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
      </Root>
      <DrawerMenu show={isMenuOpen} onHide={closeMenu} />
    </>
  );
};

export default Header;

const globalStyle = css`
  body {
    padding-top: 56px;
  }
`;

const Root = styled(Navbar)`
  position: fixed;
  width: 100%;
  z-index: 10;
  top: 0;
  left: 0;
`;

const MenuButton = styled(IconButton)`
  margin-left: 10px;
`;

const Logo = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  display: inline-flex;
  height: 100%;
  align-items: center;
  padding: 0 10px;
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
