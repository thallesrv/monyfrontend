import React, { useState, useEffect } from 'react';
import { IntlProvider, FormattedNumber } from 'react-intl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { MdInfo, MdEdit, MdClear } from 'react-icons/md';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { purple } from '@material-ui/core/colors';
import { darken } from 'polished';
import Parser from 'rss-parser';
import {
  IoIosArrowRoundUp,
  IoIosArrowRoundDown,
  IoMdAddCircle,
} from 'react-icons/io';
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ReferenceDot,
} from 'recharts';
import {
  ContainerAll,
  Card,
  CardInformation,
  CardInformationContent,
  CardHeader,
  CardContent,
  CardFooter,
  CustomTooltipDiv,
  BoxOrange,
  BoxDark,
  PercentageBoxDark,
  SubTitle,
  Notas,
  NotasItems,
  FormCard,
  BadgeCategoria,
  News,
} from './styles';
import { Container, Row, Col } from '../../../components/Grid';
import { Form, Input, Select } from '@rocketseat/unform';
import ReactApexCharts from 'react-apexcharts';

import { toast } from 'react-toastify';

import api from '~/services/api';

const options = [
  { id: 'Geral', title: 'Geral' },
  { id: 'Resultados', title: 'Resultados' },
  { id: 'Noticias', title: 'Noticias' },
];

const colorCategoria = [
  { id: 'Geral', color: '##9b59b6' },
  { id: 'Resultados', color: '#3498db' },
  { id: 'Noticias', color: '#f39c12' },
];

export default function DetalheProduto(props) {
  const useStyles = makeStyles(theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();
  const [dataChartProfitLoss, setDataChartProfitLoss] = useState([]);
  const [dataIfrChart, setDataIfrChart] = useState([]);
  const [tempoGrafico, setTempoGrafico] = useState('1');
  const [tipoDoGrafico, setTipoDoGrafico] = useState('semanal');
  const [seriesIfrChart, setSeriesIfrChart] = useState([]);
  const [dataChartCandle, setDataChartCandle] = useState([]);
  const [dataChartCandleSuporteResistencia, setDataChartCandleSuporteResistencia] = useState([]);
  const [compras, setCompras] = useState([]);
  const [comprasOn, setComprasOn] = useState();
  const [pmOn, setPmOn] = useState();
  const [dadosEmpresa, setDadosEmpresa] = useState([]);
  const [top6Fundamentos, setTop6Fundamentos] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openClear, setOpenClear] = React.useState(false);
  const [apontamentos, setApontamentos] = useState([]);
  const [idClear, setIdClear] = useState();
  const [news, setNews] = useState([]);

  const handleOpenClear = id => {
    setIdClear(id);
    setOpenClear(true);
  };

  const handleCloseClear = () => {
    setIdClear(0);
    setOpenClear(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function loadApontamentos() {
    const response = await api.get('/apontamentos/' + props.match.params.code);

    setApontamentos(response.data);
  }

  async function deleteApontamento(id) {
    const response = await api.delete('/apontamentos/' + id);

    toast.success('Apontamento excluido com sucesso!');

    loadApontamentos();
    handleCloseClear();
  }

  async function loadDadosEmpresa() {
    const response = await api.get('/dadosEmpresa/' + props.match.params.code);

    setDadosEmpresa(response.data[0]);
  }

  async function loadTop6Fundamentos() {
    const response = await api.get(
      '/top6Fundamentos/' + props.match.params.code
    );

    setTop6Fundamentos(response.data[0]);
  }

  async function loadDataChartProfitLoss() {
    const response = await api.get(
      '/dataChartQuotation/' + props.match.params.code + '/diario/'+tempoGrafico
    );

    setCompras(
      response.data.filter(a => {
        return a.entrada > 0;
      })
    );

    setDataChartProfitLoss(response.data);
  }

  async function loadDataIfrChart() {
    var url = 'dataIfrChart';
    if(tipoDoGrafico === 'semanal'){
      url = 'dataIfrChartWeek';
    }
    const response = await api.get(
      '/'+url+'/' + props.match.params.code + '/diario/'+tempoGrafico
    );

    var data = [];
    var series = [];

    for (var i = 0; i < response.data.length; i++) {
      data.push(response.data[i].carteira);
      series.push(response.data[i].name);
    }  

    setSeriesIfrChart(series);
    setDataIfrChart(data);
  }

  async function loadDataChartCandle() {
    var rota = 'dataChartQuotationCandle';
    if(tipoDoGrafico === 'semanal'){
      rota = 'dataChartQuotationCandleWeek';
    }
    const response = await api.get(
      '/'+rota+'/' + props.match.params.code + '/diario/'+tempoGrafico
    );

    var data = [];

    var suporteResistencia = [];

    var suporte = [];
    var resistencia = [];

    for (var i = 0; i < response.data.length; i++) {
      if(response.data[i].suporte_fractal == 'suporte'){
        suporte.push(response.data[i].fechamento);
      }

      if(response.data[i].resistencia_fractal == 'resistencia'){
        resistencia.push(response.data[i].fechamento);
      }
    }

        suporteResistencia.push({
          y: Math.min(...suporte),
          borderColor: '#00E396',
          strokeDashArray: 0,
          label: {
            borderColor: '#00E396',
            style: {
              color: '#fff',
              background: '#00E396',
            },
            text: 'Suporte R$ '+Math.min(...suporte),
          }
        });

      
        suporteResistencia.push({
          y: Math.max(...resistencia),
          borderColor: '#e74c3c',
          strokeDashArray: 0,
          label: {
            borderColor: '#e74c3c',
            style: {
              color: '#fff',
              background: '#e74c3c',
            },
            text: 'Resistência R$ '+Math.max(...resistencia),
          }
        });

    

    for (var i = 0; i < response.data.length; i++) {
      // if(response.data[i].fechamento == response.data[i].ultimo_valor){
      //   suporteResistencia.push({
      //     y: response.data[i].fechamento,
      //     borderColor: '#3498db',
      //     label: {
      //       borderColor: '#3498db',
      //       style: {
      //         color: '#fff',
      //         background: '#3498db',
      //       },
      //       text: 'Valor R$'+response.data[i].fechamento,
      //     }
      //   },);
      // }

      data.push({
            x: response.data[i].dt_cota,
            y: [response.data[i].abertura, response.data[i].maximo, response.data[i].minimo, response.data[i].fechamento]
        });
    }  

    setDataChartCandle(data);
    setDataChartCandleSuporteResistencia(suporteResistencia);
  }

  async function loadNews() {
    const parser = new Parser();
    (async () => {
      const feed = await parser.parseURL(
        `https://cors-anywhere.herokuapp.com/https://news.google.com/rss/search?q=${props.match.params.code}&hl=pt-BR&gl=BR&ceid=BR:pt-419`
      );
      let dados = [];
      feed.items.forEach((item, index) => {
        let n = {
          titulo: item.title,
          link: item.link,
          dataPublicacao: item.pubDate,
        };
        dados.push(n);
      });

      dados.sort(function(a, b) {
        return (
          new Date(Date.parse(b.dataPublicacao)) -
          new Date(Date.parse(a.dataPublicacao))
        );
      });

      setNews(dados.filter((a, index) => index < 5));
    })();
  }

  useEffect(() => {
    document.title = 'Finan';

    loadNews();
    loadDataChartCandle();
    loadDadosEmpresa();
    loadTop6Fundamentos();
    loadApontamentos();
    loadDataIfrChart();
    

  }, []);

  useEffect(() => {
    loadDataChartCandle();
    loadDataIfrChart();
    
  }, [tempoGrafico, tipoDoGrafico]);

  function renderColorfulLegendText(value, entry) {
    const { color } = entry;

    return <span style={{ color, fontSize: 10 }}>{value}</span>;
  }

  const CustomTooltip = ({
    active,
    payload,
    label,
    keyPayload = ['Ativo', 'Entrada'],
  }) => {
    if (active) {
      return (
        <CustomTooltipDiv>
          <div className="custom-tooltip">
            <strong>{label}</strong>
            {payload
              ? payload.map((a, i) => (
                  <p className="label">R$ {`${a.value}`}</p>
                ))
              : ''}
          </div>
        </CustomTooltipDiv>
      );
    }

    return null;
  };

  const BlueSwitch = withStyles({
    switchBase: {
      color: '#f39c12',
      '&$checked': {
        color: '#f39c12',
      },
      '&$checked + $track': {
        backgroundColor: '#f39c12',
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const PurpleSwitch = withStyles({
    switchBase: {
      color: purple[300],
      '&$checked': {
        color: purple[500],
      },
      '&$checked + $track': {
        backgroundColor: purple[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const handleChange = name => event => {
    if (name === 'checkedCompras' && event.target.checked == false) {
      setComprasOn('');
    } else if (name === 'checkedCompras' && event.target.checked) {
      setComprasOn('compras');
    } else if (name === 'checkedPm' && event.target.checked == false) {
      setPmOn('');
    } else if (name === 'checkedPm' && event.target.checked) {
      setPmOn('pm');
    }
  };

  const handleChangeTempoGrafico = (event) => {
    setTempoGrafico(event.target.value);
  };

  const handleChangeTipoGraficoS = () => {
    setTipoDoGrafico('semanal');
  };

  const handleChangeTipoGraficoD = () => {
    setTipoDoGrafico('diario');
  };

 

  async function handleSubmit(data, { resetForm }) {
    await api.post('/apontamentos', {
      data,
    });

    resetForm();
    toast.success('Apontamento cadastrado com sucesso!');
    loadApontamentos();
    handleClose();
  }

  return (
    <ContainerAll>
      <Container>
        <Row>
          <Col desktop="6">
            <Card style={{ minHeight: 210 }}>
              <CardContent style={{ paddingTop: 0 }}>
                <Row style={{ marginTop: 0 }}>
                  <Col
                    desktop="5"
                    style={{
                      display: 'block',
                      textAlign: 'left',
                      marginTop: 0,
                    }}
                  >
                    <img
                      src={`https://novopit.clear.com.br/Content/Icons/${props.match.params.code.replace(
                        /[0-9]/g,
                        ''
                      )}.png`}
                      height="30"
                      alt=""
                    />
                    <h3>{props.match.params.code}</h3>
                    <span>{dadosEmpresa.company_name}</span>
                    <p></p>
                    <div>
                      <strong>SETOR</strong>
                      <p>{dadosEmpresa.setor}</p>
                    </div>
                    <div>
                      <strong>SUBSETOR</strong>
                      <p>{dadosEmpresa.seg}</p>
                    </div>
                    <div>
                      <strong>NOTA DA EMPRESA (APONTAMENTOS)</strong>
                      <p style={{ fontSize: 15, fontWeight: 'bold' }}>
                        {apontamentos
                          .reduce((sum, apontamento) => {
                            return (
                              (sum + apontamento.nota) / apontamentos.length
                            );
                          }, 0)
                          .toFixed(0)}
                      </p>
                    </div>
                  </Col>
                  <Col desktop="7">
                    <Row style={{ marginTop: 0, float: 'none' }}>
                      <Col desktop="6" style={{ marginTop: 0 }}>
                        <BoxOrange>
                          <h5>INVESTIDO</h5>
                          <h2>
                            <IntlProvider locale="pt">
                              R$
                              <FormattedNumber
                                value={dadosEmpresa.totalinvestido}
                                currencyDisplay="symbol"
                                currency="BRL"
                              />
                            </IntlProvider>
                          </h2>
                        </BoxOrange>
                      </Col>
                      <Col desktop="6" style={{ marginTop: 0 }}>
                        <BoxOrange>
                          <h5>PATRIMONIO</h5>
                          <h2>
                            <IntlProvider locale="pt">
                              R$
                              <FormattedNumber
                                value={dadosEmpresa.totalpatrimonio}
                                currencyDisplay="symbol"
                                currency="BRL"
                              />
                            </IntlProvider>
                          </h2>
                        </BoxOrange>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 0, float: 'none' }}>
                      <Col desktop="4" style={{ marginTop: 0 }}>
                        <BoxDark>
                          <h5 style={{ fontSize: 9 }}>COTACAO ATUAL</h5>
                          <h2>
                            <IntlProvider locale="pt">
                              R$
                              <FormattedNumber
                                value={dadosEmpresa.cotacao_atual}
                                currencyDisplay="symbol"
                                currency="BRL"
                              />
                            </IntlProvider>
                            <PercentageBoxDark
                              style={{ color: 'rgba(255,255,255,0.5)' }}
                            >
                              PM - R${dadosEmpresa.pm}
                            </PercentageBoxDark>
                          </h2>
                        </BoxDark>
                      </Col>
                      <Col desktop="4" style={{ marginTop: 0 }}>
                        <BoxDark>
                          <h5 style={{ fontSize: 9 }}>LUCRO DIARIO</h5>
                          <h2>
                            <IntlProvider locale="pt">
                              R$
                              <FormattedNumber
                                value={dadosEmpresa.valorlucroprejuizodiario}
                                currencyDisplay="symbol"
                                currency="BRL"
                              />
                            </IntlProvider>
                            <PercentageBoxDark
                              isNegative={dadosEmpresa.lucroprejuizodiario <= 0}
                            >
                              {dadosEmpresa.lucroprejuizodiario}%
                              {dadosEmpresa.lucroprejuizodiario < 0 ? (
                                <IoIosArrowRoundDown size={12} />
                              ) : (
                                <IoIosArrowRoundUp size={12} />
                              )}
                            </PercentageBoxDark>
                          </h2>
                        </BoxDark>
                      </Col>
                      <Col desktop="4" style={{ marginTop: 0 }}>
                        <BoxDark>
                          <h5 style={{ fontSize: 9 }}>LUCRO TOTAL</h5>
                          <h2>
                            <IntlProvider locale="pt">
                              R$
                              <FormattedNumber
                                value={dadosEmpresa.valorlucroprejuizototal}
                                currencyDisplay="symbol"
                                currency="BRL"
                              />
                            </IntlProvider>
                            <PercentageBoxDark
                              isNegative={dadosEmpresa.lucroprejuizototal <= 0}
                            >
                              {dadosEmpresa.lucroprejuizototal}%
                              {dadosEmpresa.lucroprejuizototal < 0 ? (
                                <IoIosArrowRoundDown size={12} />
                              ) : (
                                <IoIosArrowRoundUp size={12} />
                              )}
                            </PercentageBoxDark>
                          </h2>
                        </BoxDark>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 0, float: 'none' }}>
                      <Col desktop="4" style={{ marginTop: 0 }}>
                        <BoxDark>
                          <h5 style={{ fontSize: 9 }}>% CARTEIRA</h5>
                          <h2>{dadosEmpresa.participacaocarteira} %</h2>
                        </BoxDark>
                      </Col>
                      <Col desktop="4" style={{ marginTop: 0 }}>
                        <BoxDark>
                          <h5 style={{ fontSize: 9 }}>% IBOVESPA</h5>
                          <h2>{dadosEmpresa.participacaoibovespa} %</h2>
                        </BoxDark>
                      </Col>
                      <Col desktop="4" style={{ marginTop: 0 }}>
                        <BoxDark>
                          <h5 style={{ fontSize: 9 }}>PROVENTOS</h5>
                          <h2>
                            R${dadosEmpresa.v_recebido}
                            <PercentageBoxDark>
                              {(
                                (dadosEmpresa.v_recebido /
                                  dadosEmpresa.totalinvestido) *
                                100
                              ).toFixed(2)}
                              %
                            </PercentageBoxDark>
                          </h2>
                        </BoxDark>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardContent>
            </Card>
          </Col>
          <Col desktop="6">
            <CardInformation>
              {/* <CardInformationHeader>
          <h2>INFO</h2>
        </CardInformationHeader> */}
              <CardInformationContent>
                <Container>
                  <Row>
                    <Col desktop="4" className="col">
                      <span>
                        ROE <MdInfo size={18} color={'rgba(0, 0, 0, 0.5)'} />
                      </span>
                      <h3>{top6Fundamentos.roe}</h3>
                      <article>
                        <h4>
                          <span>
                            Media do setor (
                            {String(top6Fundamentos.segmento).length > 20
                              ? String(top6Fundamentos.segmento).substring(
                                  0,
                                  17
                                ) + '...'
                              : top6Fundamentos.segmento}
                            )
                          </span>
                          {top6Fundamentos.roe_avg}
                        </h4>
                      </article>
                    </Col>
                    <Col desktop="4" className="col">
                      <span>
                        P/L <MdInfo size={18} color={'rgba(0, 0, 0, 0.5)'} />
                      </span>
                      <h3>{top6Fundamentos.pl}</h3>
                      <article>
                        <h4>
                          <span>
                            Media do setor (
                            {String(top6Fundamentos.segmento).length > 20
                              ? String(top6Fundamentos.segmento).substring(
                                  0,
                                  17
                                ) + '...'
                              : top6Fundamentos.segmento}
                            )
                          </span>
                          {top6Fundamentos.pl_avg}
                        </h4>
                      </article>
                    </Col>
                    <Col desktop="4" className="col">
                      <span>
                        Yield <MdInfo size={18} color={'rgba(0, 0, 0, 0.5)'} />
                      </span>
                      <h3>{top6Fundamentos.div_yield}</h3>
                      <article>
                        <h4>
                          <span>
                            Media do setor (
                            {String(top6Fundamentos.segmento).length > 20
                              ? String(top6Fundamentos.segmento).substring(
                                  0,
                                  17
                                ) + '...'
                              : top6Fundamentos.segmento}
                            )
                          </span>
                          {top6Fundamentos.div_yield_avg}
                        </h4>
                      </article>
                    </Col>
                  </Row>
                  <Row>
                    <Col desktop="4" className="col">
                      <span>
                        P/VPA <MdInfo size={18} color={'rgba(0, 0, 0, 0.5)'} />
                      </span>
                      <h3>{top6Fundamentos.p_vpa}</h3>
                      <article>
                        <h4>
                          <span>
                            Media do setor (
                            {String(top6Fundamentos.segmento).length > 20
                              ? String(top6Fundamentos.segmento).substring(
                                  0,
                                  17
                                ) + '...'
                              : top6Fundamentos.segmento}
                            )
                          </span>
                          {top6Fundamentos.p_vpa_avg}
                        </h4>
                      </article>
                    </Col>
                    <Col desktop="4" className="col">
                      <span>
                        EV/EBTIDA{' '}
                        <MdInfo size={18} color={'rgba(0, 0, 0, 0.5)'} />
                      </span>
                      <h3>{top6Fundamentos.ev_ebitda}</h3>
                      <article>
                        <h4>
                          <span>
                            Media do setor (
                            {String(top6Fundamentos.segmento).length > 20
                              ? String(top6Fundamentos.segmento).substring(
                                  0,
                                  17
                                ) + '...'
                              : top6Fundamentos.segmento}
                            )
                          </span>
                          {top6Fundamentos.ev_ebitda_avg}
                        </h4>
                      </article>
                    </Col>
                    <Col desktop="4" className="col">
                      <span>
                        DB/PL <MdInfo size={18} color={'rgba(0, 0, 0, 0.5)'} />
                      </span>
                      <h3>{top6Fundamentos.db_pl}</h3>
                      <article>
                        <h4>
                          <span>
                            Media do setor (
                            {String(top6Fundamentos.segmento).length > 20
                              ? String(top6Fundamentos.segmento).substring(
                                  0,
                                  17
                                ) + '...'
                              : top6Fundamentos.segmento}
                            )
                          </span>
                          {top6Fundamentos.db_pl_avg}
                        </h4>
                      </article>
                    </Col>
                  </Row>
                </Container>
              </CardInformationContent>
            </CardInformation>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col desktop="12">
            <Card style={{ marginTop: 20 }}>
            <CardHeader>
                <h2>Historico cotações</h2>
                <div style={{display:'flex', marginTop:3}}>
                  <div style={{marginRight:13}}>
                    <ButtonGroup disableElevation variant="contained" color="orange">
                      <Button style={{backgroundColor:'#29383f', color:'#f39c12'}} onClick={handleChangeTipoGraficoS}>Semanal</Button>
                      <Button style={{backgroundColor:'#29383f', color:'#f39c12'}} onClick={handleChangeTipoGraficoD}>Diario</Button>
                    </ButtonGroup>
                  </div>
                  <div>
                    <RadioGroup row aria-label="position" name="position" defaultValue="top">
                        <FormControlLabel
                          value="top"
                          control={<Radio
                            checked={tempoGrafico === '1'}
                            onChange={handleChangeTempoGrafico}
                            value="1"
                            name="radio-button-demo"
                          />}
                          label="1 M"
                          labelPlacement="top"
                          style={{marginRight:0,marginLeft:0,}}
                        />
                      
                      <FormControlLabel
                          value="top"
                          control={<Radio
                            checked={tempoGrafico === '6'}
                            onChange={handleChangeTempoGrafico}
                            value="6"
                            name="radio-button-demo"
                          />}
                          label="6 M"
                          labelPlacement="top"
                          style={{marginRight:0,marginLeft:0,}}
                        />

                        <FormControlLabel
                          value="top"
                          control={<Radio
                            checked={tempoGrafico === '12'}
                            onChange={handleChangeTempoGrafico}
                            value="12"
                            name="radio-button-demo"
                          />}
                          label="1 A"
                          labelPlacement="top"
                          style={{marginLeft:0,}}
                        />
                    </RadioGroup>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ReactApexCharts options={{
                xaxis: {
                  categories: seriesIfrChart
                      },
                annotations: {
                yaxis: dataChartCandleSuporteResistencia},chart: {
                  toolbar: {
                    show: false,
                  },
                  events: {
                    selection: function(chartContext, { xaxis, yaxis }) {
                       console.log(chartContext);
                       console.log(xaxis);
                       console.log(yaxis);
                    }
                  },
                  zoom: {
                    enabled: false,
                  }
                }}} series={[{
              name: 'candle',
              data: dataChartCandle }]} type="candlestick" width={1250} height={400} />

              </CardContent>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col desktop="12">
            <Card style={{ marginTop: 20 }}>
              <CardHeader>
                <h2>IFR</h2>
              </CardHeader>
              <CardContent>
              <ReactApexCharts options={
              {
                xaxis: {
                  categories: seriesIfrChart
                      },
                annotations: {
                yaxis: [ {
                  y: 70,
                  y2: 100,
                  borderColor: '#000',
                  fillColor: '#2ecc71',
                  opacity: 0.3,
                  label: {
                    borderColor: '#333',
                    style: {
                      fontSize: '9px',
                      color: '#333',
                      background: '#2ecc71',
                    },
                    text: 'FAIXA DOS 70',
                  }
                },{
                  y: 40,
                  y2: 0,
                  borderColor: '#000',
                  fillColor: '#FEB019',
                  opacity: 0.3,
                  label: {
                    borderColor: '#333',
                    style: {
                      fontSize: '9px',
                      color: '#333',
                      background: '#FEB019',
                    },
                    text: 'FAIXA DOS 40',
                  }
                }]},yaxis: { max: 100, min:0}}} series={[{
              name: 'IFR 14',
              data: dataIfrChart}]} type="line" width={1250} height={250} />
              </CardContent>
              <CardFooter />
            </Card>
          </Col>
        </Row>

        <Row>
          <SubTitle>
            APONTAMENTOS
            <IoMdAddCircle onClick={handleOpen} size={25} color={'#fff'} />
          </SubTitle>
        </Row>
        <Row>
          <Notas style={{ marginTop: 20, height: 50 }}>
            <table>
              <thead>
                <tr>
                  <th width="65%">Apontamento</th>
                  <th width="9%">Data</th>
                  <th width="9%">Categoria</th>
                  <th width="8%">Nota</th>
                  <th width="5%"></th>
                </tr>
              </thead>
            </table>
          </Notas>

          <NotasItems style={{ marginTop: 10 }}>
            <table>
              {apontamentos.map(a => (
                <tr>
                  <td width="70%">{a.name}</td>
                  <td width="10%">
                    {new Date(
                      Date.parse(a.data_apontamento)
                    ).toLocaleDateString()}
                  </td>
                  <td width="10%">
                    <BadgeCategoria
                      color={
                        colorCategoria.filter(color => {
                          return color.id === a.categoria;
                        })[0].color
                      }
                    >
                      {a.categoria}
                    </BadgeCategoria>
                  </td>
                  <td width="5%">
                    <span
                      style={{
                        background: darken(
                          `${a.nota / 35}`,
                          'rgba(13, 152, 181,1)'
                        ),
                        padding: 10,
                        color: 'rgba(0, 212, 255, 1)',
                        fontWeight: 'bold',
                        borderRadius: 10,
                        boxShadow: '7px 8px 20px -8px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      {a.nota}
                    </span>
                  </td>
                  <td width="5%" style={{ display: 'flex' }}>
                    <span
                      style={{
                        background: '#2980b9',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        marginLeft: 10,
                        marginRight: 3,
                        padding: 7,
                        borderRadius: 50,
                      }}
                    >
                      <MdEdit
                        style={{ cursor: 'pointer' }}
                        size={15}
                        color={'#fff'}
                      />
                    </span>
                    <span
                      style={{
                        background: '#e74c3c',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        padding: 7,
                        borderRadius: 50,
                      }}
                    >
                      <MdClear
                        onClick={() => handleOpenClear(a.id)}
                        size={15}
                        style={{ cursor: 'pointer' }}
                        color={'#fff'}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </table>
          </NotasItems>
        </Row>

        <Row>
          <SubTitle>NOTICIAS RECENTES</SubTitle>
        </Row>
        <Row>
          {news.map(a => (
            <News>
              {a.titulo}{' '}
              <strong>
                <a href={a.link} target="_blank">
                  Ler mais
                </a>
              </strong>
              <span>
                {new Date(Date.parse(a.dataPublicacao)).toLocaleDateString()}
              </span>
            </News>
          ))}
        </Row>
      </Container>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <FormCard>
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Cadastro de apontamentos</h2>
              <Form onSubmit={handleSubmit}>
                <Input
                  name="symbol"
                  type="hidden"
                  value={props.match.params.code}
                ></Input>
                <Row>
                  <Col desktop={12}>
                    <label>Apontamento</label>
                    <Input
                      name="name"
                      type="text"
                      required
                      placeholder="Descreva seu apontamento Ex: Divulgação de resultados mais recente "
                    ></Input>
                  </Col>
                </Row>
                <Row>
                  <Col desktop={4}>
                    <label>Data do apontamento</label>
                    <Input
                      name="data_apontamento"
                      type="date"
                      required
                      placeholder="dd/mm/aaaa"
                    ></Input>
                  </Col>
                  <Col desktop={4}>
                    <label>Nota</label>
                    <Input
                      name="nota"
                      type="number"
                      max="10"
                      min="0"
                      required
                      placeholder="Nota sobre o apontamento de 0 á 10"
                    ></Input>
                  </Col>
                  <Col desktop={4}>
                    <label>Categoria</label>
                    <Select
                      name="categoria"
                      options={options}
                      getOptionValue={option => option.id}
                      getOptionLabel={option => option.title}
                      menuPlacement="auto"
                    />
                  </Col>
                </Row>

                <button type="submit">Cadastrar</button>
              </Form>
            </div>
          </Fade>
        </FormCard>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openClear}
        onClose={handleCloseClear}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <FormCard>
          <Fade in={openClear}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Excluir apontamento</h2>
              <p>Tem certeza que quer excluir esse apontamento? </p>
              <button onClick={() => deleteApontamento(idClear)}>Sim</button>
            </div>
          </Fade>
        </FormCard>
      </Modal>
    </ContainerAll>
  );
}
