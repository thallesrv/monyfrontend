import { createGlobalStyle } from 'styled-components';
import {
  darken
} from 'polished';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    a:link {
      text-decoration: none;
    }
    
    a:visited {
      text-decoration: none;
    }
    
    a:hover {
      text-decoration: none;
    }
    
    a:active {
      text-decoration: none;
    }
  }

  body {
    font-family: 'Roboto';
    font-size: 16px;
    color: #E1E1E6;
    font-decoration:none;
    overflow: hidden;
  }
`
