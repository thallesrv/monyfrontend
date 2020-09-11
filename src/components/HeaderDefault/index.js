import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Container, Content, Profile } from './styles';
import logo from './../../assets/logo.png';
import { IoMdAddCircle, IoIosMenu, IoMdPie } from 'react-icons/io';
import { AiOutlineDashboard } from 'react-icons/ai';
import { FaPiggyBank } from 'react-icons/fa';

export default function HeaderDefault() {
  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <NavLink to="/home">
            <img src={logo} alt="finan" />
          </NavLink>

          
        </nav>
        <aside>
          <Profile>
          <img
              src={
                
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt="Thalles Honorato"
            />
            <div>
              <strong> {profile.name} </strong>
              <a href="#">
                ADMINISTRADOR
              </a>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
