import "../style/RegisterCliente.css";
import { useForm } from "react-hook-form";
import {useCliente} from "../Context/ClienteContext"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
function RegisterCliente() {
  const {register, handleSubmit,setValue} = useForm();
  const {registerCliente,getClienteUno,updateCliente} = useCliente()
  const navegation = useNavigate()
  const params  = useParams()

  useEffect(()=>{
    async function loadCliente(){
      if(params.id){
        const clienteUp = await getClienteUno(params.id)
        setValue('name',clienteUp.name)
        setValue('last_name',clienteUp.last_name)
        setValue('email',clienteUp.email)
        setValue('type_inscription',clienteUp.type_inscription)
        setValue('date_final',clienteUp.date_final)
        setValue('precio',clienteUp.precio)
      }
    }
    loadCliente()
  },[])

  const onSubmit = handleSubmit((data)=>{
      if(params.id){
        updateCliente(params.id,data)
      }else{
        registerCliente(data)
      }
      navegation('/search')
  })
  return (
    <div className="content-cliente">
      <div className="title-cliente">
        {params.id ? (
          <h1>Editar Cliente</h1>
        ):(
          <h1>Registro de cliente</h1>
        )
        }
      </div>
      <div className="content-cl">
        <form className="content-form-cliente" onSubmit={onSubmit}>
          <div className="form-group-cliente">
            <label>Nombre</label>
            <input type="text" name="name" {...register("name",{required:true})}/>
          </div>
          <div className="form-group-cliente">
            <label>Apellidos</label>
            <input type="text" name="last_name" {...register("last_name",{required:true})} />
          </div>
          <div className="form-group-cliente">
            <label>Email</label>
            <input type="email" name="email" {...register("email",{required:true})}/>
          </div>
          <div className="form-group-cliente md4">
            <label>Tipo de inscripcion</label>
            <input type="text" name="type_inscription" {...register("type_inscription",{required:true})} />
          </div>
          <div className="form-group-cliente md4">
            <label>Fin de mensualidad</label>
            <input type="date" name="mensualidad"  {...register("date_final",{required:true})} />
          </div>
          <div className="form-group-cliente md6">
            <label>Precio</label>
            <input type="number" name="precio" {...register("precio",{required:true})}/>
          </div>
          <div className="btn_cliente">
            {
              params.id ?(
                <button className="btnEdit">Editar</button>
              ):(
                <button className="btnSave">Guardar</button>
              )
            }
          </div>
        </form>
      </div>
    </div>
  );
}
export default RegisterCliente;
