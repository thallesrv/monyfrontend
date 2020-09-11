import React, { useState, useEffect } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

import { Container, Produtos, ButtonSort, Badge } from './styles';

import { IoIosArrowRoundUp } from 'react-icons/io';

import api from '~/services/api';

export default function Flights() {
  const [flights, setFlights] = useState([]);
  const [currentSort, setCurrentSort] = useState();

  const LightTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }))(Tooltip);

  function onSortChange(event) {
    let nextSort;
    let data;
    let field = event.currentTarget.getAttribute('data-field');
    let buttons = document.getElementsByTagName('button');

    if (currentSort === 'down') nextSort = 'up';
    else if (currentSort === 'up') nextSort = 'down';
    else {
      nextSort = 'up';
    }

    if (currentSort === 'down') {
      data = [...flights].sort(function(a, b) {
        return a[field] - b[field];
      });

      for (var i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute(
          'style',
          'transform: rotate(0deg); color: rgba(0,0,0,0.4)'
        );
      }
      event.currentTarget.setAttribute(
        'style',
        'transform: rotate(0deg); color: rgba(0,0,0,0.4)'
      );
    } else {
      data = [...flights].sort(function(a, b) {
        return b[field] - a[field];
      });

      for (var i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute(
          'style',
          'transform: rotate(0deg); color: rgba(0,0,0,0.4)'
        );
      }

      event.currentTarget.setAttribute(
        'style',
        'transform: rotate(180deg); color: rgba(0,0,0)'
      );
    }

    setFlights(data);
    setCurrentSort(nextSort);
  }

  async function loadFlights() {
    const response = await api.get('/flights');

    setFlights(response.data);
  }

  useEffect(() => {
    document.title = 'Flights';
    loadFlights();
  }, []);

  return (
    <Container>
      <Produtos width={1300}>
        <table>
          <thead>
            <tr>
              <th>Cidade Origem</th>
              <th>Cidade Destino</th>
              <th>
                Noites no destino
                <ButtonSort
                  onClick={onSortChange}
                  data-field="noites_no_destino"
                >
                  <IoIosArrowRoundUp size={20} style={{ paddingTop: 6 }} />
                </ButtonSort>
              </th>
              <th>
                Data saida
                <ButtonSort onClick={onSortChange} data-field="data_ida">
                  <IoIosArrowRoundUp size={20} style={{ paddingTop: 6 }} />
                </ButtonSort>
              </th>
              <th>
                Data retorno
                <ButtonSort onClick={onSortChange} data-field="data_volta">
                  <IoIosArrowRoundUp size={20} style={{ paddingTop: 6 }} />
                </ButtonSort>
              </th>
              <th>
                Duração voo ida
                <ButtonSort onClick={onSortChange} data-field="duracao_voo_ida">
                  <IoIosArrowRoundUp size={20} style={{ paddingTop: 6 }} />
                </ButtonSort>
              </th>
              <th>
                Duração voo volta
                <ButtonSort
                  onClick={onSortChange}
                  data-field="duracao_voo_volta"
                >
                  <IoIosArrowRoundUp size={20} style={{ paddingTop: 6 }} />
                </ButtonSort>
              </th>
              <th>Companhias</th>
              <th>
                Preço
                <ButtonSort onClick={onSortChange} data-field="preco">
                  <IoIosArrowRoundUp size={20} style={{ paddingTop: 6 }} />
                </ButtonSort>
              </th>
              <th>
                Preço (EUR)
                <ButtonSort onClick={onSortChange} data-field="preco_euro">
                  <IoIosArrowRoundUp size={20} style={{ paddingTop: 6 }} />
                </ButtonSort>
              </th>
              <th>
                Data inclusão
                <ButtonSort onClick={onSortChange} data-field="dt_inclusao">
                  <IoIosArrowRoundUp size={20} style={{ paddingTop: 6 }} />
                </ButtonSort>
              </th>
            </tr>
          </thead>
          <tbody>
            {flights.map(a => (
              <tr>
                <td style={{ fontSize: 12, fontWeight: 'bold' }}>
                  {a.cidade_partida}
                </td>
                <td style={{ fontSize: 12 }}>{a.cidade_chegada}</td>
                <td>{a.noites_no_destino}</td>
                <td>{a.data_ida}</td>
                <td>{a.data_volta}</td>
                <td>{a.duracao_voo_ida}</td>
                <td>{a.duracao_voo_volta}</td>
                <td>
                  {a.code.map((b, i) => (
                    <LightTooltip placement="top" title={a.companhias[0]}>
                      <Badge>
                        <img
                          src={`https://images.kiwi.com/airlines/32x32/${b}.png?default=airline.png`}
                        />
                      </Badge>
                    </LightTooltip>
                  ))}
                </td>
                <td>R$ {a.preco}</td>
                <td>{a.preco_euro}</td>
                <td>{a.dt_inclusao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Produtos>
    </Container>
  );
}
