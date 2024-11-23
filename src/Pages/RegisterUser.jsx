import "../style/RegisterUser.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../Context/AuthContext";

function RegisterUser() {
    const {register,handleSubmit} = useForm()
    const {registerUser} = useAuth()
    const onSubmit = handleSubmit((data)=>{
      registerUser(data)
    })
  return (
    <div className="content-register">
      <div className="title-user">
        <h1>Registro de Usuario</h1>
      </div>
      <div className="content-user">
        <form action="" onSubmit={onSubmit}>
          <div className="group-input-user">
            <input type="text" placeholder="Nombre Completo" {...register("name",{required:true})} />
          </div>
          <div className="group-input-user">
            <input type="text" placeholder="Usuario" {...register("username",{required:true})}/>
          </div>
          <div className="group-input-user">
            <input type="email" placeholder="user@user.com" {...register("email",{required:true})}/>
          </div>
          <div className="group-input-user">
            <input type="password" placeholder="Password" {...register("password",{required:true})}/>
          </div>
          <div className="btn">
            <button type="submit">Registro</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default RegisterUser;
