import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    //theme colors
    --main-headers: ${({ colors }) => colors.mainHeaders};
    --main-background: ${({ colors }) => colors.mainBackground};
    --main-font: ${({ colors }) => colors.fontColor || colors.mainHeaders};

    --main-black: #444146;
    --light-gray: #9e9e9e;
    --light-blue: #40c4ff;
    --dark-shadow: rgba(0,0,0,0.2);
    --light-green: #00e676;
    --red-highlight: #f44336;
    --main-red: #f44336;

    --main-width-padding: 100px;
    --main-height-padding: 50px;
    --navbar-height: 80px;
    --authentication-form-width: 400px;

    --portal-height: 150px;
    --portal-width: 200px;
    --portal-gap: 30px;
    --portal-border-radius: 10px;

    --window-header-height: 50px;
    --default-appbar-height: 60px;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    font-family: "Trebuchet MS", Helvetica, sans-serif;
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
  	font-size: 100%;
  	font: inherit;
  	vertical-align: baseline;
  	font-family: 'Quicksand', sans-serif;
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

  button {
    font-weight: inherit;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    border: none;
    background-color: transparent;
    cursor: pointer;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    font-weight: inherit;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
  }
`;

export default GlobalStyles;
