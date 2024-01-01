import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./header.css";
import { LogUserContext } from "../context/LoggedUser";

const Header = () => {
  const logUser = useContext(LogUserContext);
  // console.log("header logUsser", logUser);

  const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "",
          text: "Logout successfully.",
          icon: "success",
        });
        localStorage.removeItem("Token");
        localStorage.removeItem("userinfo");
        navigate("/");
        window.location.reload();
      }
    });
  };

  return (
    <div className="header">
      <div>
        <img src="" alt="logo" />
      </div>
      <div className="header-mid">
        <NavLink to={"/timeline"}>TimeLine </NavLink>
        <NavLink to={"/chat"}>Chat </NavLink>
        <NavLink to={"/profile"}>Profile </NavLink>
      </div>
      <div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
