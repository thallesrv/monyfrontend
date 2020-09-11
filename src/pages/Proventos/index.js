import React, { useState, useEffect } from 'react';
import { IntlProvider, FormattedNumber } from 'react-intl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from 'react-icons/io';
import { Link } from 'react-router-dom';

import {
  ReferenceLine,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import {
  Container,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  BoxOrange,
  BoxDark,
  Percentage,
  ListAssets,
  Day,
  SubTitle,
  CustomTooltipDiv,
} from './styles';

import api from '~/services/api';

export default function Proventos() {
  const [resumo, setResumo] = useState([]);
  const [allProfitDay, setAllProfitDay] = useState([]);
  const [allLossDay, setAllLossDay] = useState([]);
  const [proventos, setProventos] = useState([]);
  const [historicoProventosMes, setHistoricoProventosMes] = useState([]);
  const [historicoProventos, setHistoricoProventos] = useState([]);

  async function loadProventos() {
    const response = await api.get('/provents');

    setProventos(response.data[0]);
  }

  async function loadResumo() {
    const response = await api.get('/dashboard');

    setResumo(response.data);
  }

  async function loadTop7Profit() {
    const response = await api.get('/profitLossDay');

    setAllProfitDay(response.data.profitArray);
    setAllLossDay(response.data.lossArray);
  }

  async function loadHistoricoProventos() {
    const response = await api.get('/proventsHistory');

    setHistoricoProventos(response.data);
  }
  async function loadHistoricoProventosMes() {
    const response = await api.get('/proventsHistoryMonth');

    setHistoricoProventosMes(response.data);
  }

  useEffect(() => {
    document.title = 'Finan';

    loadResumo();
    loadTop7Profit();
    loadProventos();
    loadHistoricoProventos();
    loadHistoricoProventosMes();
  }, []);

  function renderColorfulLegendText(value, entry) {
    const { color } = entry;

    return <span style={{ color, fontSize: 10 }}>{value}</span>;
  }

  const CustomTooltip = ({
    active,
    payload,
    label,
    keyPayload = ['Proventos'],
  }) => {
    if (active) {
      return (
        <CustomTooltipDiv>
          <div className="custom-tooltip">
            <strong>{label}</strong>
            {payload
              ? payload.map((a, i) => (
                  <p className="label">
                    <strong>{keyPayload[i]}: </strong>
                    R${`${a.value}`}
                    <p
                      style={{
                        fontSize: '10px',
                        fontWeight: 'bold',
                        color: '#f39c12',
                      }}
                    >
                      {a.payload.tipo}
                    </p>
                  </p>
                ))
              : ''}
          </div>
        </CustomTooltipDiv>
      );
    }

    return null;
  };

  return (
    <Container>
      <aside>
        <BoxOrange>
          <h5>Valor Investido</h5>
          <h2>
            <IntlProvider locale="pt">
              R$
              <FormattedNumber
                value={resumo.totalInvestido}
                currencyDisplay="symbol"
                currency="BRL"
              />
            </IntlProvider>
          </h2>
        </BoxOrange>
        <BoxDark>
          <h5>PROVENTOS RECEBIDOS</h5>
          <h3>
            <IntlProvider locale="pt">
              R$
              <FormattedNumber
                value={proventos.vl_recebido}
                currencyDisplay="symbol"
                currency="BRL"
              />
            </IntlProvider>
          </h3>
        </BoxDark>
        <BoxDark>
          <h5>PROVENTOS Á RECEBER</h5>
          <h3>
            <IntlProvider locale="pt">
              R$
              <FormattedNumber
                value={proventos.vl_a_receber}
                currencyDisplay="symbol"
                currency="BRL"
              />
            </IntlProvider>
          </h3>
        </BoxDark>
        <BoxDark>
          <h5>RENTABILIDADE</h5>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '18px',
            }}
          >
            <h4>
              <span>RECEBIDO</span>
              <IntlProvider>
                <FormattedNumber
                  value={(
                    (proventos.vl_recebido / resumo.totalInvestido) *
                    100
                  ).toFixed(2)}
                />
                %
              </IntlProvider>
            </h4>
            <h4>
              <span>Á RECEBER</span>
              <IntlProvider>
                <FormattedNumber
                  value={(
                    (proventos.vl_a_receber / resumo.totalInvestido) *
                    100
                  ).toFixed(2)}
                />
                %
              </IntlProvider>
            </h4>
            <h4>
              <span>TOTAL</span>
              <IntlProvider>
                <FormattedNumber
                  value={(
                    ((Number(proventos.vl_a_receber) +
                      Number(proventos.vl_recebido)) /
                      resumo.totalInvestido) *
                    100
                  ).toFixed(2)}
                />
                %
              </IntlProvider>
            </h4>
          </div>
        </BoxDark>
      </aside>

      <Card width={1300}>
        <CardHeader>
          <h2> Proventos por mês </h2>
        </CardHeader>
        <CardContent>
          <div
            style={{
              height: 250,
              width: 520,
            }}
          >
            <BarChart
              width={1300}
              height={280}
              data={historicoProventosMes}
              margin={{ top: -10, right: 45, left: 0, bottom: 30 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="rgba(4, 158, 189)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="100%"
                    stopColor="rgba(4, 158, 189)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke="rgba(0,0,0,0.2)"
                vertical={false}
                strokeDasharray="5 5"
              />
              <XAxis
                dataKey="name"
                stroke="rgba(0,0,0,0.6)"
                axisLine={false}
                tick={{ fontSize: 9 }}
              />
              <YAxis
                stroke="rgba(0,0,0,0.6)"
                axisLine={false}
                tick={{ fontSize: 9 }}
                domain={[0, 'auto']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={renderColorfulLegendText}
                verticalAlign="top"
                height={36}
                payload={[
                  {
                    id: 'carteira',
                    value: 'Proventos',
                    type: 'circle',
                    color: 'rgba(4, 158, 189)',
                  },
                ]}
              />
              <ReferenceLine y={0} stroke="#000" />
              <Bar
                dataKey="proventos"
                fill="url(#colorUv)"
                stroke="rgba(4, 158, 189)"
                fillOpacity="1"
                strokeWidth="1"
                animationDuration={1500}
                dot={true}
              />
            </BarChart>
          </div>
        </CardContent>
        <CardFooter>
          <h2> </h2>
        </CardFooter>
      </Card>

      <SubTitle>PROVENTOS RECEBIDOS</SubTitle>
      <ListAssets>
        <ul>
          {historicoProventos
            .filter(a => a.v_tipo1 === 'RECEBIDO')
            .map(a => (
              <Day>
                <header>
                  <img
                    src={`https://novopit.clear.com.br/Content/Icons/${a.v_code.replace(
                      /[0-9]/g,
                      ''
                    )}.png`}
                    width="45"
                    height="25"
                    alt=""
                  />
                  <strong>
                    <Link to={`produtos/${a.v_code}`}>{a.v_code}</Link>
                    <span>{a.v_abvname.slice(0, 18)}</span>
                    <b>
                      {a.v_tipo}
                      <time>{a.data_pagamento}</time>
                      <strong>
                        <IntlProvider locale="pt">
                          R$
                          <FormattedNumber
                            value={a.v_valor}
                            currencyDisplay="symbol"
                            currency="BRL"
                          />
                        </IntlProvider>
                      </strong>
                    </b>
                  </strong>
                </header>
              </Day>
            ))}
        </ul>
      </ListAssets>
      <SubTitle>PROVENTOS Á RECEBER</SubTitle>
      <ListAssets>
        <ul>
          {historicoProventos
            .filter(a => a.v_tipo1 === 'RECEBER')
            .map(a => (
              <Day>
                <header>
                  <img
                    src={`https://novopit.clear.com.br/Content/Icons/${a.v_code.replace(
                      /[0-9]/g,
                      ''
                    )}.png`}
                    width="45"
                    height="25"
                    alt=""
                  />
                  <strong>
                    <Link to={`produtos/${a.v_code}`}>{a.v_code}</Link>
                    <span>{a.v_abvname.slice(0, 18)}</span>
                    <b>
                      {a.v_tipo}
                      <time>{a.data_pagamento}</time>
                      <strong>
                        <IntlProvider locale="pt">
                          R$
                          <FormattedNumber
                            value={a.v_valor}
                            currencyDisplay="symbol"
                            currency="BRL"
                          />
                        </IntlProvider>
                      </strong>
                    </b>
                  </strong>
                </header>
              </Day>
            ))}
        </ul>
      </ListAssets>
    </Container>
  );
}
