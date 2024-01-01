import React, { useState } from "react";
import InputForm from "./InputForm";
import instance from "../helpers/axiosInstace";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./RegisterForm.css";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const navigate = useNavigate();

  // console.log('process env',process.env.REACT_APP_BASE_URL);
  const [values, setValues] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState();

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "UserName",
      label: "UserName",
      required: true,
      errorMessage: "User should be more than 3 character",
      pattern: "^[A-Za-z0-9].{3,}$",
    },
    {
      id: 2,
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
      id: 3,
      name: "phone",
      type: "number",
      placeholder: "Phone",
      label: "Phone",
      required: true,
      errorMessage: "phone number should be 10 character",
      pattern: "^[0-9]{10,10}$",
    },
    {
      id: 4,
      name: "password",
      type: "text",
      placeholder: "Password",
      label: "Password",
      required: true,
      errorMessage: "Password should be min 5 charcter",
      pattern: "^[A-Za-z0-9].{4,}$",
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "text",
      placeholder: "Confirm Password",
      label: "Confirm Password",
      required: true,
      errorMessage: "Password don't match",
      pattern: values.password,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(values);
    setError("");
    instance
      .post("/api/auth/register", values)
      .then((response) => {
        toast.success("Successfully registered");
        navigate("/login");
        // console.log('responnnnssssee', response?.data);
      })
      .catch((error) => {
        // console.log('catch error', error.response.data.message);
        // console.log('catch error222', error.response);
        setError(error.response?.data.message);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // console.log('values:',values)

  return (
    <div className="register">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="regi-title">Register</h1>
        <h4 className="errmsg">{error}</h4>
        {inputs.map((input) => (
          <InputForm
            key={input.id}
            {...input}
            error={error}
            onChange={handleChange}
          />
        ))}

        <button className="form-regi-btn">Submit</button>
      </form>
    </div>
  );
};

export default RegisterForm;
