import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    //theme colors
    --main-headers: ${({ colors }) => colors.mainHeaders};
    --secondary-headers: ${({ colors }) => colors.secondaryHeaders};
    --main-background: ${({ colors }) => colors.mainBackground};
    --main-font: ${({ colors }) => colors.fontColor || colors.mainHeaders};

    --main-black: #444146;
    --light-gray: #9e9e9e;
    --light-blue: #40c4ff;
    --dark-shadow: rgba(0,0,0,0.2);
    --light-green: ${({ colors }) => colors.overwrite || '#00e676'};
    --secondary-green: ${({ colors }) => colors.secondaryOverwrite || '#69f0ae'};
    --red-highlight: #f44336;
    --main-red: ${({ colors }) => colors.overwrite || '#f44336'};

    --heading-text-shadow: 1px 1px 12px var(--main-black);

    --main-width-padding: 100px;
    --main-height-padding: 50px;
    --navbar-height: 80px;
    --authentication-form-width: 400px;

    --portal-gap: 30px;
    --portal-height: 230px;
    --portal-width: calc((100vw / 4) - 80px);
    --portal-border-radius: 10px;

    --window-header-height: 50px;
    --default-action-bar-height: 60px;

    --room-menu-width: 150px;
    --room-menu-height: 150px;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    font-family: 'Roboto', Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
  	margin: 0;
  	padding: 0;
  	border: 0;
  	font-size: 18px;
  	vertical-align: baseline;
  	font-family: 'Roboto', sans-serif;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
  	display: block;
  }

  body {
  	line-height: 1;
    width: 100vw;
    height: 100vh;
    color: var(--main-font);
    background-color: var(--main-background);
  }

  blockquote, q {
  	quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
  	content: '';
  	content: none;
  }

  table {
  	border-collapse: collapse;
  	border-spacing: 0;
  }

  button, a, select, input {
    font-weight: inherit;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyles;
