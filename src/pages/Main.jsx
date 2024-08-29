import Card from '../components/Card/Card';
import style from './Main.module.css';
import ListaContas from "../components/ListaContas/ListaContas";
import { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/UserContext';
import Actionbar from '../components/Actionbar/Actionbar';

const Main = () => {
  const {contas} = useContext(UserContext);
  const [total, setTotal] = useState(0);
  const [totalPagas, setTotalPagas] = useState(0);
  const [totalAPagar, setTotalAPagar] = useState(0);
  const [totalVencidas, setTotalVencidas] = useState(0);

  const convertToNumber = (number) => {
    const valorTotal = parseFloat(number.replace(/[^\d,.-]/g, '').replace(',','.'));
    return valorTotal;
  }

  const calcContasPagas = () => {
    const contasPagas = contas.filter(conta => conta.statusConta);
      if (contasPagas.length > 0) {
        setTotalPagas(contasPagas.reduce((a, obj) => {return a + convertToNumber(obj.valorConta)}, 0));
      }else{
        setTotalPagas(0);
      }
  }

  const calcContasAPagar = () => {
    const contasAPagar = contas.filter(conta => !conta.statusConta);
      if (contasAPagar.length > 0) {
        setTotalAPagar(contasAPagar.reduce((a, obj) => {return a + convertToNumber(obj.valorConta)}, 0));
      }else{
        setTotalAPagar(0);
      }
  }

  const calcContasVencidas = () => {
      const contasVencidas = contas.filter(conta => conta.vencConta < new Date().getDate() && !conta.statusConta);
      if (contasVencidas.length > 0) {
        setTotalVencidas(contasVencidas.reduce((a, obj) => {return a + convertToNumber(obj.valorConta)}, 0));
      }else{
        setTotalVencidas(0);
      }
  }

  const calcTotalContas = () => {
    setTotal(contas.reduce((a, obj) => {return a + convertToNumber(obj.valorConta)}, 0));
  }

  useEffect(() => {
    if (contas.length > 0) {
    calcTotalContas();
    calcContasPagas();
    calcContasAPagar();
    calcContasVencidas();
    }
  }, [contas])


  return (
    <section>
      <div className={style.container}>
      <section className={style.cards} >
        <Card valor={total} legenda="Total" cor="blue" title="Soma de todas as contas que estão cadastradas."/>
        <Card valor={totalPagas} legenda="Pagas" cor="green" title="Soma de todas as contas que já foram pagas."/>
        <Card valor={totalAPagar} legenda="A pagar" cor="gray" title="Soma das contas que ainda não foram pagas."/>
        <Card valor={totalVencidas} legenda="Em atraso" cor="red" title="Soma das contas que já venceram e ainda não foram pagas."/>
      </section>
      <ListaContas />
      </div>

      <Actionbar />
    </section>
  );
};

export default Main;
