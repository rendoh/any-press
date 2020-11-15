import React, { FC, useEffect, useRef } from 'react';
import { css, Global } from '@emotion/core';
import styled from '@emotion/styled';

type ArticleHtmlContentProps = {
  dangerHtml: string;
};

const ArticleHtmlContent: FC<ArticleHtmlContentProps> = ({ dangerHtml }) => {
  const contentElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rootEl = contentElementRef.current;
    if (!rootEl) return;

    rootEl.querySelectorAll('a').forEach((anchorEl) => {
      anchorEl.setAttribute('target', '_blank');
      anchorEl.setAttribute('rel', 'noopener noreferrer');
    });
  }, []);

  return (
    <>
      <Global styles={globalStyle} />
      <Content
        ref={contentElementRef}
        dangerouslySetInnerHTML={{
          __html: dangerHtml,
        }}
      />
    </>
  );
};

export default ArticleHtmlContent;

const globalStyle = css`
  :root {
    --border-radius: 5px;
    --box-shadow: 2px 2px 10px;
    --color: #f44336;
    --color-accent: #ba000d;
    --color-bg: #fff;
    --color-bg-secondary: #e9e9e9;
    --color-secondary: #2196f3;
    --color-secondary-accent: #2196f3;
    --color-shadow: #f4f4f4;
    --color-text: #000;
    --color-text-secondary: #999;
    --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    --hover-brightness: 1.2;
    --justify-important: center;
    --justify-normal: left;
    --line-height: 1.5;
    --width-card: 285px;
    --width-card-medium: 460px;
    --width-card-wide: 800px;
    --width-content: 1080px;
  }
`;

const Content = styled.div`
  * {
    max-width: 100%;
    height: auto;
  }

  /* Typography */
  code,
  samp {
    background-color: var(--color-accent);
    border-radius: var(--border-radius);
    color: var(--color-text);
    display: inline-block;
    margin: 0 0.1rem;
    padding: 0 0.5rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: var(--line-height);
  }

  mark {
    padding: 0.1rem;
  }

  ol li,
  ul li {
    padding: 0.2rem 0;
  }

  p {
    margin: 0.75rem 0;
    padding: 0;
  }

  pre {
    margin: 1rem 0;
    max-width: var(--width-card-wide);
    padding: 1rem 0;
  }

  pre code,
  pre samp {
    display: block;
    max-width: var(--width-card-wide);
    padding: 0.5rem 2rem;
    white-space: pre-wrap;
  }

  small {
    color: var(--color-text-secondary);
  }

  sup {
    background-color: var(--color-secondary);
    border-radius: var(--border-radius);
    color: var(--color-bg);
    font-size: xx-small;
    font-weight: bold;
    margin: 0.2rem;
    padding: 0.2rem 0.3rem;
    position: relative;
    top: -2px;
  }

  /* Links */
  a {
    color: var(--color-secondary);
    display: inline-block;
    font-weight: bold;
    text-decoration: none;
  }

  a:hover {
    filter: brightness(var(--hover-brightness));
    text-decoration: underline;
  }

  a b,
  a em,
  a i,
  a strong,
  button {
    border-radius: var(--border-radius);
    display: inline-block;
    font-size: medium;
    font-weight: bold;
    line-height: var(--line-height);
    margin: 0.5rem 0;
    padding: 1rem 2rem;
  }

  button {
    font-family: var(--font-family);
  }

  button:hover {
    cursor: pointer;
    filter: brightness(var(--hover-brightness));
  }

  a b,
  a strong,
  button {
    background-color: var(--color);
    border: 2px solid var(--color);
    color: var(--color-bg);
  }

  a em,
  a i {
    border: 2px solid var(--color);
    border-radius: var(--border-radius);
    color: var(--color);
    display: inline-block;
    padding: 1rem 2rem;
  }

  /* Images */
  figure {
    margin: 0;
    padding: 0;
  }

  figure img {
    max-width: 100%;
  }

  figure figcaption {
    color: var(--color-text-secondary);
  }

  /* Forms */

  button:disabled,
  input:disabled {
    background: var(--color-bg-secondary);
    border-color: var(--color-bg-secondary);
    color: var(--color-text-secondary);
    cursor: not-allowed;
  }

  button[disabled]:hover {
    filter: none;
  }

  form {
    border: 1px solid var(--color-bg-secondary);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow) var(--color-shadow);
    display: block;
    max-width: var(--width-card-wide);
    min-width: var(--width-card);
    padding: 1.5rem;
    text-align: var(--justify-normal);
  }

  form header {
    margin: 1.5rem 0;
    padding: 1.5rem 0;
  }

  input,
  label,
  select,
  textarea {
    display: block;
    font-size: inherit;
    max-width: var(--width-card-wide);
  }

  input[type='checkbox'],
  input[type='radio'] {
    display: inline-block;
  }

  input[type='checkbox'] + label,
  input[type='radio'] + label {
    display: inline-block;
    font-weight: normal;
    position: relative;
    top: 1px;
  }

  input,
  select,
  textarea {
    border: 1px solid var(--color-bg-secondary);
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
    padding: 0.4rem 0.8rem;
  }

  input[readonly],
  textarea[readonly] {
    background-color: var(--color-bg-secondary);
  }

  label {
    font-weight: bold;
    margin-bottom: 0.2rem;
  }

  /* Tables */
  table {
    border: 1px solid var(--color-bg-secondary);
    border-radius: var(--border-radius);
    border-spacing: 0;
    display: inline-block;
    max-width: 100%;
    overflow-x: auto;
    padding: 0;
    white-space: nowrap;
  }

  table td,
  table th,
  table tr {
    padding: 0.4rem 0.8rem;
    text-align: var(--justify-important);
  }

  table thead {
    background-color: var(--color);
    border-collapse: collapse;
    border-radius: var(--border-radius);
    color: var(--color-bg);
    margin: 0;
    padding: 0;
  }

  table thead th:first-of-type {
    border-top-left-radius: var(--border-radius);
  }

  table thead th:last-of-type {
    border-top-right-radius: var(--border-radius);
  }

  table thead th:first-of-type,
  table tr td:first-of-type {
    text-align: var(--justify-normal);
  }

  table tr:nth-of-type(even) {
    background-color: var(--color-accent);
  }

  /* Quotes */
  blockquote {
    display: block;
    font-size: x-large;
    line-height: var(--line-height);
    margin: 1rem auto;
    max-width: var(--width-card-medium);
    padding: 1.5rem 1rem;
    text-align: var(--justify-important);
  }

  blockquote footer {
    color: var(--color-text-secondary);
    display: block;
    font-size: small;
    line-height: var(--line-height);
    padding: 1.5rem 0;
  }
`;
