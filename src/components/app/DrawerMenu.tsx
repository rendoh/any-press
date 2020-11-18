import styled from '@emotion/styled';
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Divider, Drawer, Icon, Nav, Sidenav } from 'rsuite';
import { Paths } from '../../constants/paths';

type DrawerMenuProps = {
  show: boolean;
  onHide: () => void;
};

const DrawerMenu: FC<DrawerMenuProps> = ({ show, onHide }) => {
  return (
    <Root show={show} onHide={onHide} placement="left">
      <Sidenav>
        <Sidenav.Body>
          <Nav>
            <Nav.Item
              icon={<Icon icon="home" />}
              componentClass={Link}
              to={Paths.home}
            >
              ホーム
            </Nav.Item>
            <Nav.Item
              icon={<Icon icon="peoples" />}
              componentClass={Link}
              to={Paths.users}
            >
              ユーザ一覧
            </Nav.Item>
            <Divider />
            <Nav.Item
              icon={<Icon icon="pencil" />}
              componentClass={Link}
              to={Paths.articleCreate}
            >
              新規記事投稿
            </Nav.Item>
            <Nav.Item
              icon={<Icon icon="file-text-o" />}
              componentClass={Link}
              to={Paths.accountArticles}
            >
              投稿した記事一覧
            </Nav.Item>
            <Nav.Item
              icon={<Icon icon="gear" />}
              componentClass={Link}
              to={Paths.accountSettings}
            >
              アカウント編集
            </Nav.Item>
            <Divider />
            <Nav.Item icon={<Icon icon="chevron-left" />} onClick={onHide}>
              閉じる
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </Root>
  );
};

export default DrawerMenu;

const Root = styled(Drawer)`
  width: 300px !important;
`;
