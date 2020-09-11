import React, { useState, useEffect } from 'react';
import { ResponsivePieCanvas } from '@nivo/pie';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  ReferenceLine,
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
  Graphs,
  Produtos,
  Percentage,
  ButtonSort,
  CustomTooltipDiv,
} from './styles';

import { IoIosArrowRoundUp, IoIosArrowRoundDown } from 'react-icons/io';

import api from '~/services/api';

export default function Dashboard() {
  const [positions, setPositions] = useState([]);
  const [setores, setSetores] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentSort, setCurrentSort] = useState();
  const [value, setValue] = React.useState('setor_economico');
  const [valuePatrimonio, setValuePatrimonio] = React.useState('diario');
  const [evolucaoPatrimonio, setEvolucaoPatrimonio] = useState([]);

  const CustomTooltip = ({
    active,
    payload,
    label,
    keyPayload = ['Lucro/Prejuizo'],
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
                    R$ {`${a.value}`}
                  </p>
                ))
              : ''}
          </div>
        </CustomTooltipDiv>
      );
    }

    return null;
  };

  function renderColorfulLegendText(value, entry) {
    const { color } = entry;

    return <span style={{ color, fontSize: 10 }}>{value}</span>;
  }

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
      data = [...products].sort(function(a, b) {
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
      data = [...products].sort(function(a, b) {
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

    setProducts(data);
    setCurrentSort(nextSort);
  }

  async function loadPositions() {
    const response = await api.get('/dataPiePositions');

    setPositions(response.data);
  }

  async function loadEvolucaoPatrimonio(field = 'diario') {
    const response = await api.get('/evolucaoPatrimonio/' + field);

    setEvolucaoPatrimonio(response.data);
  }

  async function loadSetores(field = 'setor_economico') {
    const response = await api.get('/dataPieSetor/' + field);

    setSetores(response.data);
  }

  async function loadProducts() {
    const response = await api.get('/products');

    setProducts(response.data);
  }

  useEffect(() => {
    document.title = 'Finan';
    loadPositions();
    loadProducts();
    loadSetores();
    loadEvolucaoPatrimonio();
  }, []);

  const handleChange = event => {
    setValue(event.target.value);
    loadSetores(event.target.value);
  };

  const handleChangePatrimonio = event => {
    setValuePatrimonio(event.target.value);
    loadEvolucaoPatrimonio(event.target.value);
  };

  return (
    <Container>
      <Card width={1300}>
        <CardHeader>
          <h2> Evolução patrimônio </h2>
          <div>
            <h3></h3>
            <RadioGroup
              aria-label="tipoGraficoPatrimonio"
              name="tipoGraficoPatrimonio"
              value={valuePatrimonio}
              onChange={handleChangePatrimonio}
              row
            >
              <FormControlLabel
                value="diario"
                control={<Radio color="primary" />}
                label="Diario"
                labelPlacement="top"
              />
              <FormControlLabel
                value="mensal"
                control={<Radio color="primary" />}
                label="Mensal"
                labelPlacement="top"
              />
              <FormControlLabel
                value="anual"
                control={<Radio color="primary" />}
                label="Anual"
                labelPlacement="top"
              />
            </RadioGroup>
          </div>
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
              data={evolucaoPatrimonio}
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
                domain={[0, 'dataMax + 2000']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={renderColorfulLegendText}
                verticalAlign="top"
                height={36}
                payload={[
                  {
                    id: 'carteira',
                    value: 'Patrimonio',
                    type: 'circle',
                    color: 'rgba(4, 158, 189)',
                  },
                ]}
              />
              <ReferenceLine y={0} stroke="#000" />
              <Bar
                dataKey="patrimonio"
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
      <Graphs>
        <Card width={700}>
          <CardHeader>
            <h2> Distribuição carteira por ativo </h2>
            <div>
              <h3></h3>
            </div>
          </CardHeader>
          <CardContent>
            <div
              style={{
                height: 280,
                width: 520,
              }}
            >
              <ResponsivePieCanvas
                data={positions}
                margin={{
                  top: 40,
                  right: 200,
                  bottom: 40,
                  left: 80,
                }}
                pixelRatio={1}
                innerRadius={0.5}
                sortByValue={true}
                padAngle={0.7}
                cornerRadius={3}
                colors={{
                  scheme: 'purple_blue',
                }}
                borderColor={{
                  from: 'color',
                  modifiers: [['darker', 0.6]],
                }}
                radialLabelsSkipAngle={10}
                radialLabelsTextXOffset={6}
                radialLabelsTextColor="rgba(0,0,0,0.8)"
                radialLabelsLinkOffset={0}
                radialLabelsLinkDiagonalLength={16}
                radialLabelsLinkHorizontalLength={24}
                radialLabelsLinkStrokeWidth={1}
                radialLabelsLinkColor={{
                  from: 'color',
                }}
                sliceLabel={function(e) {
                  return e.value + '%';
                }}
                slicesLabelsSkipAngle={10}
                slicesLabelsTextColor="rgba(0,0,0,0.7)"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                tooltipFormat={function(e) {
                  return e.value + '%';
                }}
                tooltip={function(e) {
                  return e.createElement({
                    style: {
                      color: e.color,
                    },
                  });
                }}
                defs={[
                  {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(0,0,0,0.6)',
                    size: 4,
                    padding: 1,
                    stagger: true,
                  },
                  {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(0,0,0,0.6)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                  },
                ]}
                legends={[
                  {
                    anchor: 'right',
                    direction: 'column',
                    translateX: 200,
                    itemWidth: 60,
                    itemHeight: 14,
                    itemsSpacing: 2,
                    symbolSize: 14,
                    symbolShape: 'circle',
                    itemTextColor: 'rgba(0,0,0,0.6)',
                  },
                ]}
              />
            </div>
          </CardContent>
          <CardFooter>
            <h2> </h2>
          </CardFooter>
        </Card>
        <Card width={700}>
          <CardHeader>
            <h2> Distribuição carteira por setor </h2>
            <div>
              <h3></h3>
              <RadioGroup
                aria-label="position"
                name="position"
                value={value}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="setor_economico"
                  control={<Radio color="primary" />}
                  label="Setor Econômico"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="subsetor"
                  control={<Radio color="primary" />}
                  label="Subsetor"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="segmento"
                  control={<Radio color="primary" />}
                  label="Segmento"
                  labelPlacement="top"
                />
              </RadioGroup>
            </div>
          </CardHeader>
          <CardContent>
            <div
              style={{
                height: 267,
                width: 520,
              }}
            >
              <ResponsivePieCanvas
                data={setores}
                margin={{
                  top: 40,
                  right: 60,
                  bottom: 40,
                  left: 80,
                }}
                pixelRatio={1}
                innerRadius={0.5}
                sortByValue={true}
                padAngle={0.7}
                cornerRadius={3}
                colors={{
                  scheme: 'oranges',
                }}
                borderColor={{
                  from: 'color',
                  modifiers: [['darker', 0.6]],
                }}
                radialLabelsSkipAngle={10}
                radialLabelsTextXOffset={6}
                radialLabelsTextColor="rgba(0,0,0,0.8)"
                radialLabelsLinkOffset={0}
                radialLabelsLinkDiagonalLength={16}
                radialLabelsLinkHorizontalLength={24}
                radialLabelsLinkStrokeWidth={1}
                radialLabelsLinkColor={{
                  from: 'color',
                }}
                sliceLabel={function(e) {
                  return e.value + '%';
                }}
                slicesLabelsSkipAngle={10}
                slicesLabelsTextColor="#000"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                tooltipFormat={function(e) {
                  return e.value + '%';
                }}
                tooltip={function(e) {
                  return e.createElement({
                    style: {
                      color: e.color,
                    },
                  });
                }}
                defs={[
                  {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(0,0,0,0.6)',
                    size: 4,
                    padding: 1,
                    stagger: true,
                  },
                  {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(0,0,0,0.6)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                  },
                ]}
                legends={[
                  {
                    anchor: 'right',
                    direction: 'column',
                    translateX: 200,
                    itemWidth: 60,
                    itemHeight: 14,
                    itemsSpacing: 2,
                    symbolSize: 14,
                    symbolShape: 'circle',
                    itemTextColor: 'rgba(0,0,0,0.6)',
                  },
                ]}
              />
            </div>
          </CardContent>
          <CardFooter>
            <h2> </h2>
          </CardFooter>
        </Card>
      </Graphs>
      <Produtos width={1300}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Codigo</th>
              <th>Nome</th>
              <th>
                Posições
                <ButtonSort onClick={onSortChange} data-field="posicoes">
                  <IoIosArrowRoundUp size={20} style={{ paddingTop: 6 }} />
                </ButtonSort>
              </th>
              <th>
                Preço de compra
                <ButtonSort onClick={onSortChange} data-field="preco">
                  <IoIosArrowRoundUp size={20} style={{ paddingTop: 6 }} />
                </ButtonSort>
              </th>
              <th>
                Preço médio
                <ButtonSort onClick={onSortChange} data-field="preco_medio">
                  <IoIosArrowRoundUp size={20} style={{ paddingTop: 6 }} />
                </ButtonSort>
              </th>
              <th>
                Preço atual
                <ButtonSort onClick={onSortChange} data-field="preco_atual">
                  <IoIosArrowRoundUp size={20} style={{ paddingTop: 6 }} />
                </ButtonSort>
              </th>
              <th>
                Valor total
                <ButtonSort onClick={onSortChange} data-field="vlr_total">
                  <IoIosArrowRoundUp size={20} style={{ paddingTop: 6 }} />
                </ButtonSort>
              </th>
              <th>
                Rent. Diaria
                <ButtonSort
                  onClick={onSortChange}
                  data-field="rentabilidade_diaria"
                >
                  <IoIosArrowRoundUp size={20} style={{ paddingTop: 6 }} />
                </ButtonSort>
              </th>
              <th>
                Rent. Diaria %
                <ButtonSort
                  onClick={onSortChange}
                  data-field="rentabilidade_percent_diaria"
                >
                  <IoIosArrowRoundUp size={20} style={{ paddingTop: 6 }} />
                </ButtonSort>
              </th>
              <th>
                Rent. Total
                <ButtonSort
                  onClick={onSortChange}
                  data-field="rentabilidade_total"
                >
                  <IoIosArrowRoundUp size={20} style={{ paddingTop: 6 }} />
                </ButtonSort>
              </th>
              <th>
                Rent. Total %
                <ButtonSort
                  onClick={onSortChange}
                  data-field="rentabilidade_percent_total"
                >
                  <IoIosArrowRoundUp size={20} style={{ paddingTop: 6 }} />
                </ButtonSort>
              </th>
              <th>
                Nota
                <ButtonSort onClick={onSortChange} data-field="nota">
                  <IoIosArrowRoundUp size={20} style={{ paddingTop: 6 }} />
                </ButtonSort>
              </th>
              <th>
                IFR 14 (DIA)
                <ButtonSort onClick={onSortChange} data-field="ifr">
                  <IoIosArrowRoundUp size={20} style={{ paddingTop: 6 }} />
                </ButtonSort>
              </th>
              <th>
                IFR 14 (SEM)
                <ButtonSort onClick={onSortChange} data-field="ifr_week">
                  <IoIosArrowRoundUp size={20} style={{ paddingTop: 6 }} />
                </ButtonSort>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map(a => (
              <tr>
                <td>
                  <img
                    src={`https://novopit.clear.com.br/Content/Icons/${a.codigo.replace(
                      /[0-9]/g,
                      ''
                    )}.png`}
                    width="35"
                    height="20"
                    alt=""
                    style={{
                      borderLeft: '3px solid rgba(243, 156, 18, 1)',
                      paddingLeft: 6,
                    }}
                  />
                </td>
                <td
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    textDecoration: 'none',
                  }}
                >
                  <Link
                    to={`produtos/${a.codigo}`}
                    style={{
                      textDecoration: 'none',
                      color: 'rgba(0, 0, 0, 0.6)',
                    }}
                  >
                    {a.codigo}
                  </Link>
                </td>
                <td style={{ fontSize: 11 }}>{a.nome}</td>
                <td>{a.posicoes}</td>
                <td>R$ {a.preco}</td>
                <td>R$ {a.preco_medio}</td>
                <td>R$ {a.preco_atual}</td>
                <td>R$ {a.vlr_total.toFixed(2)}</td>
                <td>
                  <Percentage isNegative={a.rentabilidade_diaria < 0}>
                    R$ {a.rentabilidade_diaria}
                  </Percentage>
                </td>
                <td>
                  <Percentage isNegative={a.rentabilidade_percent_diaria < 0}>
                    {a.rentabilidade_percent_diaria > 0 ? '+' : ''}
                    {a.rentabilidade_percent_diaria}%
                    {a.rentabilidade_percent_diaria > 0 ? (
                      <IoIosArrowRoundUp size={20} style={{ paddingTop: 6 }} />
                    ) : (
                      <IoIosArrowRoundDown
                        size={20}
                        style={{ paddingTop: 6 }}
                      />
                    )}
                  </Percentage>
                </td>
                <td>
                  <Percentage isNegative={a.rentabilidade_total < 0}>
                    R$ {a.rentabilidade_total.toFixed(2)}{' '}
                  </Percentage>
                </td>
                <td>
                  <Percentage isNegative={a.rentabilidade_percent_total < 0}>
                    {a.rentabilidade_percent_total > 0 ? '+' : ''}
                    {a.rentabilidade_percent_total.toFixed(2)}%
                    {a.rentabilidade_percent_total > 0 ? (
                      <IoIosArrowRoundUp size={20} style={{ paddingTop: 6 }} />
                    ) : (
                      <IoIosArrowRoundDown
                        size={20}
                        style={{ paddingTop: 6 }}
                      />
                    )}
                  </Percentage>
                </td>
                <td>{a.nota}</td>
                <td>{a.ifr}</td>
                <td>{a.ifr_week}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Produtos>
    </Container>
  );
}
