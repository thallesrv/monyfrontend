import styled from 'styled-components';
import {
  device
} from '../../../styles/device';

export const Wrapper = styled.div `
  height: 100%;

  body {
    overflow-x: hidden;
  }
`;

export const SideBar = styled.div `
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 220px; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  top: 20; /* Stay at the top */
  left: 0;
  z-index: 1;
  background-color: #1e272e; /* Black */
  overflow-x: hidden; /* Disable horizontal scroll */
`;

export const NavLink = styled.div `
  display: flex;
  align-items: center;
  border-left: ${props => props.active ? '3px solid #f39c12' : 'none'};
  border-bottom: 2px solid #33464f;
  cursor:pointer;
  transition: 0.3s all;
  padding:5px;

  &:hover{
    background: #000;
    transition: 0.3s all;
  }

  i{
    padding:0 6px 0 10px;
    color: #fff;
  }


    a {
    padding: 15px 15px;
    text-decoration: none;
    font-size: 11px;
    font-weight: bold;
    color: #fff;
    display: block;
    transition: 0.3s all;

  }
`;

export const MainContent = styled.div `
  
`;

