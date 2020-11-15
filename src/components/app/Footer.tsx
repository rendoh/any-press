import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Icon, IconButton } from 'rsuite';
import { useIsAuthenticated } from '../../hooks/recoil/auth';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { Paths } from '../../constants/paths';

const activeFloatingButtonPaths = [
  Paths.home,
  Paths.articleDetail(':id'),
  Paths.users,
  Paths.userDetail(':id'),
  Paths.accountArticles,
  Paths.articleDetail(':id'),
  Paths.category(':slug'),
  Paths.tag(':slug'),
];

function isActiveFloatingButtonPath(pathname: string) {
  /**
   * Note:
   * Article作成ページのパスがArticle詳細ページのパスにマッチするため、
   * それを防いでいる
   */
  return (
    !matchPath(Paths.articleCreate, pathname) &&
    activeFloatingButtonPaths.some((path) => matchPath(path, pathname))
  );
}

const Footer: FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const { pathname } = useLocation();
  const isFloatingButtonActive = isActiveFloatingButtonPath(pathname);
  return (
    <>
      {isFloatingButtonActive && isAuthenticated && (
        <FloatingButton
          appearance="primary"
          icon={<Icon icon="plus" />}
          circle
          size="lg"
          aria-label="記事を作成する"
          componentClass={Link}
          to={Paths.articleCreate}
        />
      )}
      <Wrapper>
        <CopyRight>© sbox</CopyRight>
      </Wrapper>
    </>
  );
};

export default Footer;

const Wrapper = styled.footer`
  padding: 20px;
`;

const CopyRight = styled.p`
  font-size: 12px;
  text-align: center;
`;

const FloatingButton = styled(IconButton)`
  position: fixed !important;
  bottom: 20px;
  right: 20px;
`;
