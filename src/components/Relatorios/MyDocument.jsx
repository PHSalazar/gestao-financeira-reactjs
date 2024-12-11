import { useContext } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  BlobProvider,
} from "@react-pdf/renderer";
import UserContext from "../../contexts/UserContext";

import Invoice_okIco from "../../assets/invoice_ok.svg";
import Invoice_NokIco from "../../assets/invoice_Nok.svg";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    width: "600px",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  tabela: {},
});

const MyDocument = () => {
  const { contas, setContas, total, totalPagas, totalAPagar, totalVencidas } =
    useContext(UserContext);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text
            style={{ color: "#ff626e", fontWeight: "bold", fontSize: "1.5rem" }}
          >
            Gestor de Contas a Pagar
          </Text>
        </View>
        <View style={{ display: "flex" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              width: "130px",
              height: "130px",
              border: "1px solid #5e6f77",
              alignItems: "center",
              justifyContent: "center",
              margin: "10px",
              borderRadius: "10px",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Valor Total</Text>
            <Text>R$ {total}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              width: "130px",
              height: "130px",
              border: "1px solid #5e6f77",
              alignItems: "center",
              justifyContent: "center",
              margin: "10px",
              borderRadius: "10px",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Valor Pago</Text>
            <Text>R$ {totalPagas}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              width: "130px",
              height: "130px",
              border: "1px solid #5e6f77",
              alignItems: "center",
              justifyContent: "center",
              margin: "10px",
              borderRadius: "10px",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Valor a Pagar</Text>
            <Text>R$ {totalAPagar}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              width: "130px",
              height: "130px",
              border: "1px solid #5e6f77",
              alignItems: "center",
              justifyContent: "center",
              margin: "10px",
              borderRadius: "10px",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Vencimento</Text>
            <Text>
              {new Date(Date.now()).getMonth() + 1}/
              {new Date(Date.now()).getFullYear()}
            </Text>
          </View>
        </View>
        <View style={{ display: "flex" }}>
          <table style={{ flex: 1, margin: "10px" }}>
            <thead>
              <th
                style={{
                  color: "#5e6f77",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textAlign: "left",
                }}
              >
                Conta
              </th>
              <th
                style={{
                  color: "#5e6f77",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textAlign: "left",
                }}
              >
                Venc.
              </th>
              <th
                style={{
                  color: "#5e6f77",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textAlign: "left",
                }}
              >
                Valor
              </th>
              <th
                style={{
                  color: "#5e6f77",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textAlign: "left",
                }}
              >
                Pagamento
              </th>
            </thead>

            <tbody>
              {contas.map((conta) => {
                const { tituloConta, vencConta, valorConta, statusConta } =
                  conta;

                return (
                  <tr
                    key={tituloConta}
                    style={{ fontSize: "12px", display: "" }}
                  >
                    <td>
                      {statusConta ? (
                        <img
                          src={Invoice_okIco}
                          width={11}
                          height={11}
                          style={{ marginRight: "5px" }}
                        />
                      ) : (
                        <img
                          src={Invoice_NokIco}
                          width={11}
                          height={11}
                          style={{ marginRight: "5px" }}
                        />
                      )}
                      {tituloConta}
                    </td>
                    <td>
                      <b>{vencConta}</b>
                    </td>
                    <td>{valorConta}</td>
                    <td>{statusConta ? "PAGO" : "PENDENTE"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </View>

        <View
          style={{
            width: "100%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: "9px", color: "#5e6f77" }}>
            Fatura criada por <b>Pedro Henrique Salazar</b> usando o
            renderizador <b>React-pdf</b>.
          </Text>
          <Text style={{ fontSize: "9px", color: "#5e6f77" }}>
            Este documento é exemplo de um relatório usando em{" "}
            <a href="">
              https://phsalazar.github.io/gestao-financeira-reactjs/
            </a>
            .
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
