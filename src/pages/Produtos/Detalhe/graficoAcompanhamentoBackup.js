<Row>
<Col desktop="12">
  <Card style={{ marginTop: 20 }}>
    <CardHeader>
      <h2>Historico cotações</h2>
      <div>
        <FormGroup row>
          <FormControlLabel
            control={
              <BlueSwitch
                size="small"
                checked={pmOn}
                onChange={handleChange('checkedPm')}
                value="checkedPm"
              />
            }
            label="PREÇO MÉDIO"
          />
          <FormControlLabel
            control={
              <BlueSwitch
                size="small"
                checked={comprasOn}
                onChange={handleChange('checkedCompras')}
                value="checkedCompras"
              />
            }
            label="COMPRAS"
          />
        </FormGroup>
      </div>
    </CardHeader>
    <CardContent>
      <ComposedChart
        width={1240}
        height={350}
        data={dataChartProfitLoss}
        margin={{
          top: 0,
          right: 20,
          bottom: 0,
          left: -25,
        }}
      >
        <CartesianGrid
          stroke="rgba(0,0,0,0.1)"
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
          tickCount={10}
          domain={[
            Math.min.apply(
              Math,
              dataChartProfitLoss.map(function(o) {
                return o.carteira;
              })
            ) - 1,
            Math.max.apply(
              Math,
              dataChartProfitLoss.map(function(o) {
                return o.carteira;
              })
            ) + 1,
          ]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="carteira"
          fill="url(#colorUv)"
          stroke="#f39c12"
          fillOpacity="1"
          strokeWidth="3"
          animationDuration={3500}
          dot={true}
        />

        <ReferenceLine
          y={pmOn === 'pm' ? dadosEmpresa.pm : null}
          className="linha-referencia"
          stroke="#3498db"
          strokeWidth="2"
        />

        {dataChartProfitLoss.map((a, index) => {
          if (a.entrada > 0) {
            return (
              <ReferenceLine
                x={comprasOn === 'compras' ? index : null}
                className="linha-referencia"
                stroke="#3498db"
                strokeWidth="1"
                strokeDasharray="5 5"
              />
            );
          }
        })}
        {dataChartProfitLoss.map((a, index) => {
          if (a.entrada > 0) {
            console.log(comprasOn === 'compras' ? index : null);
            return (
              <ReferenceDot
                x={comprasOn === 'compras' ? index : null}
                y={a.entrada}
                stroke="#3498db"
                fill="#3498db"
                strokeWidth="1"
                label={{
                  position: 'top',
                  value: `Compra á R$ ${a.entrada}`,
                  fill: '#3498db',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}
                r={5}
              />
            );
          }
        })}
      </ComposedChart>
    </CardContent>
    <CardFooter />
  </Card>
</Col>
</Row>