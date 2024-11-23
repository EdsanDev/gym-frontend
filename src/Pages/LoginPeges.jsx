import img from "../img/gym2.jfif";
import { useForm } from "react-hook-form";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
function LoginPeges() {
  const { register, handleSubmit } = useForm();
  const { signin, isAutheticated, errors: loginError} = useAuth();
  const navegate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    signin(data);
  });
  useEffect(() => {
    if (isAutheticated) {
      navegate("/register");
    }
  }, [isAutheticated]);
  return (
    <div className="content-row">
      <div className="content-login">
        {loginError.map((error,i)=>(
          <div className="alarma-login" key={i}>
            <FontAwesomeIcon icon={faTriangleExclamation} className="icons" />
            <h5>{error}</h5>
          </div>
        ))}
        <div className="title-login">
          <h1>Login</h1>
        </div>
        <div className="content-form">
          <form action="" onSubmit={onSubmit}>
            <div className="group-input">
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="user@user.com"
              />
            </div>
            <div className="group-input">
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Password"
              />
            </div>
            <div className="btn">
              <button type="submit">Login</button>
            </div>
          </form>
          <div className="link-register">
            <Link to="/registerUser" className="link">
              Registro de Usuario
            </Link>
          </div>
        </div>
      </div>
      <div className="content-img">
        <img src={img} alt="" />
      </div>
    </div>
  );
}
export default LoginPeges;
