import React, { useState, useEffect, useRef } from 'react';
import { IntlProvider, FormattedNumber } from 'react-intl';
import { ResponsivePieCanvas } from '@nivo/pie';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

import {
  ComposedChart,
  Line,
  Area,
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
  CardInformation,
  CardInformationHeader,
  CardInformationContent,
  BoxDark,
  Percentage,
  PercentageBoxDark,
  ListAssets,
  Day,
  SubTitle,
  Graphs,
  CustomTooltipDiv,
} from './styles';

import api from '~/services/api';

export default function Dashboard() {
  const [resumo, setResumo] = useState([]);
  const [allProfitDay, setAllProfitDay] = useState([]);
  const [allLossDay, setAllLossDay] = useState([]);
  const [dataChartProfitLoss, setDataChartProfitLoss] = useState([]);
  const [positions, setPositions] = useState([]);
  const [ibovespaOn, setIbovespaOn] = useState('ibovespa');

  async function loadResumo() {
    const response = await api.get('/dashboard');

    setResumo(response.data);
  }

  async function loadTop7Profit() {
    const response = await api.get('/profitLossDay');

    setAllProfitDay(response.data.profitArray);
    setAllLossDay(response.data.lossArray);
  }

  async function loadDataChartProfitLoss() {
    const response = await api.get('/dataChartProfitLoss');

    setDataChartProfitLoss(response.data);
  }

  async function loadPositions() {
    const response = await api.get('/dataPiePositions');

    setPositions(response.data);
  }

  useEffect(() => {
    document.title = 'Finan';
    loadResumo();
    loadTop7Profit();
    loadDataChartProfitLoss();
    loadPositions();
  }, []);

  function renderColorfulLegendText(value, entry) {
    const { color } = entry;

    return <span style={{ color, fontSize: 10 }}>{value}</span>;
  }

  const CustomTooltip = ({
    active,
    payload,
    label,
    keyPayload = ['Minha Carteira', 'Ibovespa'],
  }) => {
    if (active) {
      return (
        <CustomTooltipDiv>
          <div className="custom-tooltip">
            <strong>{label}</strong>
            {payload.map((a, i) => (
              <p className="label">
                <strong>{keyPayload[i]}:</strong>
                {`${a.value}`}%
              </p>
            ))}
          </div>
        </CustomTooltipDiv>
      );
    }

    return null;
  };

  const OrangeSwitch = withStyles({
    switchBase: {
      color: '#3498db',
      '&$checked': {
        color: '#3498db',
      },
      '&$checked + $track': {
        backgroundColor: '#3498db',
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const [state, setState] = React.useState({
    checkedIbovespa: true,
  });

  const handleChange = name => event => {
    if (name === 'checkedIbovespa' && event.target.checked == false) {
      setIbovespaOn('');
    } else if (name === 'checkedIbovespa' && event.target.checked) {
      setIbovespaOn('ibovespa');
    }
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <Container>
      <Card width={1300}>
        <CardHeader>
          <h2>Rentabilidade</h2>
          <div>
            <FormGroup row>
              <FormControlLabel
                control={
                  <OrangeSwitch
                    size="small"
                    checked={state.checkedIbovespa}
                    onChange={handleChange('checkedIbovespa')}
                    value="checkedIbovespa"
                  />
                }
                label="IBOVESPA"
              />
            </FormGroup>
          </div>
        </CardHeader>
        <CardContent>
          <ComposedChart
            width={1280}
            height={310}
            data={dataChartProfitLoss}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: -25,
            }}
          >
            <CartesianGrid
              stroke="rgba(0,0,0,0.2)"
              vertical={false}
              strokeDasharray="5 5"
            />
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f39c12" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#f39c12" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              domain={['0', 'auto']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={renderColorfulLegendText}
              verticalAlign="top"
              height={36}
              payload={[
                {
                  id: 'carteira',
                  value: 'Minha carteira',
                  type: 'circle',
                  color: '#f39c12',
                },
                {
                  id: 'ibovespa',
                  value: 'Ibovespa',
                  type: 'circle',
                  color: '#3498db',
                },
              ]}
            />
            <Area
              type="monotone"
              dataKey="carteira"
              fill="url(#colorUv)"
              stroke="#f39c12"
              fillOpacity="0.7"
              strokeWidth="3"
              animationDuration={3500}
              dot={true}
            />
            <Line
              type="monotone"
              dataKey={ibovespaOn}
              stroke="#3498db"
              strokeWidth="1"
              dot={true}
            />
            {/* <Scatter dataKey="cnt" fill="red" /> */}
          </ComposedChart>
        </CardContent>
        <CardFooter>
          <h2></h2>
        </CardFooter>
      </Card>

      <Graphs>
        <div
          style={{
            height: 280,
            width: 520,
            background: 'linear-gradient(#0f1416, #29383f)',
            marginTop: 30,
            borderRadius: 8,
            boxShadow: '9px 10px 30px -10px rgba(0, 0, 0, 0.81)',
          }}
        >
          <ResponsivePieCanvas
            data={positions}
            margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
            pixelRatio={1}
            innerRadius={0.5}
            sortByValue={true}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: 'purple_blue' }}
            borderColor={{ from: 'color', modifiers: [['darker', 0.6]] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#fff"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor={{ from: 'color' }}
            sliceLabel={function(e) {
              return e.value + '%';
            }}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#fff"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            tooltipFormat={function(e) {
              return e.value + '%';
            }}
            tooltip={function(e) {
              return e.createElement({ style: { color: e.color } });
            }}
            defs={[
              {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            legends={[
              {
                anchor: 'right',
                direction: 'column',
                translateX: 140,
                itemWidth: 60,
                itemHeight: 14,
                itemsSpacing: 2,
                symbolSize: 14,
                symbolShape: 'circle',
                itemTextColor: '#ffffff',
              },
            ]}
          />
        </div>
      </Graphs>
    </Container>
  );
}
