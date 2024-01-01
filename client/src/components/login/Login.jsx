import React, { useState } from "react";
import InputForm from "../InputForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState();

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      required: true,
      errorMessage: "Email should be a valid email address",
      // pattern:'/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/'
      pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i",
    },

    {
      id: 2,
      name: "password",
      type: "text",
      placeholder: "Password",
      label: "Password",
      required: true,
      errorMessage: "Password should be min 5 charcter",
      pattern: "^[A-Za-z0-9].{4,}$",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    setError("");
    axios
      .post("http://localhost:5000/api/auth/login", values)
      .then((response) => {
        console.log("222222222222222", response.data);
        if (response.data.success == 0) {
          setError(response.data.message);
        } else {
          localStorage.setItem("userinfo", JSON.stringify(response.data.data));
          localStorage.setItem("Token", JSON.stringify(response.data.Token));
          navigate("/timeline");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log("errir--------:", error);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // console.log('values:',values)
  return (
    <div className="register">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="regi-title">Login</h1>
        <h4 className="errmsg">{error}</h4>
        {inputs.map((input) => (
          <InputForm key={input.id} {...input} onChange={handleChange} />
        ))}

        <button className="form-regi-btn">Submit</button>
      </form>
    </div>
  );
};

export default Login;
