import style from "./Relatorio.module.css";
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";
import MyDocument from "../../components/Relatorios/MyDocument";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  BlobProvider,
  usePDF,
} from "@react-pdf/renderer";

const Relatorio = () => {
  const { contas, total, totalPagas, totalAPagar, totalVencidas } =
    useContext(UserContext);

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
  var date = new Date(Date.now());
  var dateFormated = months[date.getMonth] + "/" + date.getFullYear() + 1;

  return (
    <section className={style.container}>
      <h1 className={style.title}>Relatórios</h1>
      <p>
        <MyDocument
          valores="ok"
          contas={contas}
          total={total}
          totalPagas={totalPagas}
          totalAPagar={totalAPagar}
          totalVencidas={totalVencidas}
        />
      </p>

      <BlobProvider
        document={
          <MyDocument
            valores="ok"
            contas={contas}
            total={total}
            totalPagas={totalPagas}
            totalAPagar={totalAPagar}
            totalVencidas={totalVencidas}
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
