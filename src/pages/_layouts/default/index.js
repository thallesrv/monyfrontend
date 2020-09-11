import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, SideBar, MainContent, NavLink } from './styles';

import HeaderDefault from '../../../components/HeaderDefault';
import WindowHeader from '../../../components/WindowHeader';
import { FaHome } from 'react-icons/fa';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
       <WindowHeader/> 
       <HeaderDefault /> 
      <MainContent>{children}</MainContent>
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
