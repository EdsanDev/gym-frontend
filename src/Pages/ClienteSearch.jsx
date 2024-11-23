import { useForm } from "react-hook-form";
import "../style/Search.css";
import img from "../img/avatar.jfif";
import { useCliente} from "../Context/ClienteContext";
import { useEffect, useState} from "react";
import {Link} from 'react-router-dom'
function ClienteSearch() {
  const { register, getValues } = useForm();
  const { SearchCliente, cliente,clearCliente} = useCliente();
  const [datosResults, setDatosResults] =useState([])

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Evitar el comportamiento por defecto si se presiona Enter
      event.preventDefault();

      // Obtener el valor del input
      const nameValue = getValues("name");
      SearchCliente(nameValue);
    }
  };

  const parseDateInUTC = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day));
  };
  useEffect(()=>{
    const currentDate = new Date(Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate()
    ));
    const results = cliente.map((item) => {
      const parsedDate = parseDateInUTC(item.date_final);
      const isVigente = parsedDate >= currentDate;
      return{
        ...item,
        isVigente,
      };
    });
    setDatosResults(results);
  },[cliente]);

  useEffect(() => {
    return () => {
      setDatosResults([]);
      clearCliente(); // Clear the cliente data from the context
    };
  }, []);
  return (
    <div className="content-search">
      <div className="row">
        <div className="input-search">
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      {datosResults.length === 0 ? (
        <div className="alerta-cliente">
          <h1>NO SE ENCUENTRA NINGUN CLIENTE</h1>
        </div>
      ) : (
        <>
          <div className="content-cliente-Search">
            {datosResults.map((cli) => (
              <div key={cli._id} className="content-info-cliente">
                <div className="img-cliente">
                  <img src={img} alt="" className="img" />
                </div>
                <div className="info-cliente">
                  <h2>{cli.name}</h2>
                  <h3>{cli.last_name}</h3>
                  <h3>{cli.email}</h3>
                  <h3>Tipo: {cli.type_inscription}</h3>
                  <h3>Vence: {cli.date_final}</h3>
                  {cli.isVigente ? (
                    <>
                      <h1 className="estadoVigente">Esta Vigente</h1>
                    </>
                  ) : (
                    <>
                      <h1 className="estadoVencido">Ya Vencio</h1>
                    </>
                  )}
                  <div className="btn-estado">
                    <Link className="link-edit" to={`/register/${cli._id}`}>Actualizar</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
export default ClienteSearch;
