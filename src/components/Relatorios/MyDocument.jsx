import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import Invoice_NokIco from "../../assets/invoice_Nok.png";
import Invoice_okIco from "../../assets/invoice_ok.png";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 20,
    alignContent: "flex-start",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  cardGreen: {
    width: "200px",
    height: "70px",
    display: "flex",
    flexDirection: "column",
    aligItems: "end",
    justifyContent: "center",
    padding: "14px",
    margin: "20px",
    borderRadius: "8px",
    backgroundColor: "#00cb8d",
  },
  cardGray: {
    width: "200px",
    height: "70px",
    display: "flex",
    flexDirection: "column",
    aligItems: "end",
    justifyContent: "center",
    padding: "14px",
    margin: "20px 0",
    borderRadius: "8px",
    backgroundColor: "#5e6f77",
  },
  cardRed: {
    width: "200px",
    height: "70px",
    display: "flex",
    flexDirection: "column",
    aligItems: "end",
    justifyContent: "center",
    padding: "14px",
    margin: "20px 0",
    borderRadius: "8px",
    backgroundColor: "#ff626e",
  },
  ok: {
    color: "#00cb8d",
    paddingRight: "5px",
  },
  nok: {
    color: "#5e6f77",
    paddingRight: "5px",
  },
});
const formatCurrency = (number) => {
  return new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(number);
};

const MyDocument = ({
  contas,
  total,
  totalPagas,
  totalAPagar,
  totalVencidas,
}) => {
  var date = new Date(Date.now());
  var dateFormated =
    date.getDate().toString().padStart(2, "0") +
    "/" +
    date.getMonth().toString().padStart(2, "0") +
    "/" +
    date.getFullYear();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text
            style={{
              color: "#ff626e",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            Gerenciador de Contas a Pagar
          </Text>
        </View>

        <View>
          <Text style={{ fontSize: "10px" }}>
            Relatório gerado em {dateFormated}
          </Text>
        </View>

        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={styles.cardGray}>
            <Text style={{ color: "#fff" }}>Valor Total</Text>
            <Text style={{ color: "#fff" }}>{total}</Text>
          </View>
          <View style={styles.cardGreen}>
            <Text style={{ color: "#fff" }}>Valor Pago</Text>
            <Text style={{ color: "#fff" }}>{totalPagas}</Text>
          </View>
          <View style={styles.cardRed}>
            <Text style={{ color: "#fff" }}>Valor a pagar</Text>
            <Text style={{ color: "#fff" }}>{totalAPagar}</Text>
          </View>
        </View>

        <View
          style={{
            margin: "15px",
            display: "flex",
            flexDirection: "column",
            flex: "1",
            width: "100%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              fontWeight: "bold",
              fontSize: "13px",
              height: "25px",
            }}
          >
            <Text style={{ flex: "1" }}>Conta</Text>
            <Text style={{ flex: "1" }}>Valor</Text>
            <Text style={{ flex: "1" }}>Venc.</Text>
            <Text style={{ flex: "1" }}>Pagamento</Text>
            <Text style={{ flex: "1" }}>Obs</Text>
          </View>

          {contas.length === 0 ? (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                fontSize: "12px",
                paddingBottom: "24px",
              }}
            >
              <Text
                style={{
                  fontSize: "12px",
                  textAlign: "center",
                }}
              >
                Nenhuma conta cadastrada
              </Text>
            </View>
          ) : (
            contas.map((conta) => (
              <View
                key={conta.tituloConta}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontSize: "13px",
                  paddingBottom: "10px",
                }}
              >
                <Text
                  style={{
                    flex: "1",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {conta.statusConta ? (
                    <Image
                      src={Invoice_okIco}
                      style={{
                        width: 11,
                        height: 11,
                        marginRight: 5,
                      }}
                    />
                  ) : (
                    <Image
                      src={Invoice_NokIco}
                      style={{
                        width: 11,
                        height: 11,
                        marginRight: 5,
                      }}
                    />
                  )}{" "}
                  {conta.tituloConta}
                </Text>
                <Text style={{ flex: "1" }}>{conta.valorConta}</Text>
                <Text style={{ flex: "1" }}>{conta.vencConta}</Text>
                <Text style={{ flex: "1" }}>
                  {conta.statusConta ? "OK" : "PENDENTE"}
                </Text>
                <Text style={{ flex: "1" }}>{conta.obs}</Text>
              </View>
            ))
          )}
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
            Relatório criado por{" "}
            <Text style={{ fontWeight: "bold" }}>Pedro Henrique Salazar</Text>{" "}
            usando o renderizador{" "}
            <Text
              style={{
                fontWeight: "bold",
                textDecoration: "underline",
              }}
              href="https://react-pdf.org/"
              target="_blank"
            >
              React-pdf
            </Text>
            .
          </Text>

          <Text style={{ fontSize: "9px", color: "#5e6f77" }}>
            Este documento é exemplo de um relatório usado em{" "}
            <Text
              href="https://phsalazar.github.io/gestao-financeira-reactjs/"
              target="_blank"
              style={{ textDecoration: "underline" }}
            >
              https://phsalazar.github.io/gestao-financeira-reactjs/
            </Text>
            .
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
