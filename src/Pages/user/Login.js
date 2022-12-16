import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header2 from "../../Component/Header2";
import { Footer } from "../../Component/Footer";
import Loading from "../../Component/Loading";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const initialValue = { email: "", password: "" };

  const [fvalue, setFvalue] = useState(initialValue);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();
  // const [showtoast,setShowtoast] = useState(false)
  const [error,setError] = useState(false)

  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  // console.log( baseURL )

  const handleChange = (e) => {
    // console.log(e.target.value)
    const { name, value } = e.target;
    // console.log(name)
    // console.log(value)

    setFvalue({ ...fvalue, [name]: value });
    console.log(value);
  };

  const Login = localStorage.getItem("Login");
  console.log(Login);

  useEffect(() => {
    if (Login) {
      navigate("/user/profile");
    }
  }, []);

  const loginSubmit = (e) => {
    e.preventDefault();

    setError(false)
    
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regEmail.test(fvalue.email)) {
      setEmail(true);
    }
    if (fvalue.password.length <= 4) {
      setPassword(true);
    }

    if( fvalue.email.length > 0 && fvalue.password.length > 4 )

    axios
      .post(`${baseURL}/api/user/login`, {
        email: fvalue.email,
        password: fvalue.password,
      })
      .then((response) => {
        // console.log(response)
        console.log(response.data.token);
        const token = response.data.token;
        localStorage.setItem("Login", token);
        // localStorage.setItem('logyes','yes')
        console.log(response.data.success);

        if (response.data.success) {


          toast.success("Login successfull !", {
            position: toast.POSITION.TOP_RIGHT,
          });

          navigate("/user/profile");
         
          // alert('hyy')

        }
      })
      .catch((error) => {
        console.log(error.response);
        const erroResponse = error.response
        setError(erroResponse.data.message)
        // setEmailError(error.message)
        // toast.error(" Email or Password is incorrect!", {
        //   position: toast.POSITION.TOP_RIGHT,

          
        // });

        // setError(true)
        setEmail(false)
        setPassword(false)
        
      });
  };

  console.log(error)

  return (
    <div>
      <Header2 />
 
      <div className="login">
        <form onSubmit={loginSubmit}>
          <div className="form_heading">
            <h1> Login Here </h1> <br />
            {/* {emailError && <p> email not matched </p>} */}
             { <p style={{color:'red'}} > {error} </p> }
          </div>

          <div className="form_ui">
            <div className="form-group">
              <label> Email </label>
              <input
                className="form-control"
                type="email"
                placeholder="Enter your email"
                name="email"
                value={fvalue.email}
                onChange={handleChange}
              />
              {email && (
                <p style={{ color: "red" }}> Email is required </p>
              )}
              {/* { <p style={{color:'red'}} > {error} </p> } */}
            </div>

            <div className="form-group">
              <label> Password </label>
              <input
                className="form-control"
                type="password"
                placeholder="Enter your password"
                name="password"
                value={fvalue.password}
                onChange={handleChange}
              />
              {password && (
                <p style={{ color: "red" }}>
                  
                 Password is required 
                </p>
              )}
            </div>

            <div className="login_button">
              <button className="btn btn-success"> Login </button>
              
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
