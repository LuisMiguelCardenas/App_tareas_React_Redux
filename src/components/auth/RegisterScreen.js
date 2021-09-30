import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import { startRegisterWithEmailPassword } from "../../actions/auth";
import { removeError, setError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
const { msError } = useSelector( state => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: "Antonita",
    email: "antonita@gmail.com",
    password: "123456",
    password2: "123456",
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      //console.log("Formulario valido");
      dispatch(startRegisterWithEmailPassword(email, password, name))
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("nombre es requerido"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email no valido"));
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(setError("El passwor deber ser de más de 5 caracteres o igulaes."));
      return false;
    }
    dispatch(removeError());
    return true;
  };
  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form onSubmit={handleRegister}>

        {
          msError !== null?
          <div className="auth__alert-error">{msError}</div>
          :
          null
        }
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          value={password2}
          onChange={handleInputChange}
        />

        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link to="/auth/login" className="link">
          Already registered?
        </Link>
      </form>
    </>
  );
};
