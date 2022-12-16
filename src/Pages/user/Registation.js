import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header2 from "../../Component/Header2";
import { Footer } from "../../Component/Footer";
import Loading from "../../Component/Loading";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registation = () => {
  const initialValue = { fristname: "", email: "", password: "", roleid: "" };

  const [input, setInput] = useState(initialValue);
  const [registationBoolean, setRegistationBoolean] = useState(true);
  const [fristname, setFristname] = useState(false);
  const [lastname, setLastname] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [roilid, setRoleid] = useState(false);
  const [error, setError] = useState(false);
  //   const [roleid,setRoleid] = useState(false)
  const navigate = useNavigate();

  //   console.log(input)

  //  const  baseURL = 'https://nodeswaggerapis.herokuapp.com/api/user/registration'

  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  // console.log( baseURL )

  useEffect(() => {
    <Loading />;
  }, []);

  const handleChange = (e) => {
    // console.log(e.target.value)

    const { name, value } = e.target;
    // console.log(name)
    // console.log(value)

    setFristname(false);
    // setLastname(false)
    setEmail(false);
    setPassword(false);

    setInput({ ...input, [name]: value });
  };

  const registationFunc = (e) => {
    console.log(e.target.value);
    setRegistationBoolean(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("fhjdhgh;");
    setError(false);

    if (input.fristname.length === 0) {
      setFristname(true);
    }

    if (input.email.length === 0) {
      setEmail(true);
    }

    if (input.password.length <= 4) {
      setPassword(true);
    }

    if (
      input.fristname.length > 0 &&
      input.email.length > 0 &&
      input.password.length > 4
    ) {
      axios
        .post(`${baseURL}/api/user/registration`, {
          name: input.fristname,

          email: input.email,
          password: input.password,
          role_id: "6209ec51750d8e317e8107d7",
          status: registationBoolean,
        })
        .then((response) => {
          navigate("/user");
          console.log(response.data.message);

          toast.success(" Registation successfull !", {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          console.log(error.response);

          const responseError = error.response;

          setError(responseError.data.message);
        });
    }
  };

  console.log(error);

  return (
    <div>
      <Header2 />

      <div className="registation">
        <form onSubmit={handleSubmit}>
          <div className="form_heading">
            <h1> Signup </h1> <br />
            {/* <p style={{ color: "red" }}> {error} </p> */}
          </div>

          <div className="form_ui">
            <div className="form-group">
              <label> Name </label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter your name"
                name="fristname"
                value={input.fristname}
                onChange={handleChange}
              />
              {fristname && (
                <p style={{ color: "red" }}> Name is required </p>
              )}
              {/* <p style={{ color: "red" }}> {error} </p>  */}
            </div>

            <div className="form-group">
              <label> Email </label>
              <input
                className="form-control"
                type="email"
                placeholder="Enter yor email"
                name="email"
                value={input.email}
                onChange={handleChange}
              />
              {email && <p style={{ color: "red" }}> Email is required </p>}
              <p style={{ color: "red" }}> {error} </p> 
            </div>

            <div className="form-group">
              <label> Password </label>
              <input
                className="form-control"
                type="password"
                placeholder="Enter your password"
                name="password"
                value={input.password}
                onChange={handleChange}
              />
              {password && (
                <p style={{ color: "red" }}>
                  
                  Please set your password minimum 4 character
                </p>
              )}
            </div>

            {/* <div className='form-group' >
           
           <label> Role ID </label>
           <input className='form-control' type='text' placeholder='enter your role id' name='roleid'  value={input.roleid} onChange={handleChange} />
           { roilid && <p style={{color:'red'}}  > please set your roilid </p>  }
           
          </div> */}

            {/* <div className='form-group' >
            <label> status </label>
            <select className='form-control' onChange={registationFunc} >
              <option value='' > -- </option>
             <option value='true' > Enable </option>
             <option value='false' > Disable </option>
            </select>
          </div> */}

            <div className="registation_button mt-1">
              <button className="btn btn-success"> Submit </button>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Registation;
