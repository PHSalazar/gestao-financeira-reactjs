import { BlobProvider, StyleSheet } from "@react-pdf/renderer";
import { useContext, useEffect, useState } from "react";
import MyDocument from "../../components/Relatorios/MyDocument";
import UserContext from "../../contexts/UserContext";
import style from "./Relatorio.module.css";

const Relatorio = () => {
  const { contas, calcularTotalContas } = useContext(UserContext);
  const [contasExibicao, setContasExibicao] = useState([]);
  const [monthSelectOptions, setMonthSelectOptions] = useState([]);
  const [monthSelected, setMonthSelected] = useState("allMonths");

  const getMonths = () => {
    const mesesSelect = [];
    var nomesMeses = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];

    contas.forEach((conta) => {
      const [ano, mes] = conta.vencConta.split("-"); // 2025-07-01
      const mesIndex = parseInt(mes, 10) - 1;
      const monthBill = `${nomesMeses[mesIndex]}/${ano}`;

      const hasMonthInList = mesesSelect.some((m) => m.label === monthBill);

      if (!hasMonthInList) {
        mesesSelect.push({ label: monthBill, content: `${ano}-${mes}` });
      }
    });

    setMonthSelectOptions(Array.from(mesesSelect));
  };

  const handlerFilterBillsByMonth = () => {
    const filterLabel =
      monthSelected === "allMonths"
        ? () => true
        : (conta) => conta.vencConta.startsWith(monthSelected);

    const contasFiltradas = contas.filter(filterLabel);

    setContasExibicao(contasFiltradas);
  };

  useEffect(() => {
    getMonths();
  }, [contas]);

  useEffect(() => {
    handlerFilterBillsByMonth();
  }, [contas, monthSelected]);

  const styles = StyleSheet.create({
    addNovaConta: {
      padding: "8px",
      background: "#5f9cec",
      border: "1px solid #5f9cec",
      borderRadius: "8px",
      color: "#fff",
      cursor: "pointer",
      transition: "0.5s",
      margin: "20px",

      ":hover": {
        borderColor: "#5f9cec",
        background: "none",
        color: "#5f9cec",
      },
    },
  });

  var months = [
    "JAN",
    "FEV",
    "MAR",
    "ABR",
    "MAI",
    "JUN",
    "JUL",
    "AGO",
    "SET",
    "OUT",
    "NOV",
    "DEZ",
  ];

  const formatCurrency = (number) => {
    return new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    }).format(number);
  };

  var date = new Date(Date.now());
  var dateFormated = months[date.getMonth] + "/" + date.getFullYear() + 1;

  return (
    <section className={style.container}>
      <h1 className={style.title}>Relatórios</h1>
      <select
        name="selectMonth"
        id="selectMonth"
        onChange={(e) => setMonthSelected(e.target.value)}
        defaultValue="allMonths"
      >
        <option value="allMonths">Todos os meses</option>
        {monthSelectOptions.map(({ label, content }) => (
          <option key={content} value={content}>
            {label}
          </option>
        ))}
      </select>

      <p style={{ width: "100%" }}>
        <MyDocument
          valores="ok"
          contas={contasExibicao}
          total={formatCurrency(
            calcularTotalContas(contasExibicao, (conta) =>
              conta.vencConta.startsWith(monthSelected)
            )
          )}
          totalPagas={formatCurrency(
            calcularTotalContas(
              contasExibicao,
              (conta) =>
                conta.vencConta.startsWith(monthSelected) && conta.statusConta
            )
          )}
          totalAPagar={formatCurrency(
            calcularTotalContas(
              contasExibicao,
              (conta) =>
                conta.vencConta.startsWith(monthSelected) && !conta.statusConta
            )
          )}
          totalVencidas={formatCurrency(
            calcularTotalContas(
              contasExibicao,
              (conta) =>
                conta.vencConta.startsWith(monthSelected) &&
                new Date(conta.vencConta) < new Date() &&
                !conta.statusConta
            )
          )}
        />
      </p>

      <BlobProvider
        document={
          <MyDocument
            valores="ok"
            contas={contasExibicao}
            total={formatCurrency(
              calcularTotalContas(contasExibicao, () => true)
            )}
            totalPagas={formatCurrency(
              calcularTotalContas(contasExibicao, (conta) => conta.statusConta)
            )}
            totalAPagar={formatCurrency(
              calcularTotalContas(contasExibicao, (conta) => !conta.statusConta)
            )}
            totalVencidas={formatCurrency(
              calcularTotalContas(
                contasExibicao,
                (conta) =>
                  conta.vencConta < new Date().getDate() && !conta.statusConta
              )
            )}
          />
        }
      >
        {({ url, loading }) =>
          loading ? (
            "Gerando PDF..."
          ) : (
            <a
              href={url}
              download={`Relatorio_GestordeContasAPagar_${new Date()
                .toISOString()
                .slice(0, 10)}.pdf`}
            >
              Baixar Relatório
            </a>
          )
        }
      </BlobProvider>
    </section>
  );
};

export default Relatorio;
