import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { toast } from 'react-toastify';

import { Container, Card, CardHeader, CardContent, CardFooter } from './styles';

import api from '~/services/api';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatorio'),
  password: Yup.string().required('Senha é obrigatoria!'),
});

export default function CadastroProduto() {
  async function handleSubmit(data, { resetForm }) {
    console.log(data);

    await api.post('/position', {
      data,
    });

    resetForm();
    toast.success('Produto cadastrado com sucesso!');
  }

  function componentDidMount() {
    document.title = 'Cadastro de prodtuos';
  }

  return (
    <>
      <Container>
        <Card width={1300}>
          <CardHeader>
            <h2> Cadastro de produto </h2>
            <div>
              <h3></h3>
            </div>
          </CardHeader>
          <CardContent>
            <Form onSubmit={handleSubmit}>
              <Input name="type" type="hidden" value="Compra"></Input>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <label>Instituição Financeira</label>
                  <Input
                    name="institution"
                    type="text"
                    required
                    placeholder="Nome da sua instituição financeira"
                  ></Input>
                </Grid>
                <Grid item xs={3}>
                  <label>Ativo</label>
                  <Input
                    name="symbol"
                    required
                    type="text"
                    placeholder="Codigo do ativo"
                  ></Input>
                </Grid>
                <Grid item xs={3}>
                  <label>Quantidade</label>
                  <Input
                    name="amount"
                    required
                    type="number"
                    placeholder=""
                  ></Input>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <label>Data da compra</label>
                  <Input
                    name="date"
                    type="date"
                    required
                    placeholder="dd/mm/aaaa"
                  ></Input>
                </Grid>
                <Grid item xs={4}>
                  <label>Preço</label>
                  <Input
                    name="price"
                    type="number"
                    step="0.01"
                    required
                    placeholder="Preço do ativo na data da compra"
                  ></Input>
                </Grid>
                <Grid item xs={4}>
                  <label>Taxas</label>
                  <Input
                    name="price_comission"
                    type="number"
                    step="0.01"
                    value="0"
                    placeholder=""
                  ></Input>
                </Grid>
              </Grid>

              <button type="submit">Cadastrar</button>
            </Form>
          </CardContent>
          <CardFooter>
            <h2> </h2>
          </CardFooter>
        </Card>
      </Container>
    </>
  );
}
