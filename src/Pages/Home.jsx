import { useEffect, useState } from "react";
import "../style/Home.css";
import { useCliente } from "../Context/ClienteContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
function Home() {
  const { getCliente, clienteTotal } = useCliente();
  const [datosVigentes, setDatosVigentes] = useState([]);
  useEffect(() => {
    getCliente();
  }, []);
  const parseDateInUTC = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, day));
  };
  useEffect(() => {
    const currentDate = new Date(
      Date.UTC(
        new Date().getUTCFullYear(),
        new Date().getUTCMonth(),
        new Date().getUTCDate()
      )
    );
    const results = clienteTotal.map((item) => {
      const parsedDate = parseDateInUTC(item.date_final);
      const isVigente = parsedDate >= currentDate;
      return {
        ...item,
        isVigente,
      };
    });
    setDatosVigentes(results);
  }, [clienteTotal]);

  const countActive = () => {
    // Usa map para transformar el array en un array de valores booleanos
    const activeValues = datosVigentes.map((item) => item.isVigente);

    // Usa reduce para contar cuántos true hay en el array de valores booleanos
    return activeValues.reduce(
      (count, isVigente) => (isVigente ? count + 1 : count),
      0
    );
  };
  const countVencido = () => {
    // Usa map para transformar el array en un array de valores booleanos
    const activeValues = datosVigentes.map((item) => item.isVigente);

    // Usa reduce para contar cuántos true hay en el array de valores booleanos
    return activeValues.reduce(
      (count, isVigente) => (!isVigente ? count + 1 : count),
      0
    );
  };
  return (
    <div className="row-home">
      <div className="content-home">
        <div className="contador-home">
          <div className="icon-home">
            <FontAwesomeIcon icon={faUser} className="icons" />
          </div>
          <div className="contador-home-cliente">
            <h2>{clienteTotal.length}</h2>
            <h3>Cliente Total</h3>
          </div>
        </div>
      </div>
      <div className="content-home">
        <div className="contador-home">
          <div className="icon-home">
            <FontAwesomeIcon icon={faUser} className="icons" />
          </div>
          <div className="contador-home-cliente">
            <h2>{countActive()}</h2>
            <h3>Cliete Vigente</h3>
          </div>
        </div>
      </div>
      <div className="content-home">
        <div className="contador-home">
          <div className="icon-home">
            <FontAwesomeIcon icon={faUser} className="icons" />
          </div>
          <div className="contador-home-cliente">
            <h2>{countVencido()}</h2>
            <h3>Cliete Vencido</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
