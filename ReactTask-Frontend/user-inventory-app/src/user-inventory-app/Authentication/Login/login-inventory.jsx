import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Button from "@mui/material/Button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from "../../assets/user-avatar.png";
import ApiService from "../../ApiService/api-service.tsx";
//-------------------------------Input Field Validation---------------------------//
const required = (value) => {
  if (!value) {
    return <div className="text-red-500">This field is required!</div>;
  }
};
const LoginPage = () => {
  //- ----------------------------Navigation Method------------------------------//
  const navigate = useNavigate();
  //-----------------------------User Input Fields State And Function Management--------------//
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();
  };

  //------------------------------------Verify User Credentials Api Url To Login-----------------------//
  const checkLoginForUser = () => {
    ApiService.checkUserCredentialsMethod(username, password).then((res) => {
      if (res?.data?.statusCode === 200) {
        sessionStorage.removeItem("jwt_token");
        sessionStorage.setItem("jwt_token", res.data.jwt_token);
        navigate("/products");
        window.location.reload();
      } else {
        alert(res.data.message);
      }
    });
  };
  //----------------------------------------------------------Login Form------------------------------------//
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <div className="text-center mb-[10px] font-bold">LOGIN</div>
        <img src={image} alt="profile-img" className="profile-img-card" />

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control input"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "8px 12px",
                fontSize: "16px",
                width: "100%",
              }}
              type="password"
              className="form-control "
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <section className="btn btn-primary btn-block">
              {<span className="spinner-border spinner-border-sm"></span>}
              <div className="flex gap-3 mt-[10px]">
                <Button
                  disabled={!username || !password}
                  style={
                    username && password
                      ? { backgroundColor: "green", color: "white" }
                      : { backgroundColor: "lightgray", color: "white" }
                  }
                  onClick={checkLoginForUser}
                  variant="outlined"
                >
                  Login
                </Button>
                <ToastContainer />
                <Button
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={() => navigate("/register")}
                  variant="outlined"
                >
                  Register
                </Button>
              </div>
            </section>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
